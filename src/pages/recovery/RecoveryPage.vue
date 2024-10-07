<template>
	<RegLayout
		:class="contentClass"
		:goBackLink="{
			value: false,
			pathName: 'login',
			text: 'Login'
		}"
	>
		<div class="recovery-page">
			<div class="recovery-page__title rl__title">Recovery</div>
			<div class="recovery-page__desc rl__desc">Enter the email to which your account is registered:</div>
			<form
				@submit.prevent="recoveryStore.sendCode(email)"
				class="recovery-page-form"
			>
				<div class="rl-field">
					<label
						for="recoveryPageEmail"
						class="ui__label"
					>{{ recoveryStore.email.label }}</label>
					<input
						v-model="email"
						id="recoveryPageEmail"
						class="ui__input"
						type="email"
						placeholder="you@company.com"
						required
					>
				</div>
				<BtnLoader
					:btnId="'sendRecoveryCodeBtn'"
					class="recovery-page__btn btn"
				>
					<span>Continue</span>
				</BtnLoader>
			</form>
		</div>
	</RegLayout>
</template>


<script>
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useRecoveryStore } from '@/stores'

import RegLayout from '@/layouts/RegLayout.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'


export default {
	name: 'RecoveryPage',
	components: {
		RegLayout,
		BtnLoader
	},
	setup() {
		useHead({
			title: 'RBXCRATE | Recovery password',
			meta: [
				{
					name: 'description',
					content: 'Website description',
				}
			]
		})

		const recoveryStore = useRecoveryStore()
		const contentClass = 'rl-recovery'
		const email = ref('')

		return {
			contentClass,
			recoveryStore,
			email
		}
	}
}
</script>