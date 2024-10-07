// stores/vendor.store.js
import { useApiMsgStore } from '@/stores'
import {
	getVendorRatesApi,
	getVendorDashboardOrdersStatsApi,
	getVendorDashboardGraphApi,
	getVendorDashboardAccountsApi,
	getVendorDashboardTotalRobuxApi,
	getVendorDashboardPendingOrdersApi,
	changeVendorRatesApi
} from '@/api'

import { defineStore } from 'pinia'
import { handleServerError } from '@/utils/helpers'
import { SETTINGS } from '@/enums'



export const useVendorStore = defineStore({
	id: 'vendor',
	state: () => ({
		period: null,
		literalPeriod: 'day',
		dayPeriod: null,
		rateSelect: {
			label: 'Change rate',
			desc: 'Rate',
			list: [
				{
					title: null,
					value: null
				}
			]
		},
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
		graphObj: null,
		list: {
			data: null,
			meta: {
				limit: 6,
				page: 1,
				totalItems: 0,
				totalPages: 1
			},
			sortBy: 'rate',
			sortOrder: true,
			current: null,
			animated: false,
			defaultSize: false
		},
		totalRobux: 0,
		ordersStats: {
			completedOrders: 0,
			pendingOrdersCount: 0,
			totalRobuxSold: 0,
			totalUSDEarned: 0
		},
		pendingOrders: {
			list: {
				data: null,
				meta: {
					limit: 6,
					page: 1,
					totalItems: 0,
					totalPages: 1
				}
			},
			isShow: false
		},
		vendorTimer: null
	}),
	getters: {
		formattedSortOrder(state) {
			return state.list.sortOrder ? 'asc' : 'desc'
		}
	},
	actions: {
		toggleShowPendingOrders(bool) {
			this.pendingOrders.isShow = bool
		},
		async getRates() {
			try {
				const res = await getVendorRatesApi()
				
				res.forEach((item, index) => {
					let el = {}
					
					el.title = item.rate
					el.value = item.id
				
					if(index === 0) {
						el.default = true
						this.rateSelect.list.splice(0, 1, el)
					} else {
						this.rateSelect.list.push(el)
					}
				})
			} catch(err) {
				handleServerError(err)
			}
		},
		async changeRateSelect(val) {
			const apiMsgStore = useApiMsgStore()
			
			try {
				const res = await changeVendorRatesApi(val)
				this.getAccountsList()
				apiMsgStore.showMsg('success', 'Success', `${res.updatedCount} accounts were updated`)
			} catch(err) {
				handleServerError(err)
			}
		},
		async getOrdersStatsInitial() {
			try {
				const res = await getVendorDashboardOrdersStatsApi(this.literalPeriod, this.period) // without arguments - 'all-time'
				this.ordersStats = res
			} catch(err) {
				handleServerError(err)
			}
		},
		async getOrdersStats() {
			try {
				const res = await getVendorDashboardOrdersStatsApi(this.literalPeriod, this.period) // without arguments - 'all-time'
				this.ordersStats = res
			} catch(err) {
				console.error(err)
			}
		},
		async getAccountsList() {
			if(this.list.data !== null) {
				this.list.animated = true
			}

			try {
				const res = await getVendorDashboardAccountsApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder)

				
				this.list.data = res.data
				this.list.meta = res.meta

				if(res.meta.page !== 1 && res.meta.page === res.meta.totalPages)  { // add empty rows on last page
					this.defaultSize = true
				} else {
					this.defaultSize = false
				}

				this.list.animated = false
			} catch(err) {
				handleServerError(err)
			}
		},
		async getTotalRobux() {
			try {
				const res = await getVendorDashboardTotalRobuxApi()
				this.totalRobux = res.totalQueueRobux
			} catch(err) {
				handleServerError(err)
			}
		},
		async getGraphInitial() {
			try {
				const res = await getVendorDashboardGraphApi(this.literalPeriod, this.period)
				this.graphObj = res
			} catch(err) {
				handleServerError(err)
			}
		},
		async getGraph() {
			try {
				const res = await getVendorDashboardGraphApi(this.literalPeriod, this.period)
				this.graphObj = res
			} catch(err) {
				console.error(err)
			}
		},
		async getPendingOrders() {
			try {
				const res = await getVendorDashboardPendingOrdersApi(this.literalPeriod, this.period, this.pendingOrders.list.meta.limit, this.pendingOrders.list.meta.page)
				
				this.pendingOrders.list.data = res.data
				this.pendingOrders.list.meta = res.meta
			} catch(err) {
				handleServerError(err)
			}
		},
		onPageChangePendingOrders(page) {
			this.pendingOrders.list.meta.page = page
			this.getPendingOrders()
		},
		getAllStatsTimer() {
			const that = this

			this.$reset()
			this.getAllStats()
			
			this.vendorTimer = setTimeout(function timerTick() {
				if(that.$router.currentRoute.value.name === 'dashboard') {
					that.getStats()
					that.vendorTimer = setTimeout(timerTick, SETTINGS.DATA_UPDATE_INTERVAL)
				} else {
					clearTimeout(that.vendorTimer)
				}
			}, SETTINGS.DATA_UPDATE_INTERVAL)
		},
		async getAllStats() {
			await Promise.all([
				this.getRates(),
				this.getTotalRobux(),
				this.getAccountsList(),
				this.getOrdersStatsInitial(),
				this.getGraphInitial()
			])
		},
		async getStats() {
			await Promise.all([
				this.getOrdersStats(),
				this.getGraph()
			])
		},
		async showPendingOrders() {
			await this.getPendingOrders()
			this.toggleShowPendingOrders(true)
		},
		changePeriodSelect(val) {
			this.literalPeriod = val
			val === 'day' ?	this.period = this.dayPeriod : this.period = null
			
			this.getStats()
		},
		changePeriod(val) {
			this.dayPeriod = val
			this.period = val
			
			this.getStats()
		},
		onPageChange(page) {
			this.list.meta.page = page
			this.getAccountsList()
		}
	}
})