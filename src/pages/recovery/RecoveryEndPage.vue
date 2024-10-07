<template>
	<RegLayout
		:class="contentClass"
		:goBackLink="{
			value: false,
			pathName: 'recovery',
			text: 'Go Back'
		}"
	>
		<div class="recovery-end-page">
			<div class="recovery-end-page__title rl__title">Recovery</div>
			<form
				@submit.prevent="recoveryStore.resetPassword(password1, password2)"
				class="recovery-end-page-form"
			>
				<div class="rl-field">
					<label
						:class="{ 'error': recoveryStore.password1.error }"
						for="recoveryEndPagePass"
						class="ui__label"
					>{{ recoveryStore.password1.label }}</label>
					<input
						v-model="password1"
						id="recoveryEndPagePass"
						class="ui__input"
						type="password"
						placeholder="Write your password here"
						required
					>
				</div>
				<div class="rl-field">
					<label
						:class="{ 'error': recoveryStore.password2.error }"
						for="recoveryEndPagePassRepeat"
						class="ui__label"
					>{{ recoveryStore.password2.label }}</label>
					<input
						v-model="password2"
						id="recoveryEndPagePassRepeat"
						class="ui__input"
						type="password"
						placeholder="Repeat your password here"
						required
					>
				</div>
				<BtnLoader
					:btnId="'recoveryPassBtn'"
					class="recovery-end-page__btn gradient-btn"
				>
					<span>Submit</span>
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
	name: 'RecoveryEndPage',
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
		const contentClass = 'rl-recovery-end'
		const password1 = ref('')
		const password2 = ref('')

		return {
			recoveryStore,
			contentClass,
			password1,
			password2
		}
	}
}
</script>