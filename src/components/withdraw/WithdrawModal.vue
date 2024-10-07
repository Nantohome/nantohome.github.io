<template>
	<form
		@submit.prevent="withdrawStore.addWithdraw(wallet, amount)"
		class="withdraw-modal ml-modal"
	>
		<span
			@click="withdrawStore.toggleShowWithdrawModal(false)"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Withdraw</div>
		<div class="withdraw-modal-wallet">
			<label for="withdrawModalWallet" class="ml-ui__label">Withdrawal wallet</label>
			<input
				v-model="wallet"
				id="withdrawModalWallet"
				class="ml-ui__input"
				type="text"
				placeholder="Enter wallet here..."
				required
			>
		</div>
		<div class="withdraw-currency">
			<label
				:class="{ 'js-checked': withdrawStore.currency === 'usdt' }"
				class="withdraw-currency-label"
			>
				<div class="withdraw-currency-label-box">
					<span class="withdraw-currency-label__icon icon-trc"></span>
					<span
						v-if="isMobile"
						class="withdraw-currency-label__title"
					>TRC20</span>
					<span
						v-else
						class="withdraw-currency-label__title"
					>USDT TRC20</span>
					<span class="withdraw-currency-label__tax">{{ `— ${withdrawStore.fee.usdt.fixed}$` }}</span>
				</div>
				<input
					v-model="withdrawStore.currency"
					value="usdt"
					class="ml-ui__radio"
					type="radio"
				>
			</label>
			<label
				:class="{ 'js-checked': withdrawStore.currency === 'ltc' }"
				class="withdraw-currency-label"
			>
				<div class="withdraw-currency-label-box">
					<span class="withdraw-currency-label__icon icon-ltc"></span>
					<span class="withdraw-currency-label__title">LTC</span>
					<span class="withdraw-currency-label__tax">{{ `— ${withdrawStore.fee.ltc.fixed}$` }}</span>
				</div>
				<input
					v-model="withdrawStore.currency"
					value="ltc"
					class="ml-ui__radio"
					type="radio"
				>
			</label>
		</div>
		<div class="withdraw-modal-row">
			<div class="withdraw-modal-amount withdraw-modal-item">
				<label
					for="withdrawModalAmount"
					class="ml-ui__label"
				>Amount</label>
				<input
					v-model="amount"
					id="withdrawModalAmount"
					class="ml-ui__input"
					type="number"
					step="any"
					min="0"
					max="999999999"
					lang="en-US"
					placeholder="0"
					required
				>
			</div>
			<div class="withdraw-modal-total withdraw-modal-item">
				<label
					for="withdrawModalTotal"
					class="ml-ui__label"
				>Total</label>
				<div class="ui-input-wrap">
					<input
						:value="total"
						id="withdrawModalTotal"
						class="ml-ui__input"
						type="text"
						placeholder="0"
						disabled
					>
					<span class="withdraw-modal-total__label ui-input-wrap__label">{{ getFeeStr }}</span>
				</div>
			</div>
		</div>
		<BtnLoader
			:btnId="'addWithdrawBtn'"
			class="withdraw__btn ml-btn"
		>
			<span>Submit</span>
		</BtnLoader>
	</form>
</template>

<script>
import { ref, computed } from 'vue'
import { useWithdrawStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'WithdrawModal',
	components: {
		BtnLoader
	},
	setup() {
		const withdrawStore = useWithdrawStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const wallet = ref('')
		const amount = ref(null)
		

		const total = computed(() => {
			return (Number(amount.value) * (1 + withdrawStore.fee[withdrawStore.currency].percent / 100) + withdrawStore.fee[withdrawStore.currency].fixed).toFixed(2)
		})

		const getFeeStr = computed(() => {
			if(withdrawStore.fee[withdrawStore.currency].percent === 0 ) {
				return `+ ${withdrawStore.fee[withdrawStore.currency].fixed}$`
			} else {
				return `${withdrawStore.fee[withdrawStore.currency].percent}% + ${withdrawStore.fee[withdrawStore.currency].fixed}$`
			}
			
		})
		

		return {
			withdrawStore,
			isMobile,
			
			getFeeStr,
			wallet,
			amount,
			total
		}
	}
}
</script>