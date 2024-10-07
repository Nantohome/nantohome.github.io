<template>
	<div class="select">
		<div
			v-if="selectObj.label"
			class="select__label"
		>{{ selectObj.label }}</div>
		<div class="select-wrap">
			<div
				@blur="blurSelect()"
				:class="{ 'js-open': open, 'disabled': selectObj.list.length <= 1 }"
				:style="[open ? { height: listHeight } : null]"
				class="select-el"
				tabindex="0"
			>
				<ul
					@blur="blurSelect()"
					ref="listEl"
					class="select-list"
				>
					<li
						v-for="(option, i) of selectObj.list"
						:key="i"
						@click="changeVal(option.value, i)"
						:class="[{ 'js-chosen': defaultOption === i }, { 'select-item_multiwords': multiwords }]"
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
	name: 'SelectBoxMerch',
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
			if(open.value && e.keyCode === 27) {
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
			
				if(defaultOption.value !== i && val !== 'create') {
					defaultOption.value = i
					emit('change', val, i)
				} else if(val === 'create') {
					emit('create')
				}
			} else {
				open.value = true
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
			changeVal
		}
	}
}
</script>