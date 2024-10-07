<template>
	<div class="ml-right users">
		<transition name="fade" appear mode="out-in">
			<div class="users-wrap">
				<component
					:is="usersStore.pageVisibility"
				></component>
			</div>
		</transition>
		<FooterMobile></FooterMobile>
	</div>
</template>

<script>
import { useHead } from '@unhead/vue'
import { useUsersStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import FooterMobile from '@/components/FooterMobile.vue'
import UsersStart from '@/components/users/UsersStart.vue'
import CustomersRequest from '@/components/users/CustomersRequest.vue'
import CustomersManagment from '@/components/users/CustomersManagment.vue'
import VendorsRequest from '@/components/users/VendorsRequest.vue'
import VendorsManagment from '@/components/users/VendorsManagment.vue'
import UsersMerchants from '@/components/users/UsersMerchants.vue'
import UsersBlacklisted from '@/components/users/UsersBlacklisted.vue'

export default {
	name: 'UsersPage',
	components: {
		FooterMobile,
		UsersStart,
		CustomersRequest,
		CustomersManagment,
		VendorsRequest,
		VendorsManagment,
		UsersMerchants,
		UsersBlacklisted
	},
	setup() {
		useHead({
			title: 'RBXCRATE | Users',
			meta: [
				{
					name: 'description',
					content: 'Website description',
				}
			]
		})

		const usersStore = useUsersStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch
		

		usersStore.$reset()


		return {
			usersStore,
			isMobile
		}
	}
}
</script>