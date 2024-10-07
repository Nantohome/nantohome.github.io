// stores/reg.store.js
import { defineStore } from 'pinia'
import { handleServerError } from '@/utils/helpers'
import { useLoaderStore } from '@/stores'
import { SETTINGS } from '@/enums'
import {
	regApi,
	regEmailConfirmApi,
	regEmailSendCodeApi
} from '@/api'
import {
	setSessionStorage,
	getSessionStorage,
	removeSessionStorage,
	setToken
} from '@/utils/storage'
import {
	validateLogin,
	validatePassword,
	validatePasswords,
	validateAnswers
} from '@/utils/validate'



const getStorageObj = async(item) => {
	const storageData = await getSessionStorage(item)

	return storageData ? JSON.parse(storageData) : {}
}


export const useRegStore = defineStore({
	id: 'registration',
	state: () => ({
		timer: 59,
		role: getSessionStorage('REG_ROLE'),
		firstAnswer: {
			number: 1,
			initLabel: 'Write answer',
			label: 'Write answer',
			error: false,
			value: getSessionStorage('REG_QUESTION_1')
		},
		secondAnswer: {
			number: 2,
			initLabel: 'Write answer',
			label: 'Write answer',
			error: false,
			value: getSessionStorage('REG_QUESTION_2')
		},
		discord: {
			token: getSessionStorage('DISCORD_TOKEN'),
			user: getStorageObj('DISCORD_USER'),
			error: false
		},
		login: {
			initLabel: 'Login*',
			label: 'Login*',
			error: false
		},
		email: getSessionStorage('REG_EMAIL'),
		password1: {
			initLabel: 'Password*',
			label: 'Password*',
			error: false
		},
		password2: {
			initLabel: 'Repeat password*',
			label: 'Repeat password*',
			error: false
		},
		invite: {
			label: 'Invite code',
			code: getSessionStorage('REG_INVITE')
		}
	}),
	getters: {
		formattedTimer: (state) => ' 0:' + ('00' + state.timer).slice(-2)
	},
	actions:{
		countDownTimer() { // countdownn timer engine
			if(this.timer > 0) {
				setTimeout(() => {
					this.timer -= 1
					this.countDownTimer()
				}, 1000)
			}
		},
		validateAnswer(step, answer) {
			const answerError = validateAnswers(answer)
			
			this[step].error = answerError.value
			this[step].label = answerError.value ? answerError.text : this[step].initLabel
		},
		validateRegisterInfo(login, pass1, pass2) {
			const loginError = validateLogin(login)
			const password1Error = validatePassword(pass1)
			const passwordsError = validatePasswords(pass1, pass2)

			this.login.error = loginError.value
			this.login.label = loginError.value ? loginError.text : this.login.initLabel

			this.password1.error = password1Error.value
			this.password1.label = password1Error.value ? password1Error.text : this.password1.initLabel

			this.password2.error = passwordsError.value
			this.password2.label = passwordsError.value ? passwordsError.text : this.password2.initLabel
		},		
		setRole(role) {
			setSessionStorage('REG_ROLE', role)
			this.role = role
			
			this.$router.push({ name: `${role}-question1` })
		},
		setFirstAnswer(answer) {
			this.validateAnswer('firstAnswer', answer)
			
			if(!this.firstAnswer.error) {
				setSessionStorage('REG_QUESTION_1', answer)
				this.firstAnswer.value = answer

				this.$router.push({ name: `${this.role}-question2` })
			}
		},
		setSecondAnswer(answer) {
			this.validateAnswer('secondAnswer', answer)
			
			if(!this.secondAnswer.error) {
				setSessionStorage('REG_QUESTION_2', answer)
				this.secondAnswer.value = answer

				this.$router.push({ name: 'linking-discord' })
			}
		},
		linkingDiscord() {
			window.open(`https://discord.com/oauth2/authorize?client_id=${SETTINGS.DISCORD_APP_ID}&response_type=token&redirect_uri=${encodeURIComponent(window.location.origin + window.location.pathname)}&scope=identify+email`, "_self")
		},
		async setDiscordUser() {
			const fragment = new URLSearchParams(window.location.hash.slice(1))
			const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')]

			if(accessToken) {
				await fetch('https://discord.com/api/users/@me', {
					headers: {
						authorization: `${tokenType} ${accessToken}`
					}
				})
				.then((result) => result.json())
				.then(async(response) => {
					setSessionStorage('DISCORD_TOKEN', accessToken)
					setSessionStorage('DISCORD_USER', JSON.stringify(response))
					this.discord.error = false
					this.discord.token = accessToken
					this.discord.user = response

					this.$router.push({ name: 'confirm-discord' })
				})
				.catch(async(err) => {
					this.discord.error = true
					handleServerError(err)
				})
			}
		},
		checkInvite() {
			if(window.location.pathname.includes('/r/', 0)) {
				this.invite.code = window.location.pathname.slice(3)
				setSessionStorage('REG_INVITE', this.invite.code)
			}
		},
		async registrate(login, email, pass1, pass2, invite) {
			this.validateRegisterInfo(login, pass1, pass2)

			if(!this.login.error && !this.password1.error && !this.password2.error) {
				const loaderStore = useLoaderStore()
				loaderStore.setLoader(true, 'regBtn')

				try {
					await regApi(
						login,
						email,
						pass1,
						invite,
						this.role,
						this.firstAnswer.value,
						this.secondAnswer.value,
						this.discord.token
					)
	
					setSessionStorage('REG_EMAIL', email)
					this.email = email
				
					await loaderStore.setLoader(false)
					this.$router.push({ name: 'verify' })
				} catch(err) {
					await loaderStore.setLoader(false)
					handleServerError(err)
				}
			}
		},
		async sendCodeByTimer() {
			if(this.timer === 0) {
				try {
					await regEmailSendCodeApi(this.email, this.role)

					this.timer = 59
					this.countDownTimer()
				} catch(err) {
					handleServerError(err)
				}
			}
		},
		async checkCode(code) {
			const loaderStore = useLoaderStore()
			loaderStore.setLoader(true, 'checkRegCodeBtn')

			try {
				const res = await regEmailConfirmApi(this.email, code, this.role)
				setToken(res.access_token)
				
				await this.reset()

				await loaderStore.setLoader(false)
				this.$router.push({ name: 'dashboard' })
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async reset() {
			const registrationData = [
				'REG_ROLE',
				'REG_QUESTION_1',
				'REG_QUESTION_2',
				'DISCORD_TOKEN',
				'DISCORD_USER',
				'REG_EMAIL',
				'REG_INVITE'
			]
			registrationData.forEach(item => removeSessionStorage(item))

			this.$reset()
		}
	}
})