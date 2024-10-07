// stores/settings.store.js
import { defineStore } from 'pinia'
import { useLoaderStore, useApiMsgStore } from '@/stores'
import { handleServerError } from '@/utils/helpers'
import {
	getAdminSettingsApi,
	setAdminSettingsApi,
	updateRateApi,
	deleteRatesApi,
	addRateApi
} from '@/api'


export const useSettingsStore = defineStore({
	id: 'settings',
	state: () => ({
		settings: null,
		method: null,
		isDeleteRatesShow: false,
		isAddRateShow: false,
		deletingArr: [],
		notification: {
			typeSelect: {
				label: 'Type',
				disabled: false,
				list: [
					{
						title: 'None',
						value: 'none'
					},
					{
						title: 'System notification',
						value: 'system'
					}
				]
			},
			type: 'none',
			sendToSelect: {
				label: 'Send to',
				disabled: false,
				list: [
					{
						title: 'None',
						value: 'none'
					},
					{
						title: 'Customers',
						value: 'customers'
					},
					{
						title: 'Suppliers',
						value: 'suppliers'
					},
					{
						title: 'All users',
						value: 'allusers'
					}
				]
			},
			sendTo: 'none',
			isMessagePreviewShow: false,
			text: ''
		}
	}),
	actions: {
		async getSettings() {
			try {
				const res = await getAdminSettingsApi()
				this.settings = res
				this.settings.paymentMethods = JSON.parse(res.paymentMethods)
				this.setMethod(res.paymentMethods[0].name)
			} catch(err) {
				handleServerError(err)
			}
		},
		setMethod(x) {
			switch(x) {
				case 'USDT_TRC20':
					this.method = 'usdt'
					break
				case 'LTC':
					this.method = 'ltc'
					break
			}
		},
		changeMethod(val) {
			this.setMethod(val)
		},
		async saveSettings(btn) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()

			loaderStore.setLoader(true, btn)
			try {
				await setAdminSettingsApi(
				/* console.log( */
					{
						'autoSuppliersVerify': this.settings.autoSuppliersVerify,
						'autoCustomersVefify': this.settings.autoCustomersVefify,
						'autoWithdraws': this.settings.autoWithdraws,
						'autoWithdrawMaxAmount': Number(this.settings.autoWithdrawMaxAmount),
						'minWithdrawalAmount': Number(this.settings.minWithdrawalAmount),
						'minBuyingMerchantRate': Number(this.settings.minBuyingMerchantRate),
						'maxBuyingMerchantRate': Number(this.settings.maxBuyingMerchantRate),
						'cryptoTopupFeeFixed': Number(this.settings.cryptoTopupFeeFixed),
						'cryptoTopupFeePercent': Number(this.settings.cryptoTopupFeePercent),
						'cisCountryTopupFeePercent': Number(this.settings.cisCountryTopupFeePercent),
						'cisCountryTopupFeeFixed': Number(this.settings.cisCountryTopupFeeFixed),
						'usdtFixedPayoutFee': Number(this.settings.usdtFixedPayoutFee),
						'usdtPayoutFeePercent': Number(this.settings.usdtPayoutFeePercent),
						'ltcFixedPayoutFee': Number(this.settings.ltcFixedPayoutFee),
						'ltcPayoutFeePercent': Number(this.settings.ltcPayoutFeePercent),
						'referrerGlobalPercent': Number(this.settings.referrerGlobalPercent),
						'paymentMethods': this.settings.paymentMethods
					}
				)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Settings saved', true)
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async updateRate(id, rate, isEnabled) {
			try {
				await updateRateApi(id, rate, isEnabled)
			} catch(err) {
				handleServerError(err)
			}
		},
		toggleShowDeleteRates(bool) {
			this.isDeleteRatesShow = bool
		},
		toggleShowAddRate(bool) {
			this.isAddRateShow = bool
		},
		async deleteRates(arr) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()

			loaderStore.setLoader(true, 'deleteRatesBtn')
			arr.forEach((item) => {
				if(item.deleting) {
					let el = item.id
					this.deletingArr.push(el)
				}
			})

			try {
				await deleteRatesApi(this.deletingArr)
				this.deletingArr = []
				this.getSettings()
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Rates deleted', true)
				this.toggleShowDeleteRates(false)
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async addRate(rate) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()

			loaderStore.setLoader(true, 'addRateBtn')
			try {
				await addRateApi(rate)
				this.settings.vendorRates = null
				this.getSettings()
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Rate added', true)
				this.toggleShowAddRate(false)
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		toggleShowMessagePreview(bool) {
			this.notification.isMessagePreviewShow = bool
		},
		async sendNotification() {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()

			loaderStore.setLoader(true, 'messagePreviewBtn')
			try {
				await console.log(this.notification.text, this.notification.type, this.notification.sendTo)
				this.notification.text = ''
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Message sent', true)
				this.toggleShowMessagePreview(false)
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		}
	}
})