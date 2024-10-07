<template>
	<form
		@submit.prevent="topupStore.pay(amount)"
		class="topup ml-modal"
	>
		<span
			@click="topupStore.toggleShow(false)"
			class="topup__close ml__close icon-close"
		></span>
		<div class="topup__title ml__title">Top-up</div>
		<SelectBox
			:selectObj="topupStore.selectObj"
			@change-val="topupStore.changeSelectObj"
			class="topup-currency"
		>
			<template v-slot:begin="slotProps">
				<span
					:class="slotProps.value"
					class="topup-currency__icon select-item__begin"
				></span>
			</template>
			<template v-slot:end="slotProps">
				<span class="topup-currency__tax select-item__end">{{ slotProps.value }}</span>
			</template>
		</SelectBox>
		<div class="topup-row">
			<div class="topup-amount topup-item">
				<label
					for="topupAmount"
					class="ml-ui__label"
				>Amount (USD)</label>
				<input
					v-model="amount"
					id="topupAmount"
					class="topup-amount__input ml-ui__input"
					type="number"
					step="any"
					min="0"
					max="999999999"
					lang="en-US"
					placeholder="0"
					required
				>
			</div>
			<div class="topup-total topup-item">
				<label
					for="topupTotal"
					class="ml-ui__label"
				>Total (USD)</label>
				<div class="ui-input-wrap">
					<input
						:value="total"
						id="topupTotal"
						class="topup-total__input ml-ui__input"
						type="text"
						lang="en-US"
						placeholder="0"
						disabled
					>
					<span class="topup-total__label ui-input-wrap__label">{{ topupStore.fee.str }}</span>
				</div>
			</div>
		</div>
		<BtnLoader
			:btnId="'topupBtn'"
			class="topup__btn ml-btn"
		>
			<span>Top-up</span>
		</BtnLoader>
	</form>
</template>

<script>
import { ref, computed } from 'vue'
import { useTopupStore } from '@/stores'

import SelectBox from '@/components/ui/SelectBox.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'TopUp',
	components: {
		SelectBox,
		BtnLoader
	},
	setup() {
		const topupStore = useTopupStore()

		const amount = ref(null)

		const total = computed(() => {
			return (Number(amount.value) * (1 + topupStore.fee.number)).toFixed(2)
		})
		

		topupStore.getInitFee()


		return {
			topupStore,
			amount,
			total
		}
	}
}
</script>