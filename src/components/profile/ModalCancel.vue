<template>
	<div class="ml-modal-delete">
		<span
			@click="$emit('closeModal')"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Cancel order</div>
		<slot></slot>
		<div class="ml-modal-delete-btnwrap">
			<button
				@click="$emit('closeModal')"
				class="ml-btn ml-btn_violet"
			><span>No</span></button>
			<button
				@click="$emit('confirmCancel')"
				class="ml-btn"
			><span>Yes</span></button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ModalCancel'
}
</script>