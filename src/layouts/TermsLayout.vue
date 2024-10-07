<template>
	<div class="wrapper">
		<div class="tl">
			<div class="tl-wrap inner">
				<div class="tl-header">
					<a href="javascript:history.back()" class="tl__back icon-back">Go Back</a>
				</div>
				<slot></slot>
				<div class="tl-footer">
					<a href="javascript:history.back()" class="tl__back icon-back">Go Back</a>
				</div>
			</div>
		</div>
		<FooterComponent></FooterComponent>
	</div>
</template>

<script>
import FooterComponent from '@/components/Footer.vue'

export default {
	name: 'TermsLayout',
	components: { FooterComponent }
}
</script>