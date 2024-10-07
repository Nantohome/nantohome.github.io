// stores/customersManagment.store.js
import { defineStore } from 'pinia'
import { useLoaderStore, useApiMsgStore } from '@/stores'
import { handleServerError } from '@/utils/helpers'
import {
	getAdminCustomersManagmentApi,
	setAdminUserFreezeApi,
	setAdminUserUnfreezeApi,
	deleteAdminCustomersApi,
	updateAdminCustomersApi,
	createAdminCustomerFeeApi,
	deleteAdminCustomerFeeApi,
	updateAdminCustomersBalanceApi
} from '@/api'

export const useCustomersManagmentStore = defineStore({
	id: 'customersManagment',
	state: () => ({
		list: {
			data: null,
			meta: {
				limit: 10,
				page: 1,
				totalItems: 0,
				totalPages: 1
			},
			sortBy: 'login',
			sortOrder: true,
			animated: false,
			selected: [],
			current: null,
			checkAll: false
		},
		isDeleteConfirmShow: false,
		isSettingsShow: null
	}),
	getters: {
		formattedSortOrder(state) {
			return state.list.sortOrder ? 'asc' : 'desc'
		}
	},
	actions: {
		async getData() {
			if(this.list.data !== null) {
				this.list.animated = true
			}

			try {
				const res = await getAdminCustomersManagmentApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder)

				this.list.data = res.data
				this.list.meta = res.meta
				this.list.animated = false
			} catch(err) {
				handleServerError(err)
			}
		},
		async searchKeyword(str) {
			const apiMsgStore = useApiMsgStore()

			try {
				this.list.animated = true
				const res = await getAdminCustomersManagmentApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder, str)
				
				if(res.data.length > 0) {
					this.listReset()
					this.list.data = res.data
					this.list.meta = res.meta
				} else {
					apiMsgStore.showMsg('warning', 'Nothing found', `No matches found for <i>${str}</i>`, true)
					this.getData()
				}
				this.list.animated = false
			} catch(err) {
				handleServerError(err)
				this.getData()
			}
		},
		onPageChange(page) {
			this.list.meta.page = page
			this.getData()
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
		changeItem() {
			if(this.list.selected.length !== this.list.data.length) {
				this.list.checkAll = false
			}
		},
		async freezeSelected() {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'customersManagmentFreezeBtn')

			try {
				this.list.selected.forEach((item) => {
					setAdminUserFreezeApi(item)
				})

				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Accounts frozen', true)
				this.getData()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async unfreezeSelected() {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'customersManagmentUnfreezeBtn')

			try {
				this.list.selected.forEach((item) => {
					setAdminUserUnfreezeApi(item)
				})

				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Accounts unfrozen', true)
				this.getData()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async freezeUser(id, login) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'customersManagmentFreezeBtn')

			try {
				await setAdminUserFreezeApi(id)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', `${login} account frozen`, true)
				this.getData()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async unfreezeUser(id, login) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'customersManagmentUnfreezeBtn')

			try {
				await setAdminUserUnfreezeApi(id)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', `${login} account unfrozen`, true)
				this.getData()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		deleteSelected(users = this.list.selected) {
			this.list.current = users
			this.isDeleteConfirmShow = true
		},
		cancelDelete() {
			this.isDeleteConfirmShow = false
		},
		async confirmDelete() {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()

			loaderStore.setLoader(true, 'customersManagmentDeleteBtn')

			try {
				await deleteAdminCustomersApi(this.list.current)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Accounts deleted', true)
				this.getData()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}

			this.isDeleteConfirmShow = false
		},
		async showSettings(id) {
			if(this.isSettingsShow === id) {
				this.isSettingsShow = null
			} else {
				this.isSettingsShow = id
			}
		},
		async setRole(index) {
			const apiMsgStore = useApiMsgStore()

			try {
				await updateAdminCustomersApi(this.list.data[index].userId, this.list.data[index].isAdmin, this.list.data[index].isOwner)
				apiMsgStore.showMsg('success', 'Success', 'Role changed', true)
			} catch(err) {
				handleServerError(err)
			}
		},
		async toggleFee(index, id) {
			const apiMsgStore = useApiMsgStore()

			if(this.list.data[index].cryptoTopupFeePercent !== null || this.list.data[index].cryptoTopupFeeFixed !== null) {
				try {
					await deleteAdminCustomerFeeApi(id)
					apiMsgStore.showMsg('success', 'Success', 'Personal fee deleted', true)
					this.getData()
				} catch(err) {
					handleServerError(err)
				}
			} else {
				try {
					await createAdminCustomerFeeApi(id, 0, 0)
					apiMsgStore.showMsg('success', 'Success', 'Personal fee created', true)
					this.getData()
				} catch(err) {
					handleServerError(err)
				}
			}
		},
		async changeFee(id, cryptoTopupFeePercent, cryptoTopupFeeFixed) {
			const apiMsgStore = useApiMsgStore()

			try {
				await createAdminCustomerFeeApi(id, cryptoTopupFeePercent, cryptoTopupFeeFixed)
				apiMsgStore.showMsg('success', 'Success', 'Personal fee updated', true)
				this.getData()
			} catch(err) {
				handleServerError(err)
			}
		},
		async changeBalance(id, balance) {
			const apiMsgStore = useApiMsgStore()

			try {
				await updateAdminCustomersBalanceApi([id], balance)
				apiMsgStore.showMsg('success', 'Success', 'Balance updated', true)
				this.getData()
			} catch(err) {
				handleServerError(err)
			}
		},
		listReset() {
			this.list.checkAll = false
			this.list.meta.page = 1
			this.list.meta.totalPages = 1
			this.list.selected = []
			this.list.sortBy = 'login'
			this.list.sortOrder = true
		}
	}
})