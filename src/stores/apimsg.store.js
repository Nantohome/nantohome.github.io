// stores/apimsg.store.js
import { defineStore } from 'pinia'
import { SETTINGS } from '@/enums'

export const useApiMsgStore = defineStore({
	id: 'apimsg',
	state: () => ({
		apiMsg: {
			show: false,
			type: 'error',
			title: 'Error',
			text: '',
			delay: false
		},
		timer: null
	}),
	actions: {
		async showMsg(type, title, text, delay = false) {
			if(this.timer) {
				clearTimeout(this.timer)
			}
			await this.hideMsg()
			setTimeout(() => {
				this.apiMsg.type = type
				this.apiMsg.title = title
				this.apiMsg.text = text
				this.apiMsg.show = true
				this.apiMsg.delay = delay

				if(this.apiMsg.delay) {
					this.timer = setTimeout(() => {
						this.apiMsg.show = false
					}, SETTINGS.API_MSG_DELAY)
				}
			}, SETTINGS.ANIM_TIME)
		},
		async hideMsg() {
			this.apiMsg.show = false
		}
	}
})