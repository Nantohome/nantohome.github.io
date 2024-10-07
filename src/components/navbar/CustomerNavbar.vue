<template>
	<nav
		:class="{ 'js-hide-router-active': topupStore.isTopupShow }"
		class="navbar-panel"
	>
		<router-link
			:to="{ name: 'dashboard' }"
			class="navbar-link"
		>
			<div class="navbar-link__icon nb-dashboard"></div>
			<div class="navbar-link__text">Dashboard</div>
		</router-link>
		<router-link
			:to="{ name: 'merchants' }"
			class="navbar-link"
		>
			<div class="navbar-link__icon nb-merchants"></div>
			<div class="navbar-link__text">Merchants</div>
		</router-link>
		<router-link
			:to="{ name: 'market' }"
			class="navbar-link"
		>
			<div class="navbar-link__icon nb-market"></div>
			<div class="navbar-link__text">Market</div>
		</router-link>
		<div
			@click="topupStore.toggleShow(true), navbarStore.toggleNavbar(false)"
			:class="{ 'js-active': topupStore.isTopupShow }"
			class="navbar-link"
		>
			<div class="navbar-link__icon nb-topup"></div>
			<div class="navbar-link__text">Top up</div>
		</div>
		<router-link
			:to="{ name: 'profile' }"
			class="navbar-link"
		>
			<div class="navbar-link__icon nb-profile"></div>
			<div class="navbar-link__text">Profile</div>
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
import { useNavbarStore, useTopupStore } from '@/stores'
import { LINKS } from '@/enums'

export default {
	name: 'CustomerNavbar',
	setup() {
		const navbarStore = useNavbarStore()
		const topupStore = useTopupStore()
		
		return {
			navbarStore,
			topupStore,
			LINKS
		}
	}
}
</script>