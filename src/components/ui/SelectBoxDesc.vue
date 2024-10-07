<template>
	<div class="select">
		<div
			v-if="selectObj.label"
			class="select__label"
		>{{ selectObj.label }}</div>
		<div class="select-wrap">
			<div
				:class="{ 'js-open': open, 'disabled': selectObj.list.length <= 1 }"
				:style="[open ? { height: listHeight } : null]"
				class="select-el"
				tabindex="0"
			>
				<ul
					ref="listEl"
					@blur="blurSelect()"
					class="select-list"
				>
					<li
						v-if="selectObj.desc"
						@click="toggleList()"
						class="select-item js-chosen"
					>
						<div class="select-item__desc-text">{{ selectObj.desc }}</div>
					</li>
					<li
						v-for="(option, i) of selectObj.list"
						:key="i"
						@click="changeVal(option.value, i)"
						:class="{ 'select-item_multiwords': multiwords }"
						class="select-item"
					>
						<div class="select-item-multiwords">
							<slot
								name="begin"
								:value="option.beginTitle"
							></slot>
							<span
								:class="`select-item__title_${option.color}`"
								class="select-item__title"
							>{{ option.title }}</span>
							<slot
								name="end"
								:value="option.endTitle"
							></slot>
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
	name: 'SelectBoxDesc',
	props:{
		selectObj: Object,
		multiwords: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { emit }) {

		const 	listEl = ref(),
				listHeight = ref(),
				open = ref(false),
				defaultOption = ref(0)
		
		
		const closeOnEscape = (e) => {
			if (open.value && e.keyCode === 27) {
				open.value = false;
			}
		}

		const blurSelect = () => {
			open.value = false
			listEl.value.scrollTop = 0
		}

		const changeVal = (val, i) => {
			if(open.value) {
				open.value = false
				listEl.value.scrollTop = 0
			
				if(defaultOption.value !== i) {
					defaultOption.value = i
					emit('changeVal', val, i)
				}
			} else {
				open.value = true
			}
		}

		const toggleList = () => {
			open.value = !open.value

			if(open.value === false) {
				listEl.value.scrollTop = 0
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
			blurSelect,
			changeVal,
			toggleList
		}
	}
}
</script>