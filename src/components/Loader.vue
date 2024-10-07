<template>
	<div class="loader">
		<div class="loader-box">
			<div class="loader__anim">
				<LogoMask></LogoMask>
			</div>
		</div>
	</div>
</template>

<script>
import LogoMask from '@/components/svg/LogoMask.vue'

export default {
	name: 'LoaderComponent',
	components: {
		LogoMask
	}
}
</script>