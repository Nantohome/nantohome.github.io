<template>
	<div class="ml-modal-delete">
		<span
			@click="$emit('closeModal')"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Regenerate</div>
		<slot></slot>
		<div class="ml-modal-delete-btnwrap">
			<button
				@click="$emit('closeModal')"
				class="ml-btn ml-btn_violet"
			><span>Cancel</span></button>
			<button
				@click="$emit('confirmRegenerate')"
				class="ml-btn"
			><span>Regenerate</span></button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ModalRegenerate'
}
</script>