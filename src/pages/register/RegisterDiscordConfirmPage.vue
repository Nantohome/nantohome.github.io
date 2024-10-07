<template>
	<RegLayout
		:class="contentClass"
		:goBackLink="{
			value: false,
			pathName: 'register',
			text: 'Go Back'
		}"
	>
		<div class="register-discord-confirm-page">
			<div class="register-discord-confirm__title rl__title">Is this really <span class="violet">your</span> account?</div>
			<div class="register-discord-confirm-box">
				<div class="register-discord-confirm-label-discord"></div>
				<div class="register-discord-confirm-label-user">
					<img
						v-if="regStore.discord.user.avatar"
						:src="`https://cdn.discordapp.com/avatars/${regStore.discord.user.id}/${regStore.discord.user.avatar}`"
						class="register-discord-confirm-label__img"
						alt=""
					>
					<img
						v-else
						src="@/assets/img/ui/discord-avatar.png"
						class="register-discord-confirm-label__img"
						alt=""
					>
					<span class="register-discord-confirm-label__name">{{ regStore.discord.user.username }}</span>
				</div>
			</div>
			<button
				@click="$router.push({ name: 'register-info' })"
				class="register-discord-confirm__btn-yes gradient-btn"
			><span>Yeah, it's mine</span></button>
			<button
				@click="$router.push({ name: 'linking-discord' })"
				class="register-discord-confirm__btn-no btn"
			><span>No, use another</span></button>
		</div>
	</RegLayout>
</template>

<script>
import { useHead } from '@unhead/vue'
import { useRegStore } from '@/stores'

import RegLayout from '@/layouts/RegLayout.vue'

export default {
	name: 'RegisterDiscordConfirmPage',
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
		const contentClass = 'rl-register-discord-confirm'

		return {
			regStore,
			contentClass
		}
	}
}
</script>