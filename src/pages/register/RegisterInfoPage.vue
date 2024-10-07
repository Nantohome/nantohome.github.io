<template>
	<RegLayout
		:class="contentClass"
		:goBackLink="{
			value: false,
			pathName: 'register',
			text: 'Go Back'
		}"
	>
		<div class="register-info-page">
			<div class="register-info-page__title rl__title">Register</div>
			<form
				@submit.prevent="regStore.registrate(login, email, password1, password2, invite)"
				class="register-info-page-form"
			>
				<div class="rl-field">
					<label
						:class="{ 'error': regStore.login.error }"
						for="loginRegisterInfoPage"
						class="ui__label"
					>{{ regStore.login.label }}</label>
					<input
						v-model="login"
						id="loginRegisterInfoPage"
						class="ui__input"
						type="text"
						placeholder="Minimum 3 characters"
						autocomplete="username"
						required
					>
				</div>
				<div class="rl-field">
					<label
						for="emailRegisterInfoPage"
						class="ui__label"
					>Email*</label>
					<input
						v-model="email"
						id="emailRegisterInfoPage"
						class="ui__input"
						type="email"
						placeholder="you@company.com"
						required
					>
				</div>
				<div class="rl-field">
					<label
						:class="{ 'error': regStore.password1.error }"
						for="passRegisterInfoPage"
						class="ui__label"
					>{{ regStore.password1.label }}</label>
					<input
						v-model="password1"
						id="passRegisterInfoPage"
						class="ui__input"
						type="password"
						placeholder="Write your password here"
						autocomplete="new-password"
						required
					>
				</div>
				<div class="rl-field">
					<label
						:class="{ 'error': regStore.password2.error }"
						for="repeatPassRegisterInfoPage"
						class="ui__label"
					>{{ regStore.password2.label }}</label>
					<input
						v-model="password2"
						id="repeatPassRegisterInfoPage"
						class="ui__input"
						type="password"
						placeholder="Repeat your password here"
						autocomplete="new-password"
						required
					>
				</div>
				<div class="rl-field rl-field__checkbox">
					<input
						v-model="haveInvite"
						id="haveInvite"
						type="checkbox"
					>
					<label
						for="haveInvite"
						class="ui__label"
					>I have an invite code</label>
				</div>
				<transition name="fade">
					<div
						v-if="haveInvite"
						class="rl-field"
					>
						<label
							for="inviteRegisterInfoPage"
							class="ui__label"
						>Invite code (optional)</label>
						<input
							v-model="regStore.invite.code"
							id="inviteRegisterInfoPage"
							class="ui__input"
							type="text"
							placeholder="Your code here"
						>
					</div>
				</transition>
				<div class="register-info-page__policy">Our friendly <a :href="$router.resolve({ name: 'policy' }).href" class="underline">privacy policy</a>.</div>
				<BtnLoader
					:btnId="'regBtn'"
					class="register-info-page__btn btn"
				>
					<span>Register</span>
				</BtnLoader>
			</form>
			<div class="register-info-page-desc">Already have an account?&nbsp;<a :href="$router.resolve({ name: 'login' }).href" class="underline">Login!</a></div>
		</div>
	</RegLayout>
</template>

<script>
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useRegStore } from '@/stores'

import RegLayout from '@/layouts/RegLayout.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'


export default {
	name: 'RegisterInfoPage',
	components: {
		RegLayout,
		BtnLoader
	},
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
		const contentClass = 'rl-register-info'
		
		const	login = ref(''),
				email = ref(''),
				password1 = ref(''),
				password2 = ref(''),
				invite = ref(''),
				haveInvite = ref(false)


		const checkInvite = async() => {
			const storageInvite = await regStore.invite.code
			
			if(storageInvite) {
				invite.value = storageInvite
				haveInvite.value = true
			}
		}
		

		checkInvite()
		

		return {
			regStore,
			contentClass,
			login,
			email,
			password1,
			password2,
			invite,
			haveInvite
		}
	}
}
</script>