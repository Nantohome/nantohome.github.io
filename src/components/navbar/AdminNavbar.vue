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
			:to="{ name: 'users' }"
			class="navbar-link"
		>
			<div class="navbar-link__icon nb-users"></div>
			<div class="navbar-link__text">Users</div>
		</router-link>
		<router-link
			:to="{ name: 'settings' }"
			class="navbar-link"
		>
			<div class="navbar-link__icon nb-settings"></div>
			<div class="navbar-link__text">Settings</div>
		</router-link>
		<router-link
			:to="{ name: 'finances' }"
			class="navbar-link"
		>
			<div class="navbar-link__icon nb-finances"></div>
			<div class="navbar-link__text">Finances</div>
		</router-link>
	</nav>
</template>

<script>
import { useNavbarStore } from '@/stores'

export default {
	name: 'AdminNavbar',
	setup() {
		const navbarStore = useNavbarStore()
		
		return {
			navbarStore
		}
	}
}
</script>