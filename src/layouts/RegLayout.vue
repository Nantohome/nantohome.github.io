<template>
	<div
		:class="randomImgClass"
		class="wrapper"
	>
		<div class="rl">
			<header class="rl-header">
				<a :href="$router.resolve({ name: 'dashboard' }).href" class="rl-header__logo gradient-logo"></a>
				<a
					v-if="goBackLink.value"
					href="javascript:history.back()"
					class="rl-header__back gradient-link"
					data-text="Go Back"
				>Go Back</a>
				<a
					v-else
					:href="$router.resolve({ name: goBackLink.pathName }).href"
					:data-text="goBackLink.text"
					class="rl-header__back gradient-link"
				>{{ goBackLink.text }}</a>
			</header>
			<section class="rl-body">
				<div class="rl-body-imgwrap">
					<div class="rl-body__imgbox">
						<div class="rl-body__img"></div>
					</div>
				</div>
				<div class="rl-body-content">
					<div class="rl-body-content-wrap">
						<slot></slot>
					</div>
				</div>
			</section>
		</div>
		<ApiMessage></ApiMessage>
	</div>
</template>

<script>
import ApiMessage from '@/components/ui/ApiMessage.vue'

export default {
	name: 'RegLayout',
	props: {
		goBackLink: Object
	},
	components: {
		ApiMessage
	},
	setup() {
		const 	randomClass = Math.floor(Math.random() * 6 + 1)
		const	randomImgClass = `random-img_${randomClass}`


		return {
			randomImgClass
		}
	}
}
</script>