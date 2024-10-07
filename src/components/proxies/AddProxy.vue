<template>
	<form
		@submit.prevent="sendForm"
		class="add-proxy ml-modal"
	>
		<span
			@click="proxiesStore.toggleShowAddProxy(false)"
			class="ml__close icon-close"
		></span>
		<div class="add-proxy-block">
			<div class="ml__title">Add Proxy</div>
			<div class="ml__subtitle">HTTPS only</div>
		</div>
		<div class="add-proxy-fields">
			<div class="add-proxy-field">
				<label
					for="proxyHost"
					class="ml-ui__label"
				>Host</label>
				<input
					v-model="proxyValues.host"
					@input="checkEmptyValues"
					id="proxyHost"
					class="ml-ui__input"
					type="text"
					placeholder="127.0.0.1"
					required
				>
			</div>
			<div class="add-proxy-field">
				<label
					for="proxyPort"
					class="ml-ui__label"
				>Port</label>
				<input
					v-model="proxyValues.port"
					@input="checkEmptyValues"
					id="proxyPort"
					class="ml-ui__input"
					type="text"
					placeholder="1234"
					required
				>
			</div>
			<div class="add-proxy-field">
				<label
					for="proxyName"
					class="ml-ui__label"
				>Username</label>
				<input
					v-model="proxyValues.name"
					@input="checkEmptyValues"
					id="proxyName"
					class="ml-ui__input"
					type="text"
					placeholder="Nickname"
					required
				>
			</div>
			<div class="add-proxy-field">
				<label
					for="proxyPass"
					class="ml-ui__label"
				>Password</label>
				<input
					v-model="proxyValues.pass"
					@input="checkEmptyValues"
					id="proxyPass"
					class="ml-ui__input"
					type="password"
					placeholder="qwerty123"
					required
				>
			</div>
		</div>
		<BtnLoader
			:disabled="isEmptyValues"
			:btnId="'addProxyBtn'"
			:class="{ 'ml-btn_violet': !isEmptyValues }"
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
	name: 'AddProxy',
	components: {
		BtnLoader
	},
	setup() {
		const proxiesStore = useProxiesStore()

		const proxyValues = ref({
			host: '',
			port: '',
			name: '',
			pass: ''
		})

		const isEmptyValues = ref(true)

		const checkEmptyValues = () => {
			for(let key in proxyValues.value) {
				if(proxyValues.value[key].length <= 0) {
					isEmptyValues.value = true
				} else {
					isEmptyValues.value = false
				}
			}
		}

		const sendForm = () => {
			if(!isEmptyValues.value) {
				proxiesStore.addProxy(proxyValues.value)
			}
		}

		return {
			proxiesStore,

			proxyValues,
			isEmptyValues,
			checkEmptyValues,
			sendForm
		}
	}
}
</script>