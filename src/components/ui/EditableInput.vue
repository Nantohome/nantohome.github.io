<template>
	<div class="editable-input">
		<button
			@click="toggleShow"
			:class="{ 'js-active': isInputShow }"
			class="editable-input__btn icon-btn icon-btn_edit"
		></button>
		<transition name="fadescalex" mode="out-in">
			<span
				v-if="!isInputShow"
				class="editable-input__text"
			>{{ val }}</span>
			<input
				v-else
				ref="input"
				@keyup.enter="changeVal"
				v-model="inputVal"
				class="editable-input__el"
				type="text"
				placeholder="Enter name..."
			>
		</transition>
	</div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
	name: 'EditableInput',
	props: {
		val: String
	},
	setup(props, { emit }) {

		const isInputShow = ref(false)
		const input = ref(null)
		const inputVal = ref('')

		const toggleShow = () => {
			if(isInputShow.value) {
				if(inputVal.value !== '') {
					changeVal()
				}
				isInputShow.value = false
			} else {
				isInputShow.value = true
				inputVal.value = ''
			}
		}

		const changeVal = () => {
			emit('change-name', inputVal.value)
			isInputShow.value = false
		}

		watch(input, input => {
			input && input.focus()
		})
		
		return{
			input,
			inputVal,
			isInputShow,
			toggleShow,
			changeVal
		}
	}
}
</script>