<template>
	<a
		:href="link"
		target="_blank"
		class="help-btn"
	>
		<IconQuestion></IconQuestion>
		<span>Help</span>
	</a>
</template>

<script>
import IconQuestion from '@/components/svg/IconQuestion.vue'

export default {
	name: 'HelpBtn',
	props: {
		link: String
	},
	components: {
		IconQuestion
	}
}
</script>