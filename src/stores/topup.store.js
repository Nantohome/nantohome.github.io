// stores/topup.store.js
import { getTopupLinkApi, getTopupFeeApi } from '@/api'
import { defineStore } from 'pinia'
import { useLoaderStore } from '@/stores'
import { handleServerError } from '@/utils/helpers'

export const useTopupStore = defineStore({
	id: 'topup',
	state: () => ({
		selectObj: {
			list: [
				{
					title: 'Crypto',
					beginTitle: 'icon-crypto',
					endTitle: '',
					value: ''
				}
			]
		},
		fee: {
			number: 0.01,
			str: '+ 1%'
		},
		isTopupShow: false
	}),
	getters: {
		getFee: (state) => `+ ${(state.fee * 100).toFixed(2)}%`
	},
	actions: {
		toggleShow(bool) {
			this.isTopupShow = bool
		},
		async getInitFee() {
			try {
				const res = await getTopupFeeApi()

				this.fee.number =  parseFloat(res.cryptoFeePercentage) / 100
				this.fee.str =  `+ ${res.cryptoFeePercentage}`
				this.selectObj.list[0].endTitle = `fee ${res.cryptoFeePercentage}`
			} catch(err) {
				handleServerError(err)
			}
		},
		changeSelectObj(val, i) {
			this.fee = this.list[i].fee
		},
		async pay(amount) {
			const loaderStore = useLoaderStore()
			loaderStore.setLoader(true, 'topupBtn')

			try {
				const res = await getTopupLinkApi(String(amount))

				await loaderStore.setLoader(false)
				if(res.url) {
					window.open(res.url, "_self")
				} else {
					throw 'Can not create order'
				}
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		}
	}
})