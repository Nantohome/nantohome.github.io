<template>
	<RegLayout
		:class="contentClass"
		:goBackLink="{
			value: false,
			pathName: 'recovery',
			text: 'Go Back'
		}"
	>
		<div class="recovery-verify-page">
			<div class="recovery-verify-page__title">A <span class="violet">password recovery</span> code has been sent to your E-mail</div>
			<div class="recovery-verify-page__desc rl__desc">Enter the 6-digit code:</div>
			<form
				@submit.prevent="recoveryStore.checkCode(codeValue)"
				class="recovery-verify-page-form"
			>
				<CodeInput
					@change="(code) => codeValue = code"
					:fields="6"
					:required="true"
					class="recovery-verify-page-digit"
				></CodeInput>
				<div class="ui-digit-repeat">
					<a
						@click.prevent="recoveryStore.sendCodeByTimer()"
						class="ui-digit-repeat__link"
						:class="{ 'disabled': recoveryStore.timer > 0 }"
					>Request again</a>
					<span class="ui-digit-repeat__timer">{{ recoveryStore.formattedTimer }}</span>
				</div>
				<BtnLoader
					:btnId="'checkRecoveryCodeBtn'"
					class="recovery-verify-page__btn btn"
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
import CodeInput from '@/components/ui/CodeInput.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'


export default {
	name: 'RecoveryVerifyPage',
	components: {
		CodeInput,
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
		const contentClass = 'rl-recovery-verify'
		const codeValue = ref('')

		recoveryStore.countDownTimer()

		return {
			recoveryStore,
			contentClass,
			codeValue
		}
	}
}
</script>