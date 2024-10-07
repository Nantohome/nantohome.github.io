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
			<div class="register-question-page__title rl__title"><span class="violet">Where</span> are you selling robux?</div>
			<form
				@submit.prevent="regStore.setFirstAnswer(answer)"
				class="register-question-page-form"
			>
				<div class="rl-field">
					<label
						:class="{ 'error': regStore.firstAnswer.error }"
						for="registerCustomerFirstQuestion"
						class="ui__label"
					>{{ regStore.firstAnswer.label }}</label>
					<input
						v-model="answer"
						id="registerCustomerFirstQuestion"
						class="ui__input"
						type="text"
						placeholder="Reselling on my discord server"
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
	name: 'RegisterCustomerFirstPage',
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
		const contentClass = 'rl-register-customer-1'
		const answer = ref('')

		return {
			regStore,
			contentClass,
			answer
		}
	}
}
</script>