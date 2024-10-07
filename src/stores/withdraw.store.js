// stores/withdraw.store.js
import { defineStore } from 'pinia'
import { SETTINGS } from '@/enums'
import { handleServerError } from '@/utils/helpers'
import { useLoaderStore, useApiMsgStore, useNavbarStore } from '@/stores'
import {
	getVendorWithdrawApi,
	searchVendorWithdrawApi,
	getVendorWithdrawFeeApi,
	createVendorWithdrawApi	
} from '@/api'


export const useWithdrawStore = defineStore({
	id: 'withdraw',
	state: () => ({
		list: {
			data: null,
			meta: {
				limit: 10,
				page: 1,
				totalItems: 0,
				totalPages: 1
			},
			sortBy: 'date',
			sortOrder: false,
			animated: false
		},
		isWithdrawModalShow: false,
		currency: 'usdt',
		fee: null
	}),
	getters: {
		formattedSortOrder(state) {
			return state.list.sortOrder ? 'asc' : 'desc'
		}
	},
	actions: {
		toggleShowWithdrawModal(bool) {
			this.isWithdrawModalShow = bool
		},
		async getFee() {
			try {
				const res = await getVendorWithdrawFeeApi()
				this.fee = res
			} catch(err) {
				handleServerError(err)
			}
		},
		async getData() {
			if(this.list.data !== null) {
				this.list.animated = true
			}

			try {
				const res = await getVendorWithdrawApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder)

				this.list.data = res.data
				this.list.meta = res.meta
				this.list.animated = false
			} catch(err) {
				handleServerError(err)
			}
		},
		onPageChange(page) {
			this.list.meta.page = page
			this.getData()
		},
		async searchWallets(str) {
			const apiMsgStore = useApiMsgStore()

			try {
				this.list.animated = true
				const res = await searchVendorWithdrawApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder, str)
				
				if(res.data.length > 0) {
					this.listReset()
					this.list.data = res.data
					this.list.meta = res.meta
				} else {
					apiMsgStore.showMsg('warning', 'Nothing found', `No matches found for <i>${str}</i>`, true)
					this.getData()
				}
				this.list.animated = false
			} catch(err) {
				handleServerError(err)
				this.getData()
			}
		},
		async copyWallet(wallet) {
			const apiMsgStore = useApiMsgStore()

			await navigator.clipboard.writeText(wallet)
			apiMsgStore.showMsg('success', 'Success', 'Copy to clipboard', true)
		},
		getInitFee() {
			console.log(this.fee)
		},
		async addWithdraw(wallet, amount) {
			const apiMsgStore = useApiMsgStore()
			const navbarStore = useNavbarStore()
			const loaderStore = useLoaderStore()
			
			if(amount > 0) {
				let currency = this.currency.toUpperCase()
				loaderStore.setLoader(true, 'addWithdrawBtn')
				
				try {
					await createVendorWithdrawApi(wallet, currency, amount)

					await loaderStore.setLoader(false)
					apiMsgStore.showMsg('success', 'Success', 'Withdrawal Created', true)
					this.getData()
					this.toggleShowWithdrawModal(false)
				} catch(err) {
					await loaderStore.setLoader(false)
					handleServerError(err)
					if(err.response.data.message.includes('unavailable')){
						setTimeout(() => {
							navbarStore.reset()
						}, SETTINGS.FROZEN_LOGOUT_DELAY)
					}
				}
			}
		},
		listReset() {
			this.list.sortBy = 'date'
			this.list.sortOrder = false
		}
	}
})