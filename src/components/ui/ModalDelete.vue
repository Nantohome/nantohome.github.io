<template>
	<div class="ml-modal-delete">
		<span
			@click="$emit('closeModal')"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Delete</div>
		<slot></slot>
		<div class="ml-modal-delete-btnwrap">
			<button
				@click="$emit('closeModal')"
				class="ml-btn ml-btn_violet"
			><span>Cancel</span></button>
			<button
				@click="$emit('confirmDelete')"
				class="ml-btn"
			><span>Delete</span></button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ModalDelete'
}
</script>