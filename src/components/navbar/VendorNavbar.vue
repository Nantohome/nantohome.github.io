<template>
	<nav class="navbar-panel">
		<router-link
			:to="{ name: 'dashboard' }"
			class="navbar-link"
		>
			<div class="navbar-link__icon nb-dashboard"></div>
			<div class="navbar-link__text">Dashboard</div>
		</router-link>
		<router-link
			:to="{ name: 'accounts' }"
			class="navbar-link"
		>
			<div class="navbar-link__icon nb-users"></div>
			<div class="navbar-link__text">Accounts</div>
		</router-link>
		<router-link
			:to="{ name: 'proxies' }"
			class="navbar-link"
		>
			<div class="navbar-link__icon nb-proxies"></div>
			<div class="navbar-link__text">Proxies</div>
		</router-link>
		<router-link
			:to="{ name: 'withdraw' }"
			class="navbar-link"
		>
			<div class="navbar-link__icon nb-withdraw"></div>
			<div class="navbar-link__text">Withdraw</div>
		</router-link>
		<router-link
			:to="{ name: 'affiliate' }"
			class="navbar-link"
		>
			<div class="navbar-link__icon nb-affiliate"></div>
			<div class="navbar-link__text">Affiliate</div>
		</router-link>
		<a
			:href="LINKS.discord"
			class="navbar-link"
		>
			<div class="navbar-link__icon nb-discord"></div>
			<div class="navbar-link__text">Discord</div>
		</a>
	</nav>
</template>

<script>
import { useNavbarStore } from '@/stores'
import { LINKS } from '@/enums'

export default {
	name: 'VendorNavbar',
	setup() {
		const navbarStore = useNavbarStore()
		
		return {
			navbarStore,
			LINKS
		}
	}
}
</script>