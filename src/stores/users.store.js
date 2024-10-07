// stores/user.store.js
import { defineStore } from 'pinia'
import { handleServerError } from '@/utils/helpers'
import { getAdminAllUsersApi } from '@/api'

export const useUsersStore = defineStore({
	id: 'users',
	state: () => ({
		users: null,
		pageVisibility: 'UsersStart'
	}),
	actions: {
		async getUsers() {
			try {
				const res = await getAdminAllUsersApi()
				this.users = res
			} catch(err) {
				handleServerError(err)
			}
		}
	}
})