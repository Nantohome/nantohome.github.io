<template>
	<form
		@submit.prevent="settingsStore.sendNotification()"
		class="message-preview ml-modal"
	>
		<span
			@click="$emit('closeModal')"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Message preview</div>
		<div
			v-html="settingsStore.notification.text"
			class="message-preview__text"
		></div>
		<div class="ml-modal-delete-btnwrap">
			<button
				@click.prevent="$emit('closeModal')"
				class="ml-btn"
			><span>Cancel</span></button>
			<BtnLoader
				:id="'messagePreviewBtn'"
				class="ml-btn ml-btn_violet"
			><span>Send</span></BtnLoader>
		</div>
	</form>
</template>

<script>
import { useSettingsStore } from '@/stores'

import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'MessagePreview',
	components: {
		BtnLoader
	},
	setup() {
		const settingsStore = useSettingsStore()

		return {
			settingsStore
		}
	}
}
</script>