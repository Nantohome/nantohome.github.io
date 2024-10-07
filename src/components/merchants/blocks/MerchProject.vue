<template>
	<form
		@submit.prevent="createMerch"
		class="merch-project ml-modal"
	>
		<span
			@click="$emit('closeProject')"
			class="merch-project__close ml__close icon-close"
		></span>
		<div class="merch-project__title ml__title">Project details</div>
		<div class="merch-project-box">
			<div class="merch-project-field">
				<label
					for="merchProjectName"
					class="ml-ui__label"
				>Project Name</label>
				<input
					v-model="name"
					id="merchProjectName"
					class="merch-project__input ml-ui__input"
					type="text"
					placeholder="Enter name..."
					required
				>
			</div>
			<div class="merch-project-field">
				<label
					for="merchProjectUrl"
					class="ml-ui__label"
				>Project URL</label>
				<input
					v-model="url"
					id="merchProjectUrl"
					class="merch-project__input ml-ui__input"
					type="text"
					placeholder="Enter link..."
					required
				>
			</div>
		</div>
		<BtnLoader
			:btnId="'createMerchBtn'"
			class="merch-project__btn ml-btn"
		>
			<span>Create</span>
		</BtnLoader>
	</form>
</template>

<script>
import { ref } from 'vue'
import { mobileMatchMedia } from '@/utils/helpers'

import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'MerchProject',
	components: {
		BtnLoader
	},
	setup(props, { emit }) {
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const name = ref('')
		const url = ref('')

		const createMerch = () => {
			emit('createMerch', name.value, url.value)
		}
				
		return {
			isMobile,
			name,
			url,
			createMerch
		}
	}
}
</script>