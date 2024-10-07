<template>
	<div class="wrapper rl-register-end">
		<div class="rl">
			<header class="rl-header">
				<a :href="$router.resolve({ name: 'dashboard' }).href" class="rl-header__logo gradient-logo"></a>
				<a
					:href="$router.resolve({ name: 'dashboard' }).href"
					class="rl-header__back gradient-link"
					data-text="Home"
				>Home</a>
			</header>
			<section class="rl-body">
				<div class="rl-body-imgwrap">
					<div class="rl-body__imgbox">
						<div class="rl-body__img"></div>
					</div>
				</div>
				<div class="rl-body-content">
					<div class="rl-body-content-wrap">
						<div class="register-end-page">
							<div class="register-end-page__title"><span class="violet">Thank you</span> for registering, create a ticket on the our <span class="violet">Discord</span> server for verification and open dms</div>
							<div class="register-end-page-btnwrap">
								<a :href="LINKS.discord" class="register-end-page__btn gradient-btn gradient-btn_discord"><span>Join Discord Server</span></a>
								<a :href="$router.resolve({ name: 'login' }).href" class="register-end-page__btn btn"><span>Login</span></a>
							</div>
							<div class="register-end-page-policy">Our friendly <a :href="$router.resolve({ name: 'policy' }).href" class="register-end-page-policy__link underline">privacy policy</a>.</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import { useHead } from '@unhead/vue'
import { LINKS } from '@/enums'
import { useRegStore } from '@/stores'

export default {
	name: 'RegisterEndPage',
	setup() {
		useHead({
			title: 'RBXCRATE | Registration',
			meta: [
				{
					name: 'description',
					content: 'Website description',
				}
			]
		})

		
		const regStore = useRegStore()
		regStore.reset()
		
		
		return { LINKS }
	}
}
</script>