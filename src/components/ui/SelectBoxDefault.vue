<template>
	<div class="select select-default">
		<div
			v-if="selectObj.label"
			class="select__label"
		>{{ selectObj.label }}</div>
		<div class="select-wrap">
			<div
				@blur="open = false"
				:class="{ 'js-open': open}"
				:style="[open ? { height: listHeight } : null]"
				class="select-el"
				tabindex="0"
			>
				<div
					v-if="selectObjList.length > 0"
					ref="selectDefaultEl"
					@click="open = !open"
					class="select-value"
				>{{ selectObjList[selectDefaultIndex].title }}</div>
				<ul
					v-if="selectObjList.length > 0"
					ref="listEl"
					class="select-list select-list_default"
				>
					<li
						v-for="(option, i) of selectObjList"
						:key="i"
						@click="changeVal(option.value, i)"
						:class="[{ 'js-active': option.default }, { 'select-item_multiwords': multiwords }]"
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
	name: 'SelectBoxDefault',
	props:{
		selectObj: Object,
		multiwords: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { emit }) {

		const selectObjList = ref(props.selectObj.list)
		const selectDefaultIndex = ref(0)
		const open = ref(false)
		const listHeight = ref()

		const	selectDefaultEl = ref(null),
				listEl = ref(null)
		
		

		const setDefault = async() => {
			await selectObjList.value

			selectObjList.value.forEach((item, index) => {
				if(item.default) {
					selectDefaultIndex.value = index
				}
			})
		}

		const closeOnEscape = (e) => {
			if (open.value && e.keyCode === 27) {
				open.value = false;
			}
		}

		const changeVal = (val, i) => {
			open.value = false

			if(i !== selectDefaultIndex.value) {
				selectObjList.value[selectDefaultIndex.value].default = false
				selectDefaultIndex.value = i
				selectObjList.value[i].default = true

				emit('change', val, i)
			}
		}


		
		onMounted(async() => {
			setDefault()
			
			if(listEl.value !== null) {
				listHeight.value = `${listEl.value.getBoundingClientRect().height + selectDefaultEl.value.getBoundingClientRect().height}px`
				document.addEventListener('keydown', closeOnEscape)
			}
		})

		onUpdated(() =>
			nextTick().then(() => {
				listHeight.value = `${listEl.value.getBoundingClientRect().height + selectDefaultEl.value.getBoundingClientRect().height}px`
			})
		)

		onUnmounted(() =>
			document.removeEventListener('keydown', closeOnEscape)
		)
		
		
		return {
			selectObjList,
			selectDefaultIndex,

			selectDefaultEl,
			listEl,
			
			listHeight,
			open,
			
			changeVal
		}
	}
}
</script>