<template>
	<form
		@submit.prevent="proxiesStore.addProxies(proxies)"
		class="add-proxies ml-modal"
	>
		<span
			@click="proxiesStore.toggleShowAddProxies(false)"
			class="ml__close icon-close"
		></span>
		<div class="add-proxy-block">
			<div class="ml__title">Add Proxies</div>
			<div class="ml__subtitle">HTTPS only</div>
		</div>
		<div class="add-proxy-field">
			<label
				for="addProxiesField"
				class="ml-ui__label"
			>Proxies to add, one per line (HTTPS only)</label>
			<textarea
				v-model="proxies"
				id="addProxiesField"
				class="ml-ui__input ml-ui__input_textarea"
				type="text"
				placeholder="Enter cookies here..."
				required
			></textarea>
		</div>
		<div class="add-proxy-block">
			<div class="add-proxies__format violet">The format for proxies strings:</div>
			<div class="add-proxies__example">HOST:PORT:USERNAME:PASSWORD</div>
		</div>
		<BtnLoader
			:btnId="'addProxiesBtn'"
			class="ml-btn"
		>
			<span>Submit</span>
		</BtnLoader>		
	</form>
</template>

<script>
import { ref } from 'vue'
import { useProxiesStore } from '@/stores'

import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'AddProxies',
	components: {
		BtnLoader
	},
	setup() {
		const proxiesStore = useProxiesStore()

		const proxies = ref('')

		return {
			proxiesStore,
			proxies
		}
	}
}
</script>