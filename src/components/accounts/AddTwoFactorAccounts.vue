<template>
	<form
		@submit.prevent="accountsStore.addTwoFactorAccounts(key)"
		class="add-2fa-accounts ml-modal"
	>
		<span
			@click="accountsStore.toggleShowAddAccounts2FA(false)"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Add accounts</div>
		<div class="add-2fa-accounts__img">
			<img
				v-if="!isMobile"
				src="@/assets/img/ui/2fa.png"
				alt=""
			>
			<img
				v-else
				src="@/assets/img/ui/2fa-mobile.png"
				alt=""
			>
		</div>
		<ul class="add-2fa-accounts-list">
			<li>1. <a :href="LINKS.roblox_security" class="underline violet" target="_blank">On the ROBLOX website, open Settings -> Security</a></li>
			<li>2. Enable "Authenticator App (Very Secure)" and when a QR code pops up on your screen, choose "Manual Entry" option.</li>
			<li>3. Copy your manual entry key and submit it below.</li>
		</ul>
		<div class="add-2fa-accounts-field">
			<label
				for="addTwoFactorAccountsKey"
				class="ml-ui__label"
			>2FA Key</label>
			<input
				v-model="key"
				id="addTwoFactorAccountsKey"
				class="ml-ui__input"
				type="text"
				placeholder="Enter your key here..."
				required
			>
		</div>
		<BtnLoader
			:btnId="'addAccounts2FABtn'"
			class="ml-btn"
		>
			<span>Submit</span>
		</BtnLoader>		
	</form>
</template>

<script>
import { ref } from 'vue'
import { useAccountsStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'
import { LINKS } from '@/enums'

import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'AddTwoFactorAccounts',
	components: {
		BtnLoader
	},
	setup() {
		const accountsStore = useAccountsStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const key = ref('')
		
		return {
			LINKS,
			accountsStore,
			isMobile,
			key		
		}
	}
}
</script>