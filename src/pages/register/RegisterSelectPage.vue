<template>
	<RegLayout
		:class="contentClass"
		:goBackLink="{
			value: false,
			pathName: 'dashboard',
			text: 'Home'
		}"
	>
		<div class="register-select-page">
			<div class="register-select-page__title rl__title"><span class="violet">What</span> will you do?</div>
			<div class="register-select-page-btnwrap">
				<button
					@click="regStore.setRole('vendor')"
					class="register-select-page__btn btn"
				><span>Sell</span></button>
				<button
					@click="regStore.setRole('customer')"
					class="register-select-page__btn btn"
				><span>Buy</span></button>
			</div>
			<div class="register-select-page-desc">Already have an account?&nbsp;<a :href="$router.resolve({ name: 'login' }).href" class="underline">Login!</a></div>
		</div>
	</RegLayout>
</template>

<script>
import { useHead } from '@unhead/vue'
import { useRegStore } from '@/stores'

import RegLayout from '@/layouts/RegLayout.vue'


export default {
	name: 'RegisterSelectPage',
	components: { RegLayout },
	setup() {
		useHead({
			title: 'RBXCRATE | Registration',
			meta: [
				{
					name: 'description',
					content: 'Website description',
				}
			]
		})

		const contentClass = 'rl-register-select'

		const regStore = useRegStore()
		
		regStore.reset()
		regStore.checkInvite()
		
		return {
			regStore,
			contentClass
		}
	}
}
</script>