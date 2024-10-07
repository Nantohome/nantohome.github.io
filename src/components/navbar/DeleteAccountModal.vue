<template>
	<form
		@submit.prevent="cpanelStore.deleteAccount()"
		class="ml-modal"
	>
		<span
			@click="$emit('closeModal')"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Are you sure?</div>
		<div class="ml__subtitle">Delete your account will remove all your information from our site.<br>This cannot be undone.</div>
		<div class="cpanel-form-box">
			<div class="cpanel-form-field">
				<label
					for="deleteAccount"
					class="delete-account__label ml-ui__label"
				>To confirm this, type “<b>{{ cpanelStore.confirmMessage }}</b>”:</label>
				<input
					v-model="confirmValue"
					onpaste="return false"
					id="deleteAccount"
					class="ml-ui__input"
					type="text"
					required
				>
			</div>
			<BtnLoader
				:disabled="cpanelStore.confirmMessage !== confirmValue"
				:btnId="'deleteAccountBtn'"
				class="delete-account__btn ml-btn"
			>
				<span>Delete account</span>
			</BtnLoader>
		</div>
	</form>
</template>

<script>
import { ref } from 'vue'
import { useCpanelStore } from '@/stores'

import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'DeleteAccountModal',
	components: {
		BtnLoader
	},
	setup() {
		const cpanelStore = useCpanelStore()

		const confirmValue = ref('')

		return {
			cpanelStore,
			confirmValue
		}
	}
}
</script>