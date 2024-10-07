// stores/merchantsManagment.store.js
import { defineStore } from 'pinia'
import { useLoaderStore, useApiMsgStore } from '@/stores'
import { handleServerError } from '@/utils/helpers'
import {
	getAdminMerchantsManagmentApi,
	deleteAdminMerchantsManagmentApi,
	updateAdminMerchantsManagmentApi
} from '@/api'

export const useMerchantsManagmentStore = defineStore({
	id: 'merchantsManagment',
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
		isDeleteConfirmShow: false
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
				const res = await getAdminMerchantsManagmentApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder)
/* {
	"id":"clvy3mmfi0003px44e5s6qyed",
	"projectName":"Lox",
	"projectUrl":"https://bloxport.shit",
	"minRate":2.4,
	"maxRate":4.5,
	"login":"benzo",
	"buyedRobuxAmount":100,
	"spentCreditsAmount":0.35
} */
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
				const res = await getAdminMerchantsManagmentApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder, str)
				
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
		async freezeUser(merchantIds, login) {
			const apiMsgStore = useApiMsgStore()
			try {
				await updateAdminMerchantsManagmentApi(merchantIds, true)
				apiMsgStore.showMsg('success', 'Success', `${login} account frozen`, true)
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

			loaderStore.setLoader(true, 'merchantsManagmentDeleteBtn')

			try {
				await deleteAdminMerchantsManagmentApi(this.list.current)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Accounts deleted', true)
				this.getData()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}

			this.isDeleteConfirmShow = false
		},
		async copyUrl(projectUrl) {
			const apiMsgStore = useApiMsgStore()

			await navigator.clipboard.writeText(projectUrl)
			apiMsgStore.showMsg('success', 'Success', 'Copy to clipboard', true)
		},
		async changeRate(merchantIds, minRate, maxRate) {
			const apiMsgStore = useApiMsgStore()
			try {
				await updateAdminMerchantsManagmentApi(merchantIds, false, minRate, maxRate)
				apiMsgStore.showMsg('success', 'Success', 'Rates changed', true)
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