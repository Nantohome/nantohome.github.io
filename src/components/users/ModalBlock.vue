<template>
	<form
		@submit.prevent="blacklistManagmentStore.blockVendor(value, freezeReason)"
		class="ml-modal"
	>
		<span
			@click="$emit('closeModal')"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Add Subject</div>
		<div class="cpanel-form-box">
			<div class="cpanel-form-field">
				<SelectBoxDefault
					:selectObj="blacklistManagmentStore.typeSelect"
					@change="(val) => blacklistManagmentStore.blockType = val"
				></SelectBoxDefault>
			</div>
			<div class="cpanel-form-field">
				<label
					for="blockVendorValue"
					class="ml-ui__label"
				>Content</label>
				<input
					v-model="value"
					id="blockVendorValue"
					class="ml-ui__input"
					type="text"
					required
				>
			</div>
			<div class="cpanel-form-field">
				<label
					for="blockVendorFreezeReason"
					class="ml-ui__label"
				>Reason</label>
				<input
					v-model="freezeReason"
					id="blockVendorFreezeReason"
					class="ml-ui__input"
					type="text"
					required
				>
			</div>
		</div>
		<BtnLoader
			:btnId="'blockVendorBtn'"
			class="block-vendor__btn ml-btn ml-btn_violet"
		>
			<span>Submit</span>
		</BtnLoader>
	</form>
</template>

<script>
import { ref } from 'vue'
import { useBlacklistManagmentStore } from '@/stores'

import BtnLoader from '@/components/ui/BtnLoader.vue'
import SelectBoxDefault from '@/components/ui/SelectBoxDefault.vue'

export default {
	name: 'ModalBlock',
	components: {
		BtnLoader,
		SelectBoxDefault
	},
	setup() {
		const blacklistManagmentStore = useBlacklistManagmentStore()

		const value = ref('')
		const freezeReason = ref('')

		blacklistManagmentStore.resetModalBlock()

		return {
			blacklistManagmentStore,
			
			value,
			freezeReason
		}
	}
}
</script>