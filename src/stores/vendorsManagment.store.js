// stores/vendorsManagment.store.js
import { defineStore } from 'pinia'
import { useLoaderStore, useApiMsgStore } from '@/stores'
import { handleServerError } from '@/utils/helpers'
import {
	getAdminVendorsManagmentApi,
	setAdminUserFreezeApi,
	setAdminUserUnfreezeApi,
	deleteAdminVendorsApi,
	updateAdminVendorsBalanceApi,
	getAdminVendorsAccountsApi,
	deleteAdminVendorsAccountApi
} from '@/api'

export const useVendorsManagmentStore = defineStore({
	id: 'vendorsManagment',
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
		isSettingsShow: null,
		isAccountsModalShow: false,
		accounts: {
			id: null,
			login: '',
			data: null,
			arr: [],
			meta: {
				limit: 6,
				page: 1,
				totalItems: 0,
				totalPages: 1
			},
			sortBy: 'username',
			sortOrder: true
		}
	}),
	getters: {
		formattedSortOrder(state) {
			return state.list.sortOrder ? 'asc' : 'desc'
		},
		formattedSortOrderAccounts(state) {
			return state.accounts.sortOrder ? 'asc' : 'desc'
		}
	},
	actions: {
		async getData() {
			if(this.list.data !== null) {
				this.list.animated = true
			}

			try {
				const res = await getAdminVendorsManagmentApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder)

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
				const res = await getAdminVendorsManagmentApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder, str)
				
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
			
			loaderStore.setLoader(true, 'vendorsManagmentFreezeBtn')

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
		async freezeUser(id, login) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'vendorsManagmentFreezeBtn')

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
		async unfreezeSelected() {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'vendorsManagmentUnfreezeBtn')

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
		async unfreezeUser(id, login) {
			const apiMsgStore = useApiMsgStore()

			try {
				await setAdminUserUnfreezeApi(id)
				apiMsgStore.showMsg('success', 'Success', `${login} account unfrozen`, true)
				this.getData()
			} catch(err) {
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
				await this.list.current.forEach((item) => {
					deleteAdminVendorsApi(item)
				})
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Accounts deleted', true)
				this.getData()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}

			this.isDeleteConfirmShow = false
		},
		async changeBalance(id, balance) {
			const apiMsgStore = useApiMsgStore()

			try {
				await updateAdminVendorsBalanceApi([id], balance)
				apiMsgStore.showMsg('success', 'Success', 'Balance updated', true)
				this.getData()
			} catch(err) {
				handleServerError(err)
			}
		},
		toggleShowAccountsModal(bool) {
			this.isAccountsModalShow = bool
		},
		async getInitialAccountsData() {
			try {
				if(this.accounts.id) {
					const res = await getAdminVendorsAccountsApi(this.accounts.id, this.accounts.sortBy, this.formattedSortOrderAccounts)

					this.accounts.meta.totalItems = res.length
					this.accounts.meta.totalPages = Math.ceil(res.length / this.accounts.meta.limit)

					for(let i = 0; i < this.accounts.meta.totalPages; i++) {
						this.accounts.arr[i] = res.slice((i * this.accounts.meta.limit), (i * this.accounts.meta.limit) + this.accounts.meta.limit)
					}
					
					this.accounts.data = this.accounts.arr[0]
					this.accounts.meta.page = 1
				}
				this.toggleShowAccountsModal(true)
			} catch(err) {
				handleServerError(err)
			}
		},
		showAccountsModal(id, login) {
			this.accountsListReset()
			
			this.accounts.id = id
			this.accounts.login = login
			this.getInitialAccountsData()
		},
		onAccountsPageChange(page) {
			this.accounts.meta.page = page
			this.accounts.data = this.accounts.arr[this.accounts.meta.page - 1]
		},
		async deleteAccount(id) {
			const apiMsgStore = useApiMsgStore()

			try {
				await deleteAdminVendorsAccountApi(id)
				apiMsgStore.showMsg('success', 'Success', 'Account deleted', true)
				this.getInitialAccountsData()
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
		},
		accountsListReset() {
			this.accounts.id = null
			this.accounts.login = ''


			this.accounts.data = null
			this.accounts.arr = []
			this.accounts.meta.page = 1
			this.accounts.meta.totalItems = 0
			this.accounts.meta.totalPages = 1
			this.accounts.sortBy = 'username'
			this.accounts.sortOrder = true
		}
	}
})