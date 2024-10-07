<template>
	<button class="btn-loader">
		<transition name="fade">
			<div
				v-if="loaderStore.isLoaderVisible && loaderStore.loaderId === btnId"
				class="btn-loader-box"
			>
				<div class="btn-loader__text">Loading</div>
				<div class="btn-loader-dots">
					<span>.</span>
					<span>.</span>
					<span>.</span>
				</div>
			</div>
			<slot
				v-else
			></slot>
		</transition>
	</button>
</template>

<script>
import { useLoaderStore } from '@/stores'

export default {
	name: 'BtnLoader',
	props: {
		btnId: String
	},
	setup() {
		const loaderStore = useLoaderStore()
		
		return {
			loaderStore
		}
	}
}
</script>