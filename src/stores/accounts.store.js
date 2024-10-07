// stores/accounts.store.js
import { defineStore } from 'pinia'
import { useLoaderStore, useApiMsgStore } from '@/stores'
import { handleServerError } from '@/utils/helpers'
import {
	getVendorAccountsApi,
	getVendorAccountsSummaryApi,
	searchVendorAccountsApi,
	getVendorAccountsPricesApi,
	getVendorAccountsProxiesApi,
	addVendorAccountApi,
	addVendorAccountsApi,
	enableVendorAccountsApi,
	disableVendorAccountsApi,
	deleteVendorAccountsApi,
	updateVendorAccountsApi,
	changeVendorAccountsRateApi,
	changeVendorRatesApi
} from '@/api'

export const useAccountsStore = defineStore({
	id: 'accounts',
	state: () => ({
		list: {
			data: [],
			meta: {
				limit: 10,
				page: 1,
				totalItems: 0,
				totalPages: 1
			},
			sortBy: 'balance',
			sortOrder: false,
			selected: [],
			current: null,
			animated: false,
			checkAll: false
		},
		currentRate: null,
		ratesSelect: {
			label: 'Choose rate',
			list: []
		},
		priceSelect: {
			label: 'Price per 1000 R$',
			list: []
		},
		proxySelect: {
			label: 'Proxy',
			list: []
		},
		isDeleteConfirmShow: false,
		isChangeRateShow: false,
		isAddAccountsShow: false,
		isAddAccounts2FAShow: false,
		addAccounts: {
			cookies: null,
			price: null,
			proxy: null,
			twoFactorAuth: false,
			myProxy: false
		},
		summary: {
			totalRobuxAmount: 0,
			accountCount: 0
		}
	}),
	getters: {
		formattedSortOrder(state) {
			return state.list.sortOrder ? 'asc' : 'desc'
		}
	},
	actions: {
		async sendAccounts(cookies) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'addAccountsBtn')
			
			this.addAccounts.cookies = cookies.split('\n')


			if(!this.addAccounts.myProxy) {
				if(this.addAccounts.cookies.length === 1) {
					try {
						const res = await addVendorAccountApi(this.addAccounts.cookies[0], this.addAccounts.price)
						if(res.username) {
							apiMsgStore.showMsg('success', 'Success', `Account ${res.username} with ${res.robuxBalance} R$ added`, true)
						}
						this.getData()
						await loaderStore.setLoader(false)
						this.isAddAccountsShow = false
					} catch(err) {
						await loaderStore.setLoader(false)
						handleServerError(err)
					}
				} else {
					await loaderStore.setLoader(false)
					apiMsgStore.showMsg('error', 'Error', 'You must add only ONE cookie, if want more click “Use My Proxy” and choose your proxy')
				}
			} else {
				try {
					const res = await addVendorAccountsApi(this.addAccounts.cookies, this.addAccounts.price, this.addAccounts.proxy)
					
					if(res.addedCookies.length > 0) {
						apiMsgStore.showMsg('success', 'Success', res.message, true)
					} else if(res.failedCookies.length > 0) {
						apiMsgStore.showMsg('warning', res.failedCookies[0].reason, res.message)
					}

					this.getData()
					await loaderStore.setLoader(false)
					this.isAddAccountsShow = false
				} catch(err) {
					await loaderStore.setLoader(false)
					handleServerError(err)
				}
			}
		},
		async addTwoFactorAccounts(key) {
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'addAccounts2FABtn')

			console.log(this.addAccounts.cookies, this.addAccounts.price, this.addAccounts.proxy, key)
			await loaderStore.setLoader(false)
			this.isAddAccounts2FAShow = false
		},
		toggleShowChangeRate(bool) {
			this.isChangeRateShow = bool
		},
		toggleShowAddAccounts(bool) {
			this.isAddAccountsShow = bool
		},
		toggleShowAddAccounts2FA(bool) {
			this.isAddAccounts2FAShow = bool
		},
		async getPrices() {
			try {
				const res = await getVendorAccountsPricesApi()

				this.priceSelect.list = []
				this.ratesSelect.list = []

				res.forEach((item, index) => {
					let elPrice = {},
						elRate = {}

					elPrice.title = `${item.accountAmount}`
					elPrice.value = item.rateId
					elPrice.beginTitle = `${item.rateUSD} •`
					elPrice.endTitle = `• ${item.totalRobux} R$`
					item.accountAmount === 0 ? elPrice.color = 'red' : elPrice.color = 'green'

					elRate.title = item.rate
					elRate.value = item.rateId

					if(index === 0) {
						elRate.default = true
						this.currentRate = item.rateId
					}

					this.priceSelect.list.push(elPrice)
					this.ratesSelect.list.push(elRate)
				})

				this.addAccounts.price = this.priceSelect.list[0].value
			} catch(err) {
				handleServerError(err)
			}
		},
		async getProxies() {
			try {
				const res = await getVendorAccountsProxiesApi()

				this.proxySelect.list = []

				res.forEach((item) => {
					let el = {}
					
					el.title = item.host + ':' + String(item.port)
					el.value = item.id
					if(item.status === 'Active') {
						this.proxySelect.list.push(el)
					}
				})

				this.addAccounts.proxy = this.proxySelect.list[0]?.value ?? null
				/* this.addAccounts.proxy = this.proxySelect.list[0].value */
			} catch(err) {
				handleServerError(err)
			}
		},
		async getSummary() {
			try {
				const res = await getVendorAccountsSummaryApi()
				this.summary = res
			} catch(err) {
				handleServerError(err)
			}
		},
		async getInitialData() {
			this.$reset()
			await Promise.all([
				this.getData(),
				this.getPrices(),
				this.getProxies()
			])
		},
		async getData() {
			if(this.list.data !== null) {
				this.list.animated = true
			}

			this.getSummary()

			try {
				const res = await getVendorAccountsApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder)

				this.list.data = res.data
				this.list.meta = res.meta
				this.checkAllSelected()
				this.list.animated = false
			} catch(err) {
				handleServerError(err)
			}
		},
		async searchAccounts(str) {
			const apiMsgStore = useApiMsgStore()

			if(str.length > 0) {
				try {
					this.list.animated = true
					const res = await searchVendorAccountsApi(str)
					
					if(res.length > 0) {
						this.listReset()
						this.list.data = res
					} else {
						apiMsgStore.showMsg('warning', 'Nothing found', `No matches found for <i>${str}</i>`, true)
						this.getData()
					}
					this.list.animated = false
				} catch(err) {
					handleServerError(err)
					this.getData()
				}
			} else {
				this.getData()
			}
		},
		onPageChange(page) {
			this.list.meta.page = page
			this.getData()
		},
		deleteSelected(id = this.list.selected) {
			this.list.current = id
			this.isDeleteConfirmShow = true
		},
		cancelDelete() {
			this.isDeleteConfirmShow = false
		},
		async confirmDelete() {
			const apiMsgStore = useApiMsgStore()

			try {
				await deleteVendorAccountsApi(this.list.current, this.list.checkAll)
				apiMsgStore.showMsg('success', 'Success', 'Accounts deleted', true)
				this.getData()
			} catch(err) {
				handleServerError(err)
			}

			this.isDeleteConfirmShow = false
		},
		async updateSelected(accounts = this.list.selected) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'accountsUpdateBtn')

			try {
				await updateVendorAccountsApi(accounts, this.list.checkAll)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Cookies updated', true)
				this.getData()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async changeRate() {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'changeRateBtn')

			try {
				if(this.list.checkAll) {
					await changeVendorRatesApi(this.currentRate)
				} else {
					await changeVendorAccountsRateApi(this.list.selected, this.currentRate)
				}

				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Price changed', true)
				this.getData()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}

			this.isChangeRateShow = false
		},
		async activateSelected() {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'accountsActivateBtn')

			try {
				await enableVendorAccountsApi(this.list.selected, this.list.checkAll)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Accounts activated', true)
				this.getData()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async deactivateSelected() {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'accountsDeactivateBtn')

			try {
				await disableVendorAccountsApi(this.list.selected, this.list.checkAll)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Accounts deactivated', true)
				this.getData()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		checkAll() {
			this.list.checkAll = !this.list.checkAll
			this.checkAllSelected()
		},
		checkAllSelected() {
			if(this.list.checkAll) {
				this.list.selected = []
				this.list.data.forEach((item) => {
					this.list.selected.push(item.id)
				})
			} else {
				this.list.selected = []
			}
		},
		listReset() {
			this.list.checkAll = false
			this.list.meta.page = 1
			this.list.meta.totalPages = 1
			this.list.selected = []
			this.list.sortBy = 'balance'
			this.list.sortOrder = false
		}
	}
})