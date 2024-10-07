// stores/vendorsRequest.store.js
import { defineStore } from 'pinia'
import { useLoaderStore, useApiMsgStore } from '@/stores'
import { handleServerError } from '@/utils/helpers'
import {
	getAdminVendorsRequestApi,
	setAdminVendorsVerifyApi
} from '@/api'

export const useVendorsRequestStore = defineStore({
	id: 'vendorsRequest',
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
		isMethodModalShow: false
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
				const res = await getAdminVendorsRequestApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder)

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
				const res = await getAdminVendorsRequestApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder, str)
				
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
		toggleShowMethodModal(bool) {
			this.isMethodModalShow = bool
		},
		async copyEmail(email) {
			const apiMsgStore = useApiMsgStore()

			await navigator.clipboard.writeText(email)
			apiMsgStore.showMsg('success', 'Success', 'Copy to clipboard', true)
		},
		async verifySelected(users = this.list.selected) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'vendorsRequestVerifyBtn')

			try {
				await setAdminVendorsVerifyApi(users, true)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Accounts verified', true)
				this.getData()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async refuseSelected(users = this.list.selected) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'vendorsRequestRefuseBtn')

			try {
				await setAdminVendorsVerifyApi(users, false)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Accounts refused', true)
				this.getData()
			} catch(err) {
				await loaderStore.setLoader(false)
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