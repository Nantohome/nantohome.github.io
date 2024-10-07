<template>
	<div
		v-touch:swipe.left="closeNavbar"
		:class="{ 'js-show': navbarStore.isNavbarOpen }"
		class="ml-left"
	>
		<aside class="navbar">
			<div class="navbar-top">
				<div
					v-if="!isMobile"
					class="navbar-logo"
				>
					<div class="navbar-logo__icon nb-logo"></div>
					<div class="navbar-logo__text nb-logotext"></div>
				</div>
				<CustomerNavbar
					v-if="navbarStore.user && navbarStore.role === 'customer'"
				></CustomerNavbar>
				<VendorNavbar
					v-if="navbarStore.user && navbarStore.role === 'vendor'"
				></VendorNavbar>
				<AdminNavbar
					v-if="navbarStore.user && navbarStore.role === 'admin'"
				></AdminNavbar>
			</div>
			<div
				v-if="navbarStore.user"
				class="navbar-bottom"
			>
				<div class="navbar-user">
					<div
						@click="cpanelStore.toggleShow(true), navbarStore.toggleNavbar(false)"
						class="navbar-user-avatar"
					>
						<img
							:src="navbarStore.user.avatarURL"
							@error="navbarStore.setDefaultAvatar()"
							class="navbar-user-avatar__img"
							alt=""
						>
						<div class="navbar-user-avatar-settings">
							<IconSettings class="navbar-user-avatar__svg"></IconSettings>
						</div>
						<span
							v-if="notifyStore.unreadMsg > 0"
							class="navbar-user-avatar__notice"
						>{{ notifyStore.unreadMsg }}</span>
					</div>
					<div class="navbar-user-expand">
						<a :href="$router.resolve({ name: 'profile' }).href" class="navbar-user__link">{{ navbarStore.user.login }}</a>
						<div
							v-if="navbarStore.role === 'customer'"
							class="navbar-user-balance"
						>
							<span class="navbar-user-balance__val">{{ navbarStore.user.customer.balance }} $</span>
							<span
								@click="topupStore.toggleShow(true)"
								class="navbar-user-balance__add icon-plus"
							></span>
						</div>
						<div
							v-else-if="navbarStore.role === 'vendor'"
							class="navbar-user-balance"
						>
							<span class="navbar-user-balance__val">{{ navbarStore.user.vendor.balance }} $</span>
						</div>
					</div>
				</div>
				<div class="navbar-logout">
					<div
						@click="logoutConfirm = true"
						class="navbar-link navbar-link_logout"
					>
						<div class="navbar-link__icon nb-logout"></div>
						<div class="navbar-link__text">Logout</div>
					</div>
					<transition name="scalex" appear>
						<ConfirmBlock
							v-if="logoutConfirm"
							@confirm-no="logoutConfirm = false"
							@confirm-yes="navbarStore.reset()"
						></ConfirmBlock>
					</transition>
				</div>
			</div>
		</aside>
	</div>
</template>

<script>
import { ref } from 'vue'
import { mobileMatchMedia } from '@/utils/helpers'
import { useNavbarStore, useCpanelStore, useNotifyStore, useTopupStore } from '@/stores'

import CustomerNavbar from '@/components/navbar/CustomerNavbar.vue'
import VendorNavbar from '@/components/navbar/VendorNavbar.vue'
import AdminNavbar from '@/components/navbar/AdminNavbar.vue'
import ConfirmBlock from '@/components/ui/ConfirmBlock.vue'
import IconSettings from '@/components/svg/IconSettings.vue'

export default {
	name: 'NavBar',
	components: {
		CustomerNavbar,
		VendorNavbar,
		AdminNavbar,
		ConfirmBlock,
		IconSettings
	},
	setup() {
		const navbarStore = useNavbarStore()
		const cpanelStore = useCpanelStore()
		const notifyStore = useNotifyStore()
		const topupStore = useTopupStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch
		
		const logoutConfirm = ref(false)


		const closeNavbar = () => {
			navbarStore.toggleNavbar(false)
		}


		navbarStore.getUserTimer()


		return {
			isMobile,
			
			navbarStore,
			cpanelStore,
			notifyStore,
			topupStore,
			
			logoutConfirm,
			closeNavbar
		}
	}
}
</script>