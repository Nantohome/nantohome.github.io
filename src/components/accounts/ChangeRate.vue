<template>
	<form
		@submit.prevent="accountsStore.changeRate()"
		class="change-rate ml-modal"
	>
		<span
			@click="accountsStore.toggleShowChangeRate(false)"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Change Rate</div>
		<SelectBoxDefault
			:selectObj="accountsStore.ratesSelect"
			@change="changeRate"
		></SelectBoxDefault>
		<BtnLoader
			:btnId="'changeRateBtn'"
			class="ml-btn ml-btn_violet"
		>
			<span>Submit</span>
		</BtnLoader>		
	</form>
</template>

<script>
import { useAccountsStore } from '@/stores'

import SelectBoxDefault from '@/components/ui/SelectBoxDefault.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'ChangeRate',
	components: {
		SelectBoxDefault,
		BtnLoader
	},
	setup() {
		const accountsStore = useAccountsStore()

		const changeRate = (val) => {
			accountsStore.currentRate = val
		}

		return {
			accountsStore,
			changeRate
		}
	}
}
</script>