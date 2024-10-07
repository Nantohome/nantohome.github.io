<template>
	<RegLayout
		:class="contentClass"
		:goBackLink="{
			value: false,
			pathName: 'register',
			text: 'Go Back'
		}"
	>
		<div class="register-verify-page">
			<div class="register-verify-page__title">A <span class="violet">6 digits code</span> has been sent to your E-mail</div>
			<div class="register-verify-page__desc rl__desc">Enter the 6-digit code:</div>
			<form
				@submit.prevent="regStore.checkCode(codeValue)"
				class="register-verify-page-form"
			>
				<CodeInput
					@change="(code) => codeValue = code"
					:fields="6"
					:required="true"
					class="register-verify-page-digit"
				></CodeInput>
				<div class="ui-digit-repeat">
					<a
						@click.prevent="regStore.sendCodeByTimer()"
						class="ui-digit-repeat__link"
						:class="{ 'disabled': regStore.timer > 0 }"
					>Request again</a>
					<span class="ui-digit-repeat__timer">{{ regStore.formattedTimer }}</span>
				</div>
				<BtnLoader
					:btnId="'checkRegCodeBtn'"
					class="register-verify-page__btn gradient-btn"
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
import { useRegStore } from '@/stores'

import RegLayout from '@/layouts/RegLayout.vue'
import CodeInput from '@/components/ui/CodeInput.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'


export default {
	name: 'RegisterVerifyPage',
	components: {
		CodeInput,
		RegLayout,
		BtnLoader
	},
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
		const contentClass = 'rl-register-verify'
		const codeValue = ref('')

		regStore.countDownTimer()
		
		return {
			regStore,
			contentClass,
			codeValue,
		}
	}
}
</script>