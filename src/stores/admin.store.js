// stores/admin.store.js
import {
	getUsersByLoginApi,
	getAdminDashboardStatsApi,
	getAdminDashboardGraphApi,
	getAdminDashboardAllMerchantsApi,
	getVendorDashboardPendingOrdersApi,
	getCustomerDashboardAvailableRobuxApi,
	getCustomerDashboardTotalRobuxApi
} from '@/api'

import { defineStore } from 'pinia'
import { handleServerError } from '@/utils/helpers'
import { SETTINGS } from '@/enums'



export const useAdminStore = defineStore({
	id: 'admin',
	state: () => ({
		customer: {
			value: null,
			title: null
		},
		merchant: {
			value: null,
			title: null
		},
		customerSubList: [],
		merchantSubList: [],
		searchLimit: 5,
		type: 'all',
		period: null,
		literalPeriod: 'day',
		dayPeriod: null,
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
		stats: {
			completedOrders: {
				count: 0,
				robuxAmount: 0,
				creditsSpentAmount: 0,
				averageRate: 0
			},
			pendingOrders: {
				count: 0,
				robuxAmount: 0
			},
			availableRobuxAmount: 0
		},
		merchants: {
			data: [],
			meta: {
				limit: 4,
				page: 1,
				totalItems: 0,
				totalPages: 1
			}
		},
		graphObj: null,
		adminTimer: null,
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
		}
	}),
	getters: {
		formattedSortOrder(state) {
			return state.availableRobux.list.sortOrder ? 'asc' : 'desc'
		}
	},
	actions: {
		async getDashboardStatsInitial() {
			try {
				const res = await getAdminDashboardStatsApi(this.merchant.value, this.customer.value, this.type, this.literalPeriod, this.period)
				this.stats = res
			} catch(err) {
				handleServerError(err)
			}	
		},
		async getDashboardStats() {
			try {
				const res = await getAdminDashboardStatsApi(this.merchant.value, this.customer.value, this.type, this.literalPeriod, this.period)
				this.stats = res
			} catch(err) {
				console.error(err)
			}	
		},
		async getGraphInitial() {
			try {
				const res = await getAdminDashboardGraphApi(this.merchant.value, this.customer.value, this.type, this.literalPeriod, this.period)
				this.graphObj = res
			} catch(err) {
				handleServerError(err)
			}
		},
		async getGraph() {
			try {
				const res = await getAdminDashboardGraphApi(this.merchant.value, this.customer.value, this.type, this.literalPeriod, this.period)
				this.graphObj = res
			} catch(err) {
				console.error(err)
			}
		},
		async getMerchantsInitial(page = this.merchants.meta.page) {
			try {
				const res = await getAdminDashboardAllMerchantsApi(this.merchants.meta.limit, page, this.literalPeriod, this.period)
				this.merchants = res
			} catch(err) {
				handleServerError(err)
			}
		},
		async getMerchants(page = this.merchants.meta.page) {
			try {
				const res = await getAdminDashboardAllMerchantsApi(this.merchants.meta.limit, page, this.literalPeriod, this.period)
				this.merchants = res
			} catch(err) {
				console.error(err)
			}
		},
		getAllStatsTimer() {
			const that = this

			this.$reset()
			this.getAllStats()
			
			this.adminTimer = setTimeout(function timerTick() {
				if(that.$router.currentRoute.value.name === 'dashboard') {
					(that.customer.value || that.merchant.value) ? that.getOnlyStats() : that.getStats()
					that.adminTimer = setTimeout(timerTick, SETTINGS.DATA_UPDATE_INTERVAL)
				} else {
					clearTimeout(that.adminTimer)
				}
			}, SETTINGS.DATA_UPDATE_INTERVAL)
		},
		async getAllStats() {
			await Promise.all([
				this.getDashboardStatsInitial(),
				this.getMerchantsInitial(),
				this.getGraphInitial()
			])
		},
		async getStats() {
			await Promise.all([
				this.getDashboardStats(),
				this.getMerchants(),
				this.getGraph()
			])
		},
		async getOnlyStats() {
			await Promise.all([
				this.getDashboardStats(),
				this.getGraph()
			])
		},
		async getOnlyStatsInitial() {
			await Promise.all([
				this.getDashboardStatsInitial(),
				this.getGraphInitial()
			])
		},
		resetCustomerSubList() {
			this.customerSubList = []
		},
		resetMerchantSubList() {
			this.merchantSubList = []
		},
		async getCustomerSubList(val) {
			if(val.length > 0) {
				try {
					const res = await getUsersByLoginApi(val, this.searchLimit)

					this.resetCustomerSubList()
					
					res.forEach((item) => {
						let el = {}
						el.title = item.login
						el.value = item.id

						this.customerSubList.push(el)
					})
					
				} catch(err) {
					handleServerError(err)
				}
			}
		},
		async getMerchantSubList(val) {
			if(val.length > 0) {
				try {
					const res = await getUsersByLoginApi(val, this.searchLimit)
					
					this.resetMerchantSubList()

					res.forEach((item) => {
						let el = {}
						el.title = item.login
						el.value = item.id

						this.merchantSubList.push(el)
					})
				} catch(err) {
					handleServerError(err)
				}
			}
		},
		getAllUsers() {
			this.removeCustomerFromSelect()
			this.removeMerchantFromSelect()

			this.getAllStats()
		},
		addCustomerToSelect(title, value) {
			this.removeMerchantFromSelect()
			this.customer.value = value
			this.customer.title = title

			this.getOnlyStatsInitial()
		},
		addMerchantToSelect(title, value) {
			this.removeCustomerFromSelect()
			this.merchant.value = value
			this.merchant.title = title

			this.getOnlyStatsInitial()
		},
		removeCustomerFromSelect() {
			this.customer.value = null
			this.customer.title = null
		},
		removeMerchantFromSelect() {
			this.merchant.value = null
			this.merchant.title = null
		},
		changeTypeSelect(val) {
			this.type = val

			this.getAllStats()
		},
		changePeriodSelect(val) {
			this.literalPeriod = val
			val === 'day' ?	this.period = this.dayPeriod : this.period = null
			
			this.getAllStats()
		},
		changePeriod(val) {
			this.dayPeriod = val
			this.period = val
			
			this.getAllStats()
		},
		prevMerchants() {
			let page = this.merchants.meta.page - 1
			
			this.getMerchantsInitial(page)
		},
		nextMerchants() {
			let page = this.merchants.meta.page + 1

			this.getMerchantsInitial(page)
		},
		toggleShowPendingOrders(bool) {
			this.pendingOrders.isShow = bool
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
		async showPendingOrders() {
			await this.getPendingOrders()
			this.toggleShowPendingOrders(true)
		},
		onPageChangePendingOrders(page) {
			this.pendingOrders.list.meta.page = page
			this.getPendingOrders()
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
		onPageChangeAvailableRobux(page) {
			this.availableRobux.list.meta.page = page
			this.getAvailableRobux()
		}
	}
})