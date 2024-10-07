// stores/notify.store.js
import { defineStore } from 'pinia'

export const useNotifyStore = defineStore({
	id: 'notify',
	state: () => ({
		unreadMsg: null
	})
})