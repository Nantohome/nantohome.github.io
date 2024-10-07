<template>
	<div
		v-if="usersStore.users"
		class="users-grid"
	>
		<div class="users-block users-block_customers ml-block">
			<div class="ml-block__title">Customers</div>
			<div class="ml-box">
				<div class="ml-box-header">
					<div class="ml-box-header__title settings-user-icon">Total customers amount</div>
				</div>
				<div class="ml-box-body">
					<span class="ml-box-body__text">{{ usersStore.users.customers.total }}</span>
					<span class="ml-box-body__icon icon-ml-users"></span>
				</div>
			</div>
			<div class="ml-box">
				<div class="ml-box-header">
					<div class="ml-box-header__title">Customers Balance</div>
				</div>
				<div class="ml-box-body">
					<span class="ml-box-body__text">${{ usersStore.users.customers.balance }}</span>
					<span class="ml-box-body__icon icon-ml-card"></span>
				</div>
			</div>
			<button
				@click="usersStore.pageVisibility = 'CustomersManagment'"
				class="users-btn ml-btn"
			>
				<span>Manage</span>
			</button>
		</div>
		<div class="users-block users-block_vendors ml-block">
			<div class="ml-block__title">Suppliers</div>
			<div class="ml-box">
				<div class="ml-box-header">
					<div class="ml-box-header__title settings-user-icon">Total Suppliers</div>
				</div>
				<div class="ml-box-body">
					<span class="ml-box-body__text">{{ usersStore.users.vendors.total }}</span>
					<span class="ml-box-body__icon icon-ml-users"></span>
				</div>
			</div>
			<div class="ml-box">
				<div class="ml-box-header">
					<div class="ml-box-header__title">Suppliers Balance</div>
				</div>
				<div class="ml-box-body">
					<span class="ml-box-body__text">${{ usersStore.users.vendors.balance }}</span>
					<span class="ml-box-body__icon icon-ml-card"></span>
				</div>
			</div>
			<button
				@click="usersStore.pageVisibility = 'VendorsManagment'"
				class="users-btn ml-btn"
			>
				<span>Manage</span>
			</button>
		</div>
		<div class="users-block users-block_merchants ml-block">
			<div class="ml-block__title">Merchants</div>
			<div class="ml-box">
				<div class="ml-box-header">
					<div class="ml-box-header__title settings-user-icon">Total merchants</div>
				</div>
				<div class="ml-box-body">
					<span class="ml-box-body__text">{{ usersStore.users.merchants.total }}</span>
					<span class="ml-box-body__icon icon-ml-users"></span>
				</div>
			</div>
			<button
				@click="usersStore.pageVisibility = 'UsersMerchants'"
				class="users-btn ml-btn"
			>
				<span>Manage</span>
			</button>
		</div>
		<div class="users-block users-block_blacklisted ml-block">
			<div class="ml-block__title">Blacklisted</div>
			<div class="ml-box">
				<div class="ml-box-header">
					<div class="ml-box-header__title">Total users</div>
				</div>
				<div class="ml-box-body">
					<span class="ml-box-body__text">{{ usersStore.users.vendors.blockedDataCount }}</span>
					<span class="ml-box-body__icon icon-ml-cancel"></span>
				</div>
			</div>
			<button
				@click="usersStore.pageVisibility = 'UsersBlacklisted'"
				class="users-btn ml-btn"
			>
				<span>Manage</span>
			</button>
		</div>
	</div>
</template>

<script>
import { useUsersStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

export default {
	name: 'UsersStart',
	setup() {
		const usersStore = useUsersStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch


		usersStore.getUsers()
		
		return {
			usersStore,
			isMobile
		}
	}
}
</script>