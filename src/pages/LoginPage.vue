<template>
	<RegLayout
		:class="contentClass"
		:goBackLink="{
			value: false,
			pathName: 'dashboard',
			text: 'Home'
		}"
	>
		<div class="login-page">
			<div class="login-page__title rl__title">Login</div>
			<form
				@submit.prevent="authStore.authorize(login, password)"
				class="login-page-form"
			>
				<div class="rl-field">
					<label
						:class="{ 'error': authStore.login.error }"
						for="loginPageLogin"
						class="ui__label"
					>{{ authStore.login.label }}</label>
					<input
						v-model="login"
						id="loginPageLogin"
						class="ui__input"
						type="text"
						placeholder="you@company.com"
						autocomplete="username"
						required
					>
				</div>
				<div class="rl-field">
					<label
						:class="{ 'error': authStore.password.error }"
						for="loginPagePassword"
						class="ui__label"
					>{{ authStore.password.label }}</label>
					<input
						v-model="password"
						id="loginPagePassword"
						class="ui__input"
						type="password"
						placeholder="Write your password here"
						autocomplete="new-password"
						required
					>
				</div>
				<div class="login-page__policy">Our friendly <a :href="$router.resolve({ name: 'policy' }).href" class="underline">privacy policy</a>.</div>
				<BtnLoader
					:btnId="'loginBtn'"
					class="login-page__btn gradient-btn"
				>
					<span>Login</span>
				</BtnLoader>
			</form>
			<div class="login-page-desc">Don’t have account?&nbsp;<a :href="$router.resolve({ name: 'register' }).href" class="underline">Register Now!</a><span class="login-page-desc__divider"></span><a :href="$router.resolve({ name: 'recovery' }).href" class="underline">Forgot Password?</a></div>
		</div>
	</RegLayout>
</template>


<script>
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useAuthStore } from '@/stores'

import RegLayout from '@/layouts/RegLayout.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'


export default {
	name: 'LoginPage',
	components: {
		RegLayout,
		BtnLoader
	},
	setup() {
		useHead({
			title: 'RBXCRATE | Login',
			meta: [
				{
					name: 'description',
					content: 'Website description',
				}
			]
		})

		const authStore = useAuthStore()
		const contentClass = 'rl-login'
		const login = ref('')
		const password = ref('')


		return {
			contentClass,
			authStore,
			login,
			password
		}
	}
}
</script>