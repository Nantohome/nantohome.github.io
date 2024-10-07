// stores/blacklistManagment.store.js
import { defineStore } from 'pinia'
import { useApiMsgStore } from '@/stores'
import { handleServerError } from '@/utils/helpers'
import {
	getAdminBlacklistManagmentApi,
	addBlacklistVendorApi,
	removeBlacklistVendorApi
} from '@/api'

export const useBlacklistManagmentStore = defineStore({
	id: 'blacklistManagment',
	state: () => ({
		list: {
			data: null,
			meta: {
				limit: 10,
				page: 1,
				totalItems: 0,
				totalPages: 1
			},
			sortBy: 'value',
			sortOrder: true,
			animated: false,
			current: null
		},
		isModalBlockShow: false,
		typeSelect: {
			label: 'Detection type',
			list: [
				{
					title: 'IP',
					value: 'ip'
				},
				{
					title: 'Discord',
					value: 'discord'
				},
				{
					title: 'Wallet',
					value: 'wallet'
				}
			]
		},
		blockType: 'ip',
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
				const res = await getAdminBlacklistManagmentApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder)
				this.list.data = res.data
				this.list.meta = res.meta
				this.list.animated = false
			} catch(err) {
				handleServerError(err)
			}
		},
		async searchContent(str) {
			const apiMsgStore = useApiMsgStore()

			try {
				this.list.animated = true
				const res = await getAdminBlacklistManagmentApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder, str)
				
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
		async blockVendor(value, freezeReason) {
			try {
				await addBlacklistVendorApi(this.blockType, value, freezeReason)
				this.isModalBlockShow = false
			} catch(err) {
				this.isModalBlockShow = false
				handleServerError(err)
			}
		},
		onPageChange(page) {
			this.list.meta.page = page
			this.getData()
		},
		deleteItem(id) {
			this.list.current = id
			this.isDeleteConfirmShow = true
		},
		cancelDelete() {
			this.isDeleteConfirmShow = false
		},
		async confirmDelete() {
			const apiMsgStore = useApiMsgStore()

			try {
				await removeBlacklistVendorApi(this.list.current)
				apiMsgStore.showMsg('success', 'Success', 'Blocked item removed', true)
				this.getData()
			} catch(err) {
				handleServerError(err)
			}

			this.isDeleteConfirmShow = false
		},
		resetModalBlock() {
			this.typeSelect.list = [
				{
					title: 'IP',
					value: 'ip'
				},
				{
					title: 'Discord',
					value: 'discord'
				},
				{
					title: 'Wallet',
					value: 'wallet'
				}
			],
			this.blockType = 'ip'
		},
		listReset() {
			this.list.meta.page = 1
			this.list.meta.totalPages = 1
			this.list.sortBy = 'value'
			this.list.sortOrder = true
		}
	}
})