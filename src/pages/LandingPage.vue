<template>
	<div class="wrapper">
		<header class="l-header">
			<div class="l-header-wrap inner">
				<a :href="$router.resolve({ name: 'dashboard' }).href" class="l-header__logo gradient-transparent-logo"></a>
				<a :href="$router.resolve({ name: 'login' }).href" class="l-header__singin gradient-link" data-text="Sign In">Sign In</a>
			</div>
		</header>
		<section class="screen1">
			<div class="screen1__text"></div>
			<div class="screen1-imgwrap">
				<div class="screen1__gamepad"></div>
				<div class="screen1__robux-down"></div>
				<div class="screen1__robux-up"></div>
			</div>
			<div class="screen1-service">
				<div class="screen1-service__title inner">Your best robux panel</div>
				<div class="screen1-service-list">
					<div class="screen1-service-list__btn empty-btn icon-star">
						<span class="empty-btn-text">Buying robux</span>
					</div>
					<div class="screen1-service-list__btn empty-btn icon-lightning">
						<span class="empty-btn-text">Selling robux</span>
					</div>
					<div class="screen1-service-list__btn empty-btn icon-rewind">
						<span class="empty-btn-text">Fast payouts</span>
					</div>
					<div class="screen1-service-list__btn empty-btn icon-shield">
						<span class="empty-btn-text">Reliable</span>
					</div>
				</div>
			</div>
		</section>
		<section class="labels">
			<div class="labels-grid inner">
				<div class="labels-grid-title">
					<div class="labels-grid-title__text">Do you want to<h1>sell robux?</h1></div>
					<div class="labels-tag labels-tag_big">About us</div>
				</div>
				<div class="labels-grid-col">
					<div class="labels-grid-item label-offers">
						<div class="labels-tag">Offers</div>
						<div class="label-offers__text">We offer <span class="gradient-underline">best</span> <br>Rates!</div>
						<img class="label-offers__img" src="@/assets/img/landing/label-offers-img.svg" alt="4.25$ 1KR$">
					</div>
				</div>
				<div class="labels-grid-col">
					<div class="labels-grid-item label-service">
						<div class="labels-tag">Service</div>
						<img class="label-service__img" src="@/assets/img/landing/label-service-img.svg" alt="Quick payouts">
					</div>
					<div class="labels-grid-item label-reliable">
						<div class="labels-tag">Reliable</div>
						<div class="label-reliable__text">Trusted</div>
						<div class="label-reliable__desc">Our service is reliable and verified by users. We have been working since 2023.</div>
					</div>
				</div>
				<div class="labels-grid-col">
					<div class="labels-grid-item label-process">
						<div class="labels-tag">Process</div>
						<div class="labels-process__text">We selling <br>quickly <span class="gradient-mask">&</span> a lot</div>
						<div class="labels-process__desc">Every day our users make hundreds of transactions through our service</div>
					</div>
					<div class="labels-grid-item label-stats">
						<div class="labels-tag">Stats</div>
						<div class="labels-stats__text">For more than</div>
						<img class="labels-stats__img" src="@/assets/img/landing/label-stats-img.svg" alt="1.75M+">
						<div class="labels-stats__desc">Robux has made transactions in the <br>last week</div>
					</div>
				</div>
			</div>
			<div class="labels-flex inner">
				<div class="labels-flex-item labels-flex-item_01">
					<div class="labels-flex-item__text">Fill <a :href="$router.resolve({ name: 'register' }).href">register</a> <br>form and wait <br>for approval</div>
					<div class="labels-flex-item__icon"></div>
					<div class="labels-flex-item__desc">Become a member of the best <br>robux service</div>
					<div class="labels-flex-item__spacer"></div>
				</div>
				<div class="labels-flex-item labels-flex-item_02">
					<div class="labels-flex-item__text"><div class="gradient-text">Add</div> your <br>account to <br>the site and <br>wait till <br><div class="gradient-text icon-robux">robux</div> sells</div>
					<div class="labels-flex-item__spacer"></div>
				</div>
				<div class="labels-flex-item labels-flex-item_03">
					<div class="labels-flex-item__text">Create a <div class="labels-flex-item__text-box"><div class="gradient-text">withdrawal <br>request</div><span> using </span></div>a method <br>comfortable <br>for you</div>
					<div class="labels-flex-item__spacer"></div>
				</div>
			</div>
		</section>
		<section class="trouble">
			<div class="trouble-box">
				<div class="trouble-wrapper inner">
					<div class="trouble__title">Having <span class="black">trouble</span> <br>with selling <br>robux?</div>
					<div class="trouble-footer">
						<div class="trouble__desc">Our supports will definitely help you with them <br>on the server in the Discord</div>
						<div class="trouble-btnwrap">
							<a :href="LINKS.instructions" class="trouble__btn icon-info"><IconInfo></IconInfo>Go to the&nbsp;<span class="semibold">instruction</span></a>
							<a :href="LINKS.discord" class="trouble__btn icon-discord"><IconDiscord></IconDiscord><span class="semibold">Join</span>&nbsp;our Discord </a>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="marquee">
			<template
				v-for="box in 3"
				:key="box"
			>
				<div class="marquee-box">
					<template
						v-for="link in 4"
						:key="link"
					>
						<a :href="$router.resolve({ name: 'register' }).href" class="marquee-item">
							<LinkRegister></LinkRegister>
						</a>
					</template>
				</div>
			</template>
		</section>
		<FooterComponent></FooterComponent>
		<transition name="fade">
			<div
				v-show="windowTop > 900"
				@click="scrollToTop"
				class="top-scroll"
			></div>
		</transition>
	</div>
</template>


<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useHead } from '@unhead/vue'
import { LINKS } from '@/enums'

import FooterComponent from '@/components/Footer.vue'
import IconDiscord from '@/components/svg/IconDiscord.vue'
import IconInfo from '@/components/svg/IconInfo.vue'
import LinkRegister from '@/components/svg/LinkRegister.vue'

export default {
	name: 'LandingPage',
	components: {
		FooterComponent,
		IconDiscord,
		IconInfo,
		LinkRegister	
	},
	setup() {
		useHead({
			title: 'RBXCRATE | Sell robux with us',
			meta: [
				{
					name: 'description',
					content: 'The best robux panel to sell and buy robux for best prices. Reliable, Fast.',
				},
				{
					name: 'keywords',
					content: 'sell robux, robux panel, ship robux'
				}
			],
			htmlAttrs: {
				class: 'landing'
			}
		})

		const windowTop = ref(null)

		
		const onScroll = () => {
			windowTop.value = window.top.scrollY
		}

		const scrollToTop = () => {
			window.scroll(0, 0)
		}

		
		onMounted(() => {
			window.addEventListener("scroll", onScroll)
		})
		
		onUnmounted(() => {
			window.removeEventListener("scroll", onScroll)
		})

		
		return {
			LINKS,
			windowTop,
			scrollToTop
		}
	}
}
</script>