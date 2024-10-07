<template>
	<div class="ml-modal-delete">
		<span
			@click="$emit('closeModal')"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Method</div>
		<div class="ml-modal-desc">Making a UGC Items & more extra information which unframed before this tooltip</div>
		<button
			@click="$emit('closeModal')"
			class="ml-btn"
		><span>Cancel</span></button>
	</div>
</template>

<script>
export default {
	name: 'MethodModal'
}
</script>