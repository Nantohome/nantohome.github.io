<template>
	<div class="ml-right">
		<div
			v-if="navbarStore.user !== null"
			class="profile ml-block"
		>
			<div
				v-if="isMobile"
				class="mobile-title"
			>
				<div class="mobile-title__text">Profile</div>
			</div>
			<div class="profile-header ml-grid-row">
				<div class="profile-header-field">
					<label class="ml-ui__label">Account Login</label>
					<input
						:value="navbarStore.user.login"
						id="profileAccount"
						class="ml-ui__input"
						type="text"
						placeholder="No Data"
						disabled
					>
				</div>
				<div class="profile-header-field">
					<label class="ml-ui__label">Discord  Login</label>
					<input
						:value="navbarStore.user.discordUsername"
						id="profileDiscord"
						class="ml-ui__input"
						type="text"
						placeholder="No Data"
						disabled
					>
				</div>
				<div class="profile-header-field">
					<label class="ml-ui__label">Total deposit</label>
					<input
						:value="profileStore.totalDeposit"
						id="profileTotal"
						class="ml-ui__input"
						type="text"
						placeholder="No Data"
						disabled
					>
				</div>
				<div class="profile-header-field">
					<label class="ml-ui__label">Email</label>
					<input
						:value="navbarStore.user.email"
						id="profileEmail"
						class="ml-ui__input"
						type="text"
						placeholder="No Data"
						disabled
					>
				</div>
			</div>
			<transition name="fade" mode="out-in">
				<ProfileOrders
					v-if="profileStore.isOrderHistoryShow"
					class="profile-body"
				></ProfileOrders>
				<ProfileTopup
					v-else
					class="profile-body"
				></ProfileTopup>
			</transition>
		</div>
		<FooterMobile></FooterMobile>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useProfileStore, useNavbarStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import FooterMobile from '@/components/FooterMobile.vue'
import ProfileOrders from '@/components/profile/ProfileOrders.vue'
import ProfileTopup from '@/components/profile/ProfileTopup.vue'

export default {
	name: 'ProfilePage',
	components: {
		FooterMobile,
		ProfileOrders,
		ProfileTopup
	},
	setup() {
		useHead({
			title: 'RBXCRATE | Profile',
			meta: [
				{
					name: 'description',
					content: 'Website description',
				}
			]
		})

		const profileStore = useProfileStore()
		const navbarStore = useNavbarStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const currentPage = ref(1)
		

		profileStore.$reset()
		profileStore.getData()


		return {
			profileStore,
			navbarStore,
			isMobile,

			currentPage
		}
	}
}
</script>