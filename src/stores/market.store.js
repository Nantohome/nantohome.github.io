// stores/market.store.js
import { defineStore } from 'pinia'
import {
	getCustomerAllMerchantsApi,
	createGamepassOrderApi,
	createVipserverOrderApi,
	createMerchantApi,
} from '@/api'
import { handleServerError } from '@/utils/helpers'
import { useLoaderStore, useApiMsgStore } from '@/stores'
import { setStorage, getStorage } from '@/utils/storage'


export const useMarketStore = defineStore({
	id: 'market',
	state: () => ({
		merchant: null,
		type: 'gamepass',
		isProjectShow: false,
		merchantSelect: {
			label: 'Choose merchant',
			disabled: false,
			list: [
				{
					title: 'Create',
					value: 'create'
				}
			]
		},
		typeSelect: {
			label: 'Choose type',
			disabled: false,
			list: [
				{
					title: 'Gamepass',
					value: 'gamepass'
				},
				{
					title: 'Vip-Server',
					value: 'vip-server'
				}
			]
		},
		username: '',
		amount: null,
		placeId: '',
		isPreOrder: false,
		paused: {
			value: false,
			duration: 2_000
		}
	}),
	actions: {
		getData() {
			this.$reset()
			this.getAllMerchantsList()
		},
		async getAllMerchantsList() {
			try {
				const defaultMerchant = await getStorage('DEFAULT_MERCHANT')
				const res = await getCustomerAllMerchantsApi()

				if(res.length > 0) {
					res.forEach((item) => {
						let el = {
							title: item.projectName,
							value: item.APIKey
						}

						if(item.APIKey === defaultMerchant) {
							this.merchantSelect.list.unshift(el)
						} else {
							this.merchantSelect.list.splice(-1, 0, el)
						}
					})
					this.merchant = this.merchantSelect.list[0].value
				}
			} catch(err) {
				handleServerError(err)
			}
		},
		async toggleShowProject(bool) {
			this.isProjectShow = bool
		},
		async createMerch(name, url) {
			const loaderStore = useLoaderStore()
			const apiMsgStore = useApiMsgStore()

			loaderStore.setLoader(true, 'createMerchBtn')

			try {
				await createMerchantApi(name, url, '*')
				this.merchantSelect.list = [
					{
						title: 'Create',
						value: 'create'
					}
				]
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Merchant successfully created', true)
				await this.getAllMerchantsList()
				this.toggleShowProject(false)
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		setPause() {
			this.paused.value = true
			setTimeout(() => {
				this.paused.value = false
			}, this.paused.duration)
		},
		async createOrder() {
			const loaderStore = useLoaderStore()
			const apiMsgStore = useApiMsgStore()

			loaderStore.setLoader(true, 'createOrderBtn')
			this.setPause()
			
			let orderId = this.merchant + (+new Date())
			
			if(this.merchant) {
				try {
					if(this.type === 'gamepass') {
						await createGamepassOrderApi(this.merchant, this.username, orderId, Number(this.amount), Number(this.placeId), this.isPreOrder)
					} else if(this.type === 'vip-server') {
						await createVipserverOrderApi(this.merchant, this.username, orderId, Number(this.amount), Number(this.placeId), this.isPreOrder)
					}
					await loaderStore.setLoader(false)
					apiMsgStore.showMsg('success', 'Success', 'Order successfully created', true)
					this.resetForm()
				} catch(err) {
					await loaderStore.setLoader(false)
					handleServerError(err)
				}
			}
		},
		async changeMerchantSelect(val) {
			setStorage('DEFAULT_MERCHANT', val)
			this.merchant = val
		},
		changeTypeSelect(val) {
			this.type = val
		},
		resetForm() {
			this.username = ''
			this.amount = null
			this.placeId = ''
		}
	}
})