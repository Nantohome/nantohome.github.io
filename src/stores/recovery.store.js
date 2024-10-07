// stores/recovery.store.js
import { recoverySendCodeApi, recoveryCheckCodeApi, recoveryResetPasswordApi } from '@/api'
import { defineStore } from 'pinia'
import { setStorage, getStorage, removeStorage } from '@/utils/storage'
import { handleServerError } from '@/utils/helpers'
import { validatePassword, validatePasswords } from '@/utils/validate'
import { useLoaderStore } from '@/stores'

export const useRecoveryStore = defineStore({
	id: 'recovery',
	state: () => ({
		timer: 59,
		email: {
			label: 'Email',
			value: getStorage('RECOVERY_EMAIL')
		},
		code: {
			value: getStorage('RECOVERY_CODE')
		},
		password1: {
			initLabel: 'New password',
			label: 'New password',
			error: false
		},
		password2: {
			initLabel: 'Confirm new password',
			label: 'Confirm new password',
			error: false
		}
	}),
	getters: {
		formattedTimer: (state) => ' 0:' + ('00' + state.timer).slice(-2)
	},
	actions: {
		countDownTimer() { // countdownn timer engine
			if(this.timer > 0) {
				setTimeout(() => {
					this.timer -= 1
					this.countDownTimer()
				}, 1000)
			}
		},
		validateForm(pass1, pass2) {
			const password1Error = validatePassword(pass1)
			const passwordsError = validatePasswords(pass1, pass2)
			
			this.password1.error = password1Error.value
			this.password1.label = password1Error.value ? password1Error.text : this.password1.initLabel

			this.password2.error = passwordsError.value
			this.password2.label = passwordsError.value ? passwordsError.text : this.password2.initLabel
		},
		async sendCode(email) {
			const loaderStore = useLoaderStore()
			loaderStore.setLoader(true, 'sendRecoveryCodeBtn')

			try {
				await recoverySendCodeApi(email)

				setStorage('RECOVERY_EMAIL', email)
				this.email.value = email

				await loaderStore.setLoader(false)
				this.$router.push({ name: 'recovery-verify' })
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async sendCodeByTimer() {
			if(this.timer === 0) {
				try {
					await recoverySendCodeApi(this.email.value)

					this.timer = 59
					this.countDownTimer()
				} catch(err) {
					handleServerError(err)
				}
			}
		},
		async checkCode(code) {
			const loaderStore = useLoaderStore()
			loaderStore.setLoader(true, 'checkRecoveryCodeBtn')

			try {
				await recoveryCheckCodeApi(this.email.value, code)
				
				setStorage('RECOVERY_CODE', code)
				this.code.value = code

				await loaderStore.setLoader(false)
				this.$router.push({ name: 'recovery-end' })
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async resetPassword(pass1, pass2) {
			this.validateForm(pass1, pass2)

			if(!this.password1.error && !this.password2.error) {
				const loaderStore = useLoaderStore()
				loaderStore.setLoader(true, 'recoveryPassBtn')

				try {
					await recoveryResetPasswordApi(this.email.value, this.code.value, pass1)

					await loaderStore.setLoader(false)
					this.reset()
					this.$router.push({ name: 'login' })
				} catch(err) {
					await loaderStore.setLoader(false)
					handleServerError(err)
				}
			}
		},
		reset() {
			removeStorage('RECOVERY_EMAIL')
			removeStorage('RECOVERY_CODE')

			this.$reset()
		}
	}
})