// stores/proxies.store.js
import { defineStore } from 'pinia'
import { handleServerError } from '@/utils/helpers'
import { useLoaderStore, useApiMsgStore } from '@/stores'
import {
	getVendorProxiesApi,
	searchVendorProxiesApi,
	addVendorProxyApi,
	addVendorProxiesApi,
	updateVendorProxiesStatusApi,
	deleteVendorProxiesApi
} from '@/api'


export const useProxiesStore = defineStore({
	id: 'proxies',
	state: () => ({
		list: {
			data: null,
			meta: {
				limit: 10,
				page: 1,
				totalItems: 0,
				totalPages: 1
			},
			sortBy: 'host',
			sortOrder: false,
			selected: [],
			current: null,
			animated: false,
			checkAll: false
		},
		isDeleteConfirmShow: false,
		isAddProxyShow: false,
		isAddProxiesShow: false
	}),
	getters: {
		formattedSortOrder(state) {
			return state.list.sortOrder ? 'asc' : 'desc'
		}
	},
	actions: {
		toggleShowAddProxy(bool) {
			this.isAddProxyShow = bool
		},
		toggleShowAddProxies(bool) {
			this.isAddProxiesShow = bool
		},
		async addProxy(obj) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()
			
			loaderStore.setLoader(true, 'addProxyBtn')

			try {
				await addVendorProxyApi(obj.host, Number(obj.port), obj.name, obj.pass)
				
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Proxy was added', true)
				this.getData()
				this.toggleShowAddProxy(false)
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async addProxies(proxies) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()

			loaderStore.setLoader(true, 'addProxiesBtn')
			
			try {
				await addVendorProxiesApi(proxies.split('\n'))

				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Proxies were added', true)
				this.getData()
				this.toggleShowAddProxies(false)
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async getData() {
			if(this.list.data !== null) {
				this.list.animated = true
			}			
			
			try {
				const res = await getVendorProxiesApi(this.list.meta.limit, this.list.meta.page, this.list.sortBy, this.formattedSortOrder)

				this.list.data = res.data
				this.list.meta = res.meta
				this.checkAllSelected()
				this.list.animated = false
			} catch(err) {
				handleServerError(err)
			}

			this.list.animated = false
		},
		async searchHosts(str) {
			const apiMsgStore = useApiMsgStore()

			if(str.length > 0) {
				try {
					this.list.animated = true
					const res = await searchVendorProxiesApi(str)
					
					if(res.length > 0) {
						this.listReset()
						this.list.data = res
					} else {
						apiMsgStore.showMsg('warning', 'Nothing found', `No matches found for <i>${str}</i>`, true)
						this.getData()
					}
					this.list.animated = false
				} catch(err) {
					handleServerError(err)
					this.getData()
				}
			} else {
				this.getData()
			}
		},
		onPageChange(page) {
			this.list.meta.page = page
			this.getData()
		},
		deleteSelected(id = this.list.selected) {
			this.list.current = id
			this.isDeleteConfirmShow = true
		},
		cancelDelete() {
			this.isDeleteConfirmShow = false
		},
		async confirmDelete() {
			const apiMsgStore = useApiMsgStore()

			try {
				await deleteVendorProxiesApi(this.list.current, this.list.checkAll)
				apiMsgStore.showMsg('success', 'Success', 'Proxies deleted', true)
				this.getData()
			} catch(err) {
				handleServerError(err)
			}

			this.isDeleteConfirmShow = false
		},
		async updateSelected(proxies = this.list.selected) {
			const apiMsgStore = useApiMsgStore()
			const loaderStore = useLoaderStore()

			loaderStore.setLoader(true, 'updateSelectedBtn')

			try {
				await updateVendorProxiesStatusApi(proxies, this.list.checkAll)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Status updated', true)
				this.getData()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
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
		listReset() {
			this.list.checkAll = false
			this.list.meta.page = 1
			this.list.meta.totalPages = 1
			this.list.selected = []
			this.list.sortBy = 'host'
			this.list.sortOrder = false
		}
	}
})