<template>
	<div class="cpanel">
		<div
			v-if="isMobile"
			class="cpanel-back"
		>
			<span
				@click="cpanelStore.toggleShow(false)"
				class="tl__back icon-back"
			>Go Back</span>
		</div>
		<AccountSwitcher
			v-if="navbarStore.user?.roles.length > 1"
		></AccountSwitcher>
		<BtnLoader
			v-show="!navbarStore.user?.roles.includes('customer')"
			@click="cpanelStore.toggleShowModalCreateCustomer(true)"
			:btnId="'cpanelCreateCustomerBtn'"
			class="cpanel__create-btn ml-btn"
		>
			<span>Get buyer access</span>
		</BtnLoader>
		<BtnLoader
			v-show="!navbarStore.user?.roles.includes('vendor')"
			@click="cpanelStore.toggleShowModalCreateVendor(true)"
			:btnId="'cpanelCreateVendorBtn'"
			class="cpanel__create-btn ml-btn"
		>
			<span>Get supplier access</span>
		</BtnLoader>
		<BtnLoader
			@click="cpanelStore.toggleShowModalDelete(true)"
			:btnId="'cpanelDeleteBtn'"
			class="cpanel__del-btn ml-btn"
		>
			<span>Delete account</span>
		</BtnLoader>
		<button
			v-if="navbarStore.defaultAvatar"
			@click="cpanelStore.linkingDiscord()"
			class="cpanel__ava-btn ml-btn"
		>Update avatar</button>
		<transition name="fade" appear>
			<div
				v-if="cpanelStore.isModalCreateCustomerShow"
				@click.self="cpanelStore.toggleShowModalCreateCustomer(false)"
				class="ml-bg"
			>
				<CreateCustomerModal
					@close-modal="cpanelStore.toggleShowModalCreateCustomer(false)"
				>
				</CreateCustomerModal>
			</div>
		</transition>
		<transition name="fade" appear>
			<div
				v-if="cpanelStore.isModalCreateVendorShow"
				@click.self="cpanelStore.toggleShowModalCreateVendor(false)"
				class="ml-bg"
			>
				<CreateVendorModal
					@close-modal="cpanelStore.toggleShowModalCreateVendor(false)"
				>
				</CreateVendorModal>
			</div>
		</transition>
		<transition name="fade" appear>
			<div
				v-if="cpanelStore.isModalDeleteShow"
				@click.self="cpanelStore.toggleShowModalDelete(false)"
				class="ml-bg"
			>
				<DeleteAccountModal
					@close-modal="cpanelStore.toggleShowModalDelete(false)"
				>
				</DeleteAccountModal>
			</div>
		</transition>
	</div>
</template>

<script>
import { mobileMatchMedia } from '@/utils/helpers'
import { useCpanelStore, useNavbarStore } from '@/stores'

import AccountSwitcher from '@/components/ui/AccountSwitcher.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'
import CreateCustomerModal from '@/components/navbar/CreateCustomerModal.vue'
import CreateVendorModal from '@/components/navbar/CreateVendorModal.vue'
import DeleteAccountModal from '@/components/navbar/DeleteAccountModal.vue'

export default {
	name: 'ControlPanel',
	components: {
		AccountSwitcher,
		BtnLoader,
		CreateCustomerModal,
		CreateVendorModal,
		DeleteAccountModal
	},
	setup() {
		const cpanelStore = useCpanelStore()
		const navbarStore = useNavbarStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		return {
			cpanelStore,
			navbarStore,
			isMobile
		}
	}
}
</script>