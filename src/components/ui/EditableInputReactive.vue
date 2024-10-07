<template>
	<div class="ml-ui-inputbtn">
		<input
			ref="input"
			:value="modelValue"
			@change="$emit('update:modelValue', $event.target.value)"
			class=" ml-ui__input"
			type="text"
			:placeholder="placeholder"
			:readonly="readonly"
		>
		<button
			@click.prevent="changeReadonly"
			:class="{ 'js-active': !readonly }"
			class="ml-ui-inputbtn__btn icon-edit"
		></button>
	</div>
</template>

<script>
import { ref } from 'vue'

export default {
	name: 'EditableInputReactive',
	props: {
		modelValue: [String, Number, Array],
		placeholder: String
	},
	setup() {
		const input = ref()
		const readonly = ref(true)

		const changeReadonly = () => {
			readonly.value = !readonly.value
			if(!readonly.value) {
				input.value.focus()
			}
		}

		return{
			input,
			readonly,
			changeReadonly
		}
	}
}
</script>