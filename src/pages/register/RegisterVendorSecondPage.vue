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
			<div class="register-question-page__title rl__title"><span class="violet">How much</span> robux can you stock weekly?</div>
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
						placeholder="100k robux in a week"
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
	name: 'RegisterVendorSecondPage',
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
		const contentClass = 'rl-register-vendor-2'
		const	answer = ref('')

		return {
			regStore,
			contentClass,
			answer
		}
	}
}
</script>