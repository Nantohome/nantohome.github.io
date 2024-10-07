<template>
	<div class="confirm">
		<div
			v-if="isMobile"
			class="confirm-wrap"
		>
			<button
				@click="$emit('confirmNo')"
				class="confirm-mob__btn confirm-no"
			>Cancel</button>
			<div class="confirm-mob__icon nb-logout"></div>
			<button
				@click="$emit('confirmYes')"
				class="confirm-mob__btn confirm-yes"
			>Confirm</button>
		</div>
		<div
			v-else
			class="confirm-wrap"
		>
			<div
				@click="$emit('confirmNo')"
				class="confirm__icon confirm-no"
			>
				<IconNo></IconNo>
			</div>
			<span class="confirm__text">Are you sure?</span>
			<div
				@click="$emit('confirmYes')"
				class="confirm__icon confirm-yes"
			>
				<IconYes></IconYes>
			</div>
		</div>
	</div>
</template>

<script>
import { mobileMatchMedia } from '@/utils/helpers'

import IconNo from '@/components/svg/IconNo.vue'
import IconYes from '@/components/svg/IconYes.vue'


export default {
	name: 'NavBar',
	components: {
		IconNo,
		IconYes
	},
	setup() {
		
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		return{
			isMobile
		}
	}
}
</script>