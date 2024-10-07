<template>
	<form
		@submit.prevent="settingsStore.addRate(rate)"
		class="add-rate ml-modal"
	>
		<span
			@click="settingsStore.toggleShowAddRate(false)"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Add rate</div>
		<div class="add-rate-input">
			<label
				for="addRate"
				class="ml-ui__label"
			>Rate value</label>
			<input
				v-model="rate"
				id="addRate"
				class="ml-ui__input"
				type="number"
				step="any"
				min="0"
				max="99"
				lang="en-US"
				placeholder="0"
				required
			>
		</div>
		<BtnLoader
			:btnId="'addRateBtn'"
			class="ml-btn ml-btn_violet"
		>
			<span>Submit</span>
		</BtnLoader>		
	</form>
</template>

<script>
import { ref } from 'vue'
import { useSettingsStore } from '@/stores'

import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'AddRate',
	components: {
		BtnLoader
	},
	setup() {
		const settingsStore = useSettingsStore()

		const rate = ref('')

		return {
			settingsStore,
			rate
		}
	}
}
</script>