<template>
	<RegLayout
		:class="contentClass"
		:goBackLink="{
			value: false,
			pathName: 'register',
			text: 'Go Back'
		}"
	>
		<div class="register-discord-linking-page">
			<div class="register-discord-linking__title rl__title">Link your <span class="violet">Discord</span> account</div>
			<button
				@click="regStore.linkingDiscord()"
				class="register-discord-linking__btn gradient-btn gradient-btn_discord"
			><span>Login with Discord</span></button>
			<div
				v-if="regStore.discord.error"
				class="register-discord-linking__error"
			>Something went wrong, try again later!</div>
		</div>
	</RegLayout>
</template>

<script>
import { useHead } from '@unhead/vue'
import { useRegStore } from '@/stores'

import RegLayout from '@/layouts/RegLayout.vue'


export default {
	name: 'RegisterDiscordLinkingPage',
	components: { RegLayout },
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
		const contentClass = 'rl-register-discord-linking'

		regStore.setDiscordUser()
		
		return {
			regStore,
			contentClass			
		}
	}
}
</script>