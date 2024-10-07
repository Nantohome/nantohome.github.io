<template>
	<form
		@submit.prevent="accountsStore.sendAccounts(cookies)"
		class="add-accounts ml-modal"
	>
		<span
			@click="accountsStore.toggleShowAddAccounts(false)"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Add accounts</div>
		<div class="add-accounts-field">
			<label
				for="addAccountsCookies"
				class="ml-ui__label"
			>Cookies type each on a new line</label>
			<textarea
				v-model="cookies"
				id="addAccountsCookies"
				class="ml-ui__input ml-ui__input_textarea"
				type="text"
				placeholder="Enter cookies here..."
				required
			></textarea>
		</div>
		<SelectBox
			:selectObj="accountsStore.priceSelect"
			@change-val="(val) => accountsStore.addAccounts.price = val"
			:multiwords="true"
			class="add-accounts-prices"
		>
			<template v-slot:begin="slotProps">
				<span class="select-item__begin">{{ slotProps.value }}&nbsp;</span>
			</template>
			<template v-slot:end="slotProps">
				<span class="select-item__end">&nbsp;{{ slotProps.value }}</span>
			</template>
		</SelectBox>
		<div>
			<label class="add-accounts-my-proxy">
				<input
					v-model="accountsStore.addAccounts.myProxy"
					id="addAccountsMyProxy"
					type="checkbox"
				>
				<span>Use my proxy</span>
			</label>
			<transition name="fade" appear>
				<div
					v-if="accountsStore.addAccounts.myProxy"
					class="add-accounts-proxy-box"
				>
					<router-link
						v-if="accountsStore.proxySelect.list.length === 0"
						:to="{ name: 'proxies' }"
						class="ml-btn ml-btn_violet icon-plus"
					>Add proxies</router-link>
					<SelectBoxOneItem
						v-else
						:selectObj="accountsStore.proxySelect"
						@change="(val) => accountsStore.addAccounts.proxy = val"
						:emptyText="'No proxies'"
						class="add-accounts-proxy-select"
					></SelectBoxOneItem>
				</div>
			</transition>
		</div>
		<BtnLoader
			:btnId="'addAccountsBtn'"
			class="ml-btn"
		>
			<span>Submit</span>
		</BtnLoader>		
	</form>
</template>

<script>
import { ref } from 'vue'
import { useAccountsStore } from '@/stores'

import SelectBox from '@/components/ui/SelectBox.vue'
import SelectBoxOneItem from '@/components/ui/SelectBoxOneItem.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'AddAccounts',
	components: {
		SelectBox,
		SelectBoxOneItem,
		BtnLoader
	},
	setup() {
		const accountsStore = useAccountsStore()

		const cookies = ref('')

		return {
			accountsStore,
			cookies
		}
	}
}
</script>