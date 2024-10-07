// stores/customer.store.js
import {
	getCustomerAllMerchantsApi,
	getCustomerDashboardOrdersStatsApi,
	getCustomerDashboardGraphApi,
	getCustomerDashboardAvailableRobuxApi,
	getCustomerDashboardTotalRobuxApi
} from '@/api'

import { defineStore } from 'pinia'
import { handleServerError } from '@/utils/helpers'
import { SETTINGS } from '@/enums'



export const useCustomerStore = defineStore({
	id: 'customer',
	state: () => ({
		merchant: 'all',
		type: 'all',
		period: null,
		literalPeriod: 'day',
		dayPeriod: null,
		merchantSelect: {
			label: 'Choose merchant',
			disabled: false,
			list: [
				{
					title: 'All',
					value: 'all'
				},
				{
					title: 'Create your first merchant to continue',
					value: 'create'
				}
			]
		},
		typeSelect: {
			label: 'Type',
			disabled: false,
			list: [
				{
					title: 'All',
					value: 'all'
				},
				{
					title: 'Gamepass',
					value: 'Gamepass'
				},
				{
					title: 'Vip-Server',
					value: 'Vip_server'
				}/* ,
				{
					title: 'Plugin',
					value: 'plugin'
				} */
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
		ordersStats: {
			completedOrdersCount: 0,
			pendingOrders: {
				ordersCount: 0,
				robuxAmount: 0
			},
			buyedRobuxAmount: 0,
			creditsSpentAmount: 0,
			availableRobuxAmount: 0,
			averageRate: 0,
			merchantStats: []
		},
		graphObj: null,
		availableRobux: {
			list: {
				data: null,
				meta: {
					limit: 6,
					page: 1,
					totalItems: 0,
					totalPages: 1
				},
				sortBy: 'rate',
				sortOrder: true
			},
			totalRobux: 0,
			isShow: false
		},
		customerTimer: null
	}),
	getters: {
		formattedSortOrder(state) {
			return state.availableRobux.list.sortOrder ? 'asc' : 'desc'
		}
	},
	actions: {
		async getAllMerchantsList() {
			await this.resetMerchants()
			
			try {
				const res = await getCustomerAllMerchantsApi()
				
				if(res.length > 0) {
					this.merchantSelect.list.splice(1, 1) // remove 'Create your first merchant to continue

					res.forEach((item) => {
						let el = {}
						el.title = item.projectName
						el.value = item.id

						this.merchantSelect.list.push(el)
					})
				}
			} catch(err) {
				handleServerError(err)
			}
		},
		async getOrdersStatsInitial() {
			try {
				const res = await getCustomerDashboardOrdersStatsApi(this.merchant, this.type, this.literalPeriod, this.period) // without arguments - 'all-time'
				this.ordersStats = res
			} catch(err) {
				handleServerError(err)
			}
		},
		async getOrdersStats() {
			try {
				const res = await getCustomerDashboardOrdersStatsApi(this.merchant, this.type, this.literalPeriod, this.period) // without arguments - 'all-time'
				this.ordersStats = res
			} catch(err) {
				console.error(err)
			}
		},
		async getGraphInitial() {
			try {
				const res = await getCustomerDashboardGraphApi(this.merchant, this.type, this.literalPeriod, this.period)
				this.graphObj = res
			} catch(err) {
				handleServerError(err)
			}
		},
		async getGraph() {
			try {
				const res = await getCustomerDashboardGraphApi(this.merchant, this.type, this.literalPeriod, this.period)
				this.graphObj = res
			} catch(err) {
				console.error(err)
			}
		},
		getAllStatsTimer() {
			const that = this

			this.$reset()
			this.getAllStats()
			
			this.customerTimer = setTimeout(function timerTick() {
				if(that.$router.currentRoute.value.name === 'dashboard') {
					that.getStats()
					that.customerTimer = setTimeout(timerTick, SETTINGS.DATA_UPDATE_INTERVAL)
				} else {
					clearTimeout(that.customerTimer)
				}
			}, SETTINGS.DATA_UPDATE_INTERVAL)
		},
		async getAllStats() {
			await Promise.all([
				this.getAllMerchantsList(),
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
		changeMerchantSelect(val) {
			this.merchant = val

			if(val === 'create') {
				this.$router.push({ name: 'merchants' })
			} else {
				this.getStats()
			}
		},
		changeTypeSelect(val) {
			this.type = val

			this.getStats()
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
		toggleShowAvailableRobux(bool) {
			this.availableRobux.isShow = bool
		},
		async showAvailableRobux() {
			await Promise.all([
				this.getAvailableRobux(),
				this.getTotalRobux()
			])
			this.toggleShowAvailableRobux(true)
		},
		async getAvailableRobux() {
			try {
				const res = await getCustomerDashboardAvailableRobuxApi(this.availableRobux.list.meta.limit, this.availableRobux.list.meta.page, this.availableRobux.list.sortBy, this.formattedSortOrder)
				
				this.availableRobux.list.data = res.data
				this.availableRobux.list.meta = res.meta
			} catch(err) {
				handleServerError(err)
			}
		},
		async getTotalRobux() {
			try {
				const res = await getCustomerDashboardTotalRobuxApi()
				this.availableRobux.totalRobux = res.totalQueueRobux
			} catch(err) {
				handleServerError(err)
			}
		},
		onPageChange(page) {
			this.availableRobux.list.meta.page = page
			this.getAvailableRobux()
		},
		async resetMerchants() {
			this.merchantSelect.list = [
				{
					title: 'All',
					value: 'all'
				},
				{
					title: 'Create your first merchant to continue',
					value: 'create'
				}
			]
		}
	}
})