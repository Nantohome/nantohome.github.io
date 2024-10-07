// stores/affiliate.store.js
import { defineStore } from 'pinia'
import { handleServerError } from '@/utils/helpers'
import { useLoaderStore, useApiMsgStore } from '@/stores'
import {
	getAffiliateStatsApi,
	getAffiliateUsersApi,
	changeInviteCodeApi
} from '@/api'


export const useAffiliateStore = defineStore({
	id: 'affiliate',
	state: () => ({
		stats: {
			referralsCount: null,
			referrerPercent: null,
			referralsTotalEarned: null,
			inviteCode: ''
		},
		list: {
			data: null,
			meta: {
				limit: 10,
				page: 1,
				totalItems: 1,
				totalPages: 1
			},
			sortBy: 'login',
			sortOrder: false,
			animated: false
		},
		isCodeEditable: false
	}),
	getters: {
		formattedSortOrder(state) {
			return state.list.sortOrder ? 'asc' : 'desc'
		},
		inviteLink(state) {
			return window.location.origin + '/r/' + state.stats.inviteCode
		}
	},
	actions: {
		getData() {
			this.getStats()
			this.getUsers()
		},
		async getUsers() {
			if(this.list.data !== null) {
				this.list.animated = true
			}

			try {
				const res = await getAffiliateUsersApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder)
				this.list.data = res.data
				this.list.meta = res.meta
				this.list.animated = false
			} catch(err) {
				handleServerError(err)
			}
		},
		async getStats() {
			try {
				const res = await getAffiliateStatsApi()
				this.stats = res
				this.isCodeEditable = false
			} catch(err) {
				handleServerError(err)
			}
		},
		onPageChange(page) {
			this.list.meta.page = page
			this.getUsers()
		},
		async changeCode(code) {
			const loaderStore = useLoaderStore()
			const apiMsgStore = useApiMsgStore()
			
			loaderStore.setLoader(true, 'affiliateStoreEditCodeBtn')

			try {
				await changeInviteCodeApi(code)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Invite code saved', true)
				this.getStats()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async copyLink() {
			const apiMsgStore = useApiMsgStore()

			await navigator.clipboard.writeText(this.inviteLink)
			apiMsgStore.showMsg('success', 'Success', 'Copy to clipboard', true)
		}
	}
})