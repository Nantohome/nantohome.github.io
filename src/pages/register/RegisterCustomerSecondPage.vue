<template>
	<RegLayout
		:class="contentClass"
		:goBackLink="{
			value: false,
			pathName: 'register',
			text: 'Go Back'
		}"
	>
		<div class="register-question-page">
			<div class="register-question-page__title rl__title"><span class="violet">How much</span> robux can you buy daily?</div>
			<form
				@submit.prevent="regStore.setSecondAnswer(answer)"
				class="register-question-page-form"
			>
				<div class="rl-field">
					<label
						:class="{ 'error': regStore.secondAnswer.error }"
						for="registerCustomerSecondQuestion"
						class="ui__label"
					>{{ regStore.secondAnswer.label }}</label>
					<input
						v-model="answer"
						id="registerCustomerSecondQuestion"
						class="ui__input"
						type="text"
						placeholder="25,000 R$"
						required
						autofocus
					>
				</div>
				<button	class="register-question-page__btn btn"><span>Continue</span></button>
			</form>
		</div>
	</RegLayout>
</template>

<script>
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useRegStore } from '@/stores'

import RegLayout from '@/layouts/RegLayout.vue'


export default {
	name: 'RegisterCustomerSecondPage',
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

		const regStore = useRegStore()
		const contentClass = 'rl-register-customer-2'
		const	answer = ref('')

		return {
			regStore,
			contentClass,
			answer
		}
	}
}
</script>