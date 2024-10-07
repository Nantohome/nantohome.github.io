// stores/profile.store.js
import { defineStore } from 'pinia'
import {
	getUserPaymentsTotalDepositApi,
	getCustomerOrdersApi,
	searchCustomerOrdersApi,
	getUserPaymentsApi,
	searchUserPaymentsApi,
	cancelCustomerOrdersApi
} from '@/api'
import { handleServerError } from '@/utils/helpers'
import { useApiMsgStore } from '@/stores'

export const useProfileStore = defineStore({
	id: 'profile',
	state: () => ({
		orders: {
			data: [],
			meta: {
				limit: 10,
				page: 1,
				totalItems: 0,
				totalPages: 1
			},
			sortBy: 'updatedAt',
			sortOrder: false,
			current: null,
			animated: false
		},
		payments: {
			data: [],
			meta: {
				limit: 10,
				page: 1,
				totalItems: 0,
				totalPages: 1
			},
			sortBy: 'date',
			sortOrder: false,
			current: null,
			animated: false
		},
		totalDeposit: '$0.00',
		isOrderHistoryShow: true,
		isCancelConfirmShow: false,
		cancellingOrder: ''
	}),
	getters: {
		formattedSortOrderOrders(state) {
			return state.orders.sortOrder ? 'asc' : 'desc'
		},
		formattedSortOrderPayments(state) {
			return state.payments.sortOrder ? 'asc' : 'desc'
		}
	},
	actions: {
		toggleOrderHistoryShow(bool) {
			this.isOrderHistoryShow = bool
		},
		cancelOrder(id) {
			this.cancellingOrder = id
			this.isCancelConfirmShow = true
		},
		revocationCancel() {
			this.isCancelConfirmShow = false
			this.cancellingOrder = ''
		},
		async confirmCancel() {
			try {
				await cancelCustomerOrdersApi(this.cancellingOrder)
				this.getUserOrders()
			} catch(err) {
				handleServerError(err)
			}
			
			this.isCancelConfirmShow = false
			this.cancellingOrder = ''
		},
		showOrderError(index) {
			const apiMsgStore = useApiMsgStore()

			apiMsgStore.showMsg('error', this.orders.data[index].errorReason.replace(/_/g, ' '), this.orders.data[index].errorMessage, false)
		},
		showTopupError(index) {
			const apiMsgStore = useApiMsgStore()
			apiMsgStore.showMsg('error', 'Order Error', this.payments.data[index].errorText, false)
		},
		getData() {
			this.getTotalDeposit()
		},
		async getTotalDeposit() {
			try {
				const res = await getUserPaymentsTotalDepositApi()

				this.totalDeposit = '$' + res.amount.toFixed(2)
			} catch(err) {
				handleServerError(err)
			}
		},
		async getUserOrders() {
			this.orders.animated = true

			try {
				const res = await getCustomerOrdersApi(this.orders.meta.limit, this.orders.meta.page, this.orders.sortBy, this.formattedSortOrderOrders)

				this.orders.data = res.data
				this.orders.meta = res.meta
				this.orders.animated = false
			} catch(err) {
				handleServerError(err)
			}
		},
		async searchUserOrders(str) {
			const apiMsgStore = useApiMsgStore()

			try {
				this.orders.animated = true
				const res = await searchCustomerOrdersApi(this.orders.meta.limit, this.orders.meta.page, this.orders.sortBy, this.formattedSortOrderOrders, str)
				
				if(res.data.length > 0) {
					this.ordersListReset()
					this.orders.data = res.data
					this.orders.meta = res.meta
				} else {
					apiMsgStore.showMsg('warning', 'Nothing found', `No matches found for <i>${str}</i>`, true)
					this.getUserOrders()
				}
				this.orders.animated = false
			} catch(err) {
				handleServerError(err)
				this.getUserOrders()
			}
		},
		async getUserPayments() {
			this.payments.animated = true

			try {
				const res = await getUserPaymentsApi(this.payments.meta.limit, this.payments.meta.page, this.payments.sortBy, this.formattedSortOrderPayments)

				this.payments.data = res.data
				this.payments.meta = res.meta
				this.payments.animated = false
			} catch(err) {
				handleServerError(err)
			}
		},
		async searchUserPayments(str) {
			const apiMsgStore = useApiMsgStore()

			try {
				this.payments.animated = true
				const res = await searchUserPaymentsApi(this.payments.meta.limit, this.payments.meta.page, this.payments.sortBy, this.formattedSortOrderPayments, str)
				
				if(res.data.length > 0) {
					this.paymentsListReset()
					this.payments.data = res.data
					this.payments.meta = res.meta
				} else {
					apiMsgStore.showMsg('warning', 'Nothing found', `No matches found for <i>${str}</i>`, true)
					this.getUserPayments()
				}
				this.payments.animated = false
			} catch(err) {
				handleServerError(err)
				this.getUserPayments()
			}
		},
		ordersOnPageChange(page) {
			this.orders.meta.page = page
			this.getUserOrders()
		},
		ordersListReset() {
			this.orders.sortBy = 'updatedAt'
			this.orders.sortOrder = false
		},
		paymentsOnPageChange(page) {
			this.payments.meta.page = page
			this.getUserPayments()
		},
		paymentsListReset() {
			this.payments.sortBy = 'date'
			this.payments.sortOrder = false
		}
	}
})