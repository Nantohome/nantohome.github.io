<template>
	<header class="header">
		<a :href="$router.resolve({ name: 'dashboard' }).href" class="header-logo">
			<IconLogo class="header-logo__icon"></IconLogo>
		</a>
		<div
			class="header-burgerwrap"
			@click="navbarStore.toggleNavbar(!navbarStore.isNavbarOpen)"
		>
			<div
				class="header-burger"
				:class="{ 'js-open': navbarStore.isNavbarOpen }"
			>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<span
				v-if="notifyStore.unreadMsg > 0"
				:class="{ 'js-show': !navbarStore.isNavbarOpen }"
				class="header-burger__notice"
			></span>
		</div>
	</header>
</template>

<script>
import { useNavbarStore, useNotifyStore } from '@/stores'

import IconLogo from '@/components/svg/IconLogo.vue'

export default {
	name: 'HeaderComponent',
	props: {
		navbarState: Boolean,
		unreadMsg: Number
	},
	components: {
		IconLogo
	},
	setup() {
		const navbarStore = useNavbarStore()
		const notifyStore = useNotifyStore()

		return {
			navbarStore,
			notifyStore
		}
	}
}
</script>