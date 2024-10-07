// stores/navbar.store.js
import {
	getCurrentUserApi,
	updateAvatarApi
} from '@/api'
import { defineStore } from 'pinia'
import { removeToken } from '@/utils/storage'
import { handleServerError } from '@/utils/helpers'
import { setStorage, getStorage, removeStorage } from '@/utils/storage'
import { SETTINGS } from '@/enums'


export const useNavbarStore = defineStore({
	id: 'navbar',
	state: () => ({
		user: null,
		isNavbarOpen: false,
		userTimer: null,
		role: null,
		defaultAvatar: false,
		discordUser: null
	}),
	actions: {
		toggleNavbar(bool) {
			this.isNavbarOpen = bool
		},
		getUserTimer() {
			const that = this

			this.getUser()
			
			that.userTimer = setTimeout(function timerTick() {
				if(that.$router.currentRoute.value.path === '/panel') {
					that.getUserUpdate()
					that.userTimer = setTimeout(timerTick, SETTINGS.DATA_UPDATE_INTERVAL)
				} else {
					clearTimeout(that.userTimer)
				}
			}, SETTINGS.DATA_UPDATE_INTERVAL)
		},
		async getUser() {
			try {
				const res = await getCurrentUserApi()
				this.user = res
				this.setRole()
				
				if(this.user.isFrozen) {
					this.reset()
				}
			} catch(err) {
				if(err.response.data.statusCode === 401) {
					this.reset()
				} else {
					handleServerError(err)
				}
			}
		},
		async getUserUpdate() {
			try {
				const res = await getCurrentUserApi()

				for (let key in res) {
					if(key !== 'avatarURL') {
						this.user[key] = res[key]
					}
				}
				
				if(this.user.isFrozen) {
					this.reset()
				}
			} catch(err) {
				if(err.response.data.statusCode === 401) {
					this.reset()
				} else {
					console.error(err)
				}
			}
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
					this.updateAvatar(response.id, response.avatar)
				})
				.catch(async(err) => {
					handleServerError(err)
				})
			}
		},
		setDefaultAvatar() {
			this.defaultAvatar = true
			this.user.avatarURL = 'img/nb-avatar.png'
		},
		async updateAvatar(discordId, avatarHash) {
			try {
				await updateAvatarApi(discordId, avatarHash)
				this.defaultAvatar = false
				this.getUser()
				this.$router.push({ name: 'dashboard' })
			} catch(err) {
				handleServerError(err)
			}
		},
		async setRole() {
			const storageRole = await getStorage('USER_ROLE')

			if(storageRole && this.user.roles.includes(storageRole)) {
				this.role = storageRole
			} else {
				this.role = this.user.roles[0]
			}
		},
		async changeRole(item) {
			this.role = item
			await setStorage('USER_ROLE', item)
		},
		async reset() {
			await Promise.all([
				removeToken(),
				/* removeStorage('USER_ROLE'), */
				removeStorage('DEFAULT_MERCHANT'),
				this.$reset()
			])			
			
			this.$router.push({name: 'login'})
		}
	}
})