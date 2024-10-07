// stores/merchants.store.js
import { defineStore } from 'pinia'
import {
	getCustomerAllMerchantsApi,
	getMerchantsMaxRatesApi,
	getCustomerExcludedVendorsApi,
	createMerchantApi,
	getMerchantApi,
	renameMerchantApi,
	changeMaxRateMerchantApi,
	deleteMerchantApi,
	regenerateMerchantApiKeyApi,
	changeMerchantStatusApi,
	changeNotificationUrlMerchantApi,
	changeWhitelistMerchantApi,
	checkNotificationUrlMerchantApi,
	addExcludedVendorApi,
	removeExcludedVendorApi,
	getNotificationBalanceLimitApi,
	setNotificationBalanceLimitApi
} from '@/api'
import { handleServerError } from '@/utils/helpers'
import { useLoaderStore, useApiMsgStore } from '@/stores'

export const useMerchStore = defineStore({
	id: 'merchants',
	state: () => ({
		merchants: null,
		maxRates: null,
		isProjectShow: false,
		settingsMerch: null,
		isDeleteConfirmShow: false,
		deletingMerch: '',
		bannedSellers: null,
		isRegenerateConfirmShow: false,
		notifyBalance: {
			isLimit: false,
			value: null,
			serverValue: null
		}
	}),
	actions: {
		async getData() {
			this.$reset()

			await this.getMaxRates()
			
			await Promise.all([
				this.getNotificationLimit(),
				this.getMerchants()
			])
		},
		async getMerchants() {
			try {
				const res = await getCustomerAllMerchantsApi()

				this.merchants = res
			} catch(err) {
				handleServerError(err)
			}
		},
		async getMaxRates() {
			try {
				const res = await getMerchantsMaxRatesApi()

				this.maxRates = res
			} catch(err) {
				handleServerError(err)
			}
		},
		async getBannedSellers(id) {
			try {
				const res = await getCustomerExcludedVendorsApi(id)

				this.bannedSellers = res
			} catch(err) {
				handleServerError(err)
			}
		},
		toggleShowProject(bool) {
			this.isProjectShow = bool
		},
		async create(name, url) {
			const loaderStore = useLoaderStore()

			loaderStore.setLoader(true, 'createMerchBtn')

			try {
				const res = await createMerchantApi(name, url, '*')
				await loaderStore.setLoader(false)
				this.showMerchSettings(res.id)
				this.toggleShowProject(false)
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async showMerchSettings(id) {
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, `merchBtn_${id}`)

			await this.getBannedSellers(id)

			try {
				const res = await getMerchantApi(id)
				
				this.settingsMerch = res
				await loaderStore.setLoader(false)
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		hideMerchSettings() {
			this.getMerchants()
			this.settingsMerch = null
		},
		async copyApi(api) {
			const apiMsgStore = useApiMsgStore()

			await navigator.clipboard.writeText(api)
			apiMsgStore.showMsg('success', 'Success', 'Copy to clipboard', true)
		},
		async renameMerch(id, val) {
			try {
				const answer = {}

				const res = await renameMerchantApi(id, val)
				answer.data = res
				return answer
			} catch(err) {
				handleServerError(err)
			}
		},
		async changeMaxRate(id, maxRate) {
			try {
				await changeMaxRateMerchantApi(id, maxRate)
			} catch(err) {
				handleServerError(err)
			}
		},
		deleteMerch(id) {
			this.deletingMerch = id
			this.isDeleteConfirmShow = true
		},
		cancelDelete() {
			this.isDeleteConfirmShow = false
			this.deletingMerch = ''
		},		
		async confirmDelete() {
			try {
				await deleteMerchantApi(this.deletingMerch)
				this.getMerchants()
			} catch(err) {
				handleServerError(err)
			}
			
			this.isDeleteConfirmShow = false
			this.deletingMerch = ''
		},
		async regenerateApiKey() {
			const apiMsgStore = useApiMsgStore()

			try {
				const res = await regenerateMerchantApiKeyApi(this.settingsMerch.id)
				this.settingsMerch.APIKey = res
				apiMsgStore.showMsg('success', 'Success', 'API key regenerated', true)
			} catch(err) {
				handleServerError(err)
			}
		},
		async changeStatus(status) {
			try {
				const res = await changeMerchantStatusApi(this.settingsMerch.id, status)
				this.settingsMerch.status = res
			} catch(err) {
				handleServerError(err)
			}
		},
		saveData(callbackUrl, whitelist) {
			const loaderStore = useLoaderStore()
						
			const formattedWhitelist = Array.isArray(whitelist) ? whitelist : whitelist.split(',')
			const threshold = this.notifyBalance.isLimit ? Number(this.notifyBalance.value) : null

			loaderStore.setLoader(true, 'merchSettingsBtn')
    
			if(callbackUrl !== this.settingsMerch.callbackURL) {
				this.saveCallbackUrl(callbackUrl)
			}
			if(formattedWhitelist !== this.settingsMerch.whitelistedIpsAndDomains) {
				this.saveWhitelist(formattedWhitelist)
			}
			if(this.notifyBalance.value !== this.notifyBalance.serverValue || (this.notifyBalance.serverValue !== null && !this.notifyBalance.isLimit)) {
				this.setNotificationLimit(threshold)
			}
		},
		async saveCallbackUrl(callbackUrl) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()

			try {
				const res = await changeNotificationUrlMerchantApi(this.settingsMerch.id, callbackUrl)
				this.settingsMerch.callbackURL = res
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Notification URL saved', true)
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async saveWhitelist(whitelist) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()

			try {
				const res = await changeWhitelistMerchantApi(this.settingsMerch.id, whitelist)
				this.settingsMerch.whitelistedIpsAndDomains = res
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Whitelisted URL’s saved', true)
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async setNotificationLimit(threshold) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()

			try {
				const res = await setNotificationBalanceLimitApi(threshold)
				this.notifyBalance.value = res.lowBalanceNotificationThreshold
				this.notifyBalance.serverValue = res.lowBalanceNotificationThreshold
				res.lowBalanceNotificationThreshold ? this.notifyBalance.isLimit = true : this.notifyBalance.isLimit = false
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Balance limit notify saved', true)
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async addExcludedVendor(val) {
			const apiMsgStore = useApiMsgStore()

			try {
				const res = await addExcludedVendorApi(this.settingsMerch.id, val)
				
				if(res.isSuccess) {
					this.getBannedSellers(this.settingsMerch.id)
					apiMsgStore.showMsg('success', 'Success', 'Successfully banned this user from stocking you', true)
				}
			} catch(err) {
				handleServerError(err)
			}
		},
		async removeExcludedVendor(val) {
			const apiMsgStore = useApiMsgStore()

			try {
				const res = await removeExcludedVendorApi(this.settingsMerch.id, val)
				
				if(res.isSuccess) {
					this.getBannedSellers(this.settingsMerch.id)
					apiMsgStore.showMsg('success', 'Success', 'Successfully unbanned this user from stocking you, they should be able to stock you')
				}
			} catch(err) {
				handleServerError(err)
			}
		},
		async checkCallback(callbackUrl) {
			const apiMsgStore = useApiMsgStore()

			if(callbackUrl !== null) {
				try {
					const res = await checkNotificationUrlMerchantApi(callbackUrl)
					
					if(res.isValid)	{
						apiMsgStore.showMsg('success', 'Success', 'Notification URL is correct')
					} else {
						if(res.errorCode) {
							apiMsgStore.showMsg('error', 'Error', `Error code: ${res.errorCode}`)
						} else {
							apiMsgStore.showMsg('error', 'Error', 'Notification URL is not correct')
						}
						
					}
				} catch(err) {
					handleServerError(err)
				}
			}
		},
		toggleShowRegenerate(bool) {
			this.isRegenerateConfirmShow = bool
		},
		cancelRegenerate() {
			this.toggleShowRegenerate(false)
		},
		async confirmRegenerate() {
			await this.regenerateApiKey()
			this.toggleShowRegenerate(false)
		},
		async getNotificationLimit() {
			try {
				const res = await getNotificationBalanceLimitApi()
				
				this.notifyBalance.value = res.lowBalanceNotificationThreshold
				this.notifyBalance.serverValue = res.lowBalanceNotificationThreshold
				res.lowBalanceNotificationThreshold ? this.notifyBalance.isLimit = true : this.notifyBalance.isLimit = false
			} catch(err) {
				handleServerError(err)
			}
		}
	}
})