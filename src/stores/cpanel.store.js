// stores/cpanel.store.js
import { defineStore } from 'pinia'
import { useLoaderStore, useNavbarStore, useApiMsgStore } from '@/stores'
import { handleServerError } from '@/utils/helpers'
import {
	createCustomerAccessApi,
	createVendorAccessApi,
	deleteAccountApi
} from '@/api'
import { SETTINGS } from '@/enums'

export const useCpanelStore = defineStore({
	id: 'cpanel',
	state: () => ({
		isShow: false,
		isModalCreateCustomerShow: false,
		isModalCreateVendorShow: false,
		isModalDeleteShow: false,
		confirmMessage: SETTINGS.CONFIRM_DELETE_MSG
	}),
	actions: {
		toggleShow(bool) {
			this.isShow = bool
		},
		toggleShowModalDelete(bool) {
			this.isModalDeleteShow = bool
		},
		toggleShowModalCreateCustomer(bool) {
			this.isModalCreateCustomerShow = bool
		},
		toggleShowModalCreateVendor(bool) {
			this.isModalCreateVendorShow = bool
		},
		async getCustomerAccess(location, sum) {
			const loaderStore = useLoaderStore()
			const navbarStore = useNavbarStore()
			const apiMsgStore = useApiMsgStore()

			loaderStore.setLoader(true, 'createCustomerBtn')

			try {
				await createCustomerAccessApi(location, sum)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Buyer access received<br>Please re-login')
				navbarStore.reset()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async getVendorAccess(method, sum) {
			const loaderStore = useLoaderStore()
			const navbarStore = useNavbarStore()
			const apiMsgStore = useApiMsgStore()

			loaderStore.setLoader(true, 'createVendorBtn')

			try {
				await createVendorAccessApi(method, sum)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Supplier access received<br>Please re-login')
				navbarStore.reset()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		async deleteAccount() {
			const loaderStore = useLoaderStore()
			const navbarStore = useNavbarStore()
			const apiMsgStore = useApiMsgStore()

			loaderStore.setLoader(true, 'deleteAccountBtn')

			try {
				await deleteAccountApi(this.confirmMessage)
				await loaderStore.setLoader(false)
				apiMsgStore.showMsg('success', 'Success', 'Account deleted', false)
				navbarStore.reset()
			} catch(err) {
				await loaderStore.setLoader(false)
				handleServerError(err)
			}
		},
		linkingDiscord() {
			window.open(`https://discord.com/oauth2/authorize?client_id=${SETTINGS.DISCORD_APP_ID}&response_type=token&redirect_uri=${encodeURIComponent(window.location.origin + window.location.pathname)}&scope=identify+email`, "_self")
		}
	}
})