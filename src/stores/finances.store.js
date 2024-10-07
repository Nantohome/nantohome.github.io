// stores/finances.store.js
import { defineStore } from 'pinia'
import { useLoaderStore } from '@/stores'
import { handleServerError } from '@/utils/helpers'
import {
	getAdminFinancesFeeApi,
	getAdminDashboardGraphApi
} from '@/api'

export const useFinancesStore = defineStore({
	id: 'finances',
	state: () => ({
		period: null,
		literalPeriod: 'day',
		dayPeriod: null,
		periodSelect: {
			label: 'Period',
			disabled: false,
			list: [
				{
					title: 'Day',
					value: 'day'
				},
				{
					title: 'Week',
					value: 'week'
				},
				{
					title: 'Month',
					value: 'month'
				},
				{
					title: 'Year',
					value: 'year'
				},
				{
					title: 'All time',
					value: 'all-time'
				}
			]
		},
		table: null,
		tableAnimated: false,
		graphObj: null
	}),
	actions: {
		async getData() {
			const loaderStore = useLoaderStore()
			loaderStore.setLoader(true, 'financeStoreRefreshBtn')

			await this.getFee()
			await this.getGraph()
			
			await loaderStore.setLoader(false)
		},
		async getFee() {
			if(this.table !== null) {
				this.tableAnimated = true
			}

			try {
				const res = await getAdminFinancesFeeApi(this.literalPeriod, this.period)
				this.table = res
				this.tableAnimated = false
			} catch(err) {
				handleServerError(err)
			}
		},
		async getGraph() {
			this.graphObj = {}
			this.graphObj.graphData = []
			
			this.table.payout.stats.forEach((item, i) => {
				let el = {}
				
				if(this.literalPeriod === 'year') {
					el.dateString = item.time	
				} else {
					el.dateString = item.dateString
				}				
				el.payoutAmount = item.usdAmount
				el.topupAmount = this.table.topup.stats[i].usdAmount
				el.totalAmount = el.payoutAmount + el.topupAmount
				
				this.graphObj.graphData.push(el)
			})

			this.graphObj.totalRobux = '$' + this.table.totalUsdAmount
		},
		changePeriodSelect(val) {
			this.literalPeriod = val
			val === 'day' ?	this.period = this.dayPeriod : this.period = null
			
			this.getData()
		},
		changePeriod(val) {
			this.dayPeriod = val
			this.period = val
			
			this.getData()
		}
	}
})