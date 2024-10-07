<template>
	<footer class="footer">
		<div class="footer-wrap inner">
			<div class="footer-box">
				<div class="footer-col">
					<a :href="$router.resolve({ name: 'dashboard' }).href" class="footer__logo"></a>
					<div class="footer-logo__text">The best service for <br>selling & buying robux</div>
				</div>
				<div class="footer-col">
					<div class="footer-col__title">Navigation</div>
					<a :href="$router.resolve({ name: 'policy' }).href" class="footer__link">Privacy Policy</a>
					<a :href="$router.resolve({ name: 'agreement' }).href" class="footer__link">User Agreement</a>
					<a :href="$router.resolve({ name: 'register' }).href" class="footer__link">REGISTER</a>
				</div>
				<div class="footer-col">
					<div class="footer-col__title">Payouts</div>
					<span class="footer__link footer__link_icon icon-trc20">TRC20</span>
					<span class="footer__link footer__link_icon icon-tron">TRON</span>
					<span class="footer__link footer__link_icon icon-litecoin">LITECOIN</span>
				</div>
				<div class="footer-col">
					<a :href="LINKS.discord" class="footer__btn icon-discord"><IconDiscord></IconDiscord><span class="semibold">Join</span>&nbsp;our Discord<span class="desktoponly">&nbsp;server for help</span></a>
					<a :href="LINKS.telegram" class="footer__btn icon-telegram"><IconTelegram></IconTelegram><span class="semibold">Join</span>&nbsp;our Telegram<span class="desktoponly">&nbsp;for updates</span></a>
					<div class="footer-social-desc">Our social media channels will keep you up to <br>date with <span class="semibold">updates</span> as well as <span class="semibold">prompt assistance</span></div>
				</div>
			</div>
			<div class="footer-bottom">RBXCRATE 2023 © All rights reserved</div>
		</div>
	</footer>
</template>

<script>
import { LINKS } from '@/enums'

import IconDiscord from '@/components/svg/IconDiscord.vue'
import IconTelegram from '@/components/svg/IconTelegram.vue'


export default {
	name: 'FooterComponent',
	components: {
		IconDiscord,
		IconTelegram		
	},
	setup() {
		return {
			LINKS
		}
	}
}
</script>