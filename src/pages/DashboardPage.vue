<template>
	<div>
		<CustomerDashboard
			v-if="navbarStore.user && navbarStore.role === 'customer'"
		></CustomerDashboard>
		<VendorDashboard
			v-if="navbarStore.user && navbarStore.role === 'vendor'"
		></VendorDashboard>
		<AdminDashboard
			v-if="navbarStore.user && navbarStore.role === 'admin'"
		></AdminDashboard>
	</div>
</template>

<script>
import { useHead } from '@unhead/vue'
import { useNavbarStore } from '@/stores'
import CustomerDashboard from '@/components/dashboard/CustomerDashboard.vue'
import VendorDashboard from '@/components/dashboard/VendorDashboard.vue'
import AdminDashboard from '@/components/dashboard/AdminDashboard.vue'

export default {
	name: 'DashboardPage',
	components: {
		CustomerDashboard,
		VendorDashboard,
		AdminDashboard
	},
	setup() {
		useHead({
			title: 'RBXCRATE | Dashboard',
			meta: [
				{
					name: 'description',
					content: 'Website description',
				}
			]
		})
		const navbarStore = useNavbarStore()
		
		return {
			navbarStore
		}
	}
}
</script>