// stores/auth.store.js
import { authApi } from '@/api'
import { defineStore } from 'pinia'
import { setToken } from '@/utils/storage'
import { useLoaderStore, useNavbarStore } from '@/stores'
import { validateLogin, validatePassword } from '@/utils/validate'
import { handleServerError } from '@/utils/helpers'

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		token: null,
		login: {
			initLabel: 'Login or Email',
			label: 'Login or Email',
			error: false
		},
		password: {
			initLabel: 'Password',
			label: 'Password',
			error: false
		}		
	}),
	actions: {
		validateForm(login, password) {
			const loginError = validateLogin(login)
			const passwordError = validatePassword(password)
			
			this.login.error = loginError.value
			this.password.error = passwordError.value

			this.login.label = loginError.value ? loginError.text : this.login.initLabel
			this.password.label = passwordError.value ? passwordError.text : this.password.initLabel
		},
		async authorize(loginVal, passwordVal) {
			this.validateForm(loginVal, passwordVal)
			
			if(!this.login.error && !this.password.error) {
				const loaderStore = useLoaderStore()
				loaderStore.setLoader(true, 'loginBtn')
				
				try {
					const navbarStore = useNavbarStore()

					const res = await authApi(loginVal, passwordVal)

					await navbarStore.reset()
					setToken(res.access_token)
					this.token = res.access_token
			
					await loaderStore.setLoader(false)
					this.$router.push({ name: 'dashboard' })
				} catch(err) {
					await loaderStore.setLoader(false)
					handleServerError(err)
				}
			}
		}
		/* async authorize(loginVal, passwordVal) {
			this.validateForm(loginVal, passwordVal)
			if (this.login.error || this.password.error) return false

			const loaderStore = useLoaderStore()
			loaderStore.setLoader(true, 'loginBtn')

			let answer = false

			try {
				const res = await authApi(loginVal, passwordVal)
				if (res.error) handleServerAnswerError(res)

				setToken(res.access_token)
				this.token = res.access_token
				answer = true
			} catch (err) {
				handleServerError(err)
			}

			await loaderStore.setLoader(false)
			return answer
		} */
	}
})