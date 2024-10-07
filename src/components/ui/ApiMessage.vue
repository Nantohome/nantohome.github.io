<template>
	<div
		:class="{ 'js-show': apiMsgStore.apiMsg.show }"
		class="api-msg"
	>
		<span
			@click="apiMsgStore.hideMsg()"
			class="api-msg__close"
		></span>
		<div class="api-msg-header">
			<span
				:class="`api-msg__icon_${apiMsgStore.apiMsg.type}`"
				class="api-msg__icon"
			></span>
			<span class="api-msg__title">{{ apiMsgStore.apiMsg.title }}</span>
		</div>
		<div
			v-html="apiMsgStore.apiMsg.text"	
			class="api-msg__text"></div>
		<button
			@click="apiMsgStore.hideMsg"
			class="api-msg__btn ml-btn"
		>Got it</button>
	</div>
</template>

<script>
import { useApiMsgStore } from '@/stores'

export default {
	name: 'ApiMessage',
	setup() {
		const apiMsgStore = useApiMsgStore()

		return {
			apiMsgStore
		}
	}
}
</script>