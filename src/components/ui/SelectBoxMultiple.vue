<template>
	<div class="select select_multiple">
		<div class="select__label">{{ label }}</div>
		<div class="select-wrap">
			<div
				:class="{ 'js-open': open }"
				:style="[open ? { height: listHeight } : null]"
				class="select-el select-el_multiple"
				tabindex="0"
			>
				<ul	ref="listEl" class="select-list select-list_multiple">
					<li
						v-for="(option, i) of list"
						:key="i"
						@click="changeVal(option.name, i)"
						:class="{ 'js-chosen': defaultOption === i }"
						class="select-item"
					>
						<div class="select-item-justify">
							<span class="select-item__title">{{ option.name.replace('_', ' ') }}</span>
							<input
								v-model="option.isEnabled"
								@click.stop
								type="checkbox"
								class="select-item__checkbox"
							>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated, nextTick, ref } from 'vue'

export default {
	name: 'SelectBoxMultiple',
	props:{
		label: String,
		list: Array
	},
	setup(props, { emit }) {

		const 	listEl = ref(),
				listHeight = ref(),
				open = ref(false),
				defaultOption = ref(0)
		
		
		const closeOnEscape = (e) => {
			if(open.value && e.keyCode === 27) {
				open.value = false;
			}
		}

		const changeVal = (val, i) => {
			open.value = !open.value

			if(open.value === false) {
				listEl.value.scrollTop = 0
			}
			
			if(defaultOption.value !== i) {
				defaultOption.value = i
				emit('changeVal', val, i)
			}
		}


		
		onMounted(() =>
			listHeight.value = `${listEl.value.getBoundingClientRect().height}px`,
			document.addEventListener('keydown', closeOnEscape)
		)

		onUpdated(() =>
			nextTick().then(() => {
				listHeight.value = `${listEl.value.getBoundingClientRect().height}px`
			})
		)
		
		onUnmounted(() =>
			document.removeEventListener('keydown', closeOnEscape)
		)
		
		
		return {
			listEl,
			listHeight,
			defaultOption,
			open,
			changeVal
		}
	}
}
</script>