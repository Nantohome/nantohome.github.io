<template>
	<form
		@submit.prevent="cpanelStore.getVendorAccess(method, sum)"
		class="ml-modal"
	>
		<span
			@click="$emit('closeModal')"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Get supplier access</div>
		<div class="cpanel-form-box">
			<div class="cpanel-form-field">
				<label
					for="createVendorMethod"
					class="ml-ui__label"
				>What methods do you use to earn robux?</label>
				<input
					v-model="method"
					id="createVendorMethod"
					class="ml-ui__input"
					type="text"
					placeholder="Making UGC Items"
					required
				>
			</div>
			<div class="cpanel-form-field">
				<label
					for="createVendorSum"
					class="ml-ui__label"
				>How much robux can you stock weekly?</label>
				<input
					v-model="sum"
					id="createVendorSum"
					class="ml-ui__input"
					type="text"
					placeholder="0 R$"
					required
				>
			</div>
		</div>
		<BtnLoader
			:btnId="'createVendorBtn'"
			class="create-vendor__btn ml-btn"
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
	name: 'CreateVendorModal',
	components: {
		BtnLoader
	},
	setup() {
		const cpanelStore = useCpanelStore()

		const method = ref('')
		const sum = ref('')

		return {
			cpanelStore,
			method,
			sum
		}
	}
}
</script>