<template>
	<div class="select">
		<div class="select__label">{{ selectObj.label }}</div>
		<div class="select-wrap">
			<div
				@blur="blurSelect()"
				:class="{ 'js-open': open, 'js-hide-calbtn': isCalendarBtnHide, 'disabled': selectObj.list.length <= 1 }"
				:style="[open ? { height: listHeight } : null]"
				class="select-el select-calendar-el"
				tabindex="0"
			>
				<div
					@click="toggleShowCalendar"
					:class="{'js-open': isCalendarShow}"
					class="select-calendar-el__btn"
				></div>
				<ul ref="listEl" class="select-list">
					<li
						v-for="(option, i) of selectObj.list"
						:key="i"
						@click="changeVal(option.value, i)"
						:class="{ 'js-chosen': defaultOption === i }"
						class="select-item"
					>
						<span class="select-item__title">{{ option.title }}</span>
					</li>
				</ul>
			</div>
			<transition name="fade">
				<div
					v-show="isCalendarShow"
					class="select-calendar"
				>
					<CalendarComponent
						@change="changeActiveDay"
					></CalendarComponent>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'

import CalendarComponent from '@/components/ui/CalendarComponent.vue'

export default {
	name: 'SelectBoxCalendar',
	props:{
		selectObj: Object
	},
	components:{
		CalendarComponent
	},
	setup(props, { emit }) {

		const 	listEl = ref(),
				listHeight = ref(),
				open = ref(false),
				defaultOption = ref(0),
				isCalendarBtnHide = ref(false),
				isCalendarShow = ref(false)
		
		
		const closeOnEscape = (e) => {
			if (open.value && e.keyCode === 27) {
				open.value = false
			}
		}

		const blurSelect = () => {
			open.value = false
			listEl.value.scrollTop = 0
		}

		const changeVal = (val, i) => {
			isCalendarShow.value = false
			open.value = !open.value
			
			if(defaultOption.value !== i) {
				defaultOption.value = i

				if(val !== 'day') {
					isCalendarBtnHide.value = true
				} else {
					isCalendarBtnHide.value = false
				}

				emit('change', val, i)
			}
		}

		const toggleShowCalendar = () => {
			isCalendarShow.value = !isCalendarShow.value
		}

		const changeActiveDay = (val) => {
			isCalendarShow.value = false
			emit('changeDay', val)
		}


		
		onMounted(() => {
			if(props.selectObj.list[0].value !== 'day') {
				isCalendarBtnHide.value = true
			}
			listHeight.value = `${listEl.value.getBoundingClientRect().height}px`,
			document.addEventListener('keydown', closeOnEscape)
		})
		
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
			isCalendarBtnHide,
			isCalendarShow,
			toggleShowCalendar,
			changeActiveDay
		}
	}
}
</script>