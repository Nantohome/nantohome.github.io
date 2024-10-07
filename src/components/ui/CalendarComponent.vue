<template>
	<div class="calendar">
		<div class="calendar__val">{{ date.toLocaleDateString("en-US", options) }}</div>
		<DatePicker
			v-model="date"
			mode="date"
			trim-weeks
			:locale="{ id: 'en', firstDayOfWeek: 2, masks: { weekdays: 'WW' } }"
			@dayclick="onDayClick"
			borderless
			title-position="left"
		></DatePicker>
	</div>
</template>

<script>
import { ref } from 'vue'
import { DatePicker } from 'v-calendar'

export default {
	name: 'CalendarComponent',
	components: {
		DatePicker
	},
	setup(props, { emit }) {

		const date = ref(new Date())

		const options = { year: 'numeric', month: 'short', day: 'numeric' };

		const onDayClick = (day) => {
			emit('change', day.date.toISOString())
		}

		return {
			date,
			options,
			onDayClick
		}
	}
}
</script>