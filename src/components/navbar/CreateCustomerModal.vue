<template>
	<form
		@submit.prevent="cpanelStore.getCustomerAccess(location, sum)"
		class="ml-modal"
	>
		<span
			@click="$emit('closeModal')"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Get buyer access</div>
		<div class="cpanel-form-box">
			<div class="cpanel-form-field">
				<label
					for="createCustomerLocation"
					class="ml-ui__label"
				>Where are you selling robux?</label>
				<input
					v-model="location"
					id="createCustomerLocation"
					class="ml-ui__input"
					type="text"
					placeholder="Project URL"
					required
				>
			</div>
			<div class="cpanel-form-field">
				<label
					for="createCustomerSum"
					class="ml-ui__label"
				>How much robux can you buy daily?</label>
				<input
					v-model="sum"
					id="createCustomerSum"
					class="ml-ui__input"
					type="text"
					placeholder="0 R$"
					required
				>
			</div>
		</div>
		<BtnLoader
			:btnId="'createCustomerBtn'"
			class="create-customer__btn ml-btn"
		>
			<span>Submit</span>
		</BtnLoader>
	</form>
</template>

<script>
import { ref } from 'vue'
import { useCpanelStore } from '@/stores'

import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'CreateCustomerModal',
	components: {
		BtnLoader
	},
	setup() {
		const cpanelStore = useCpanelStore()

		const location = ref('')
		const sum = ref('')

		return {
			cpanelStore,
			location,
			sum
		}
	}
}
</script>