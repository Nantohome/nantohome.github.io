<template>
	<div class="ml-right">
		<div
			v-if="marketStore.merchantSelect.list"
			class="market ml-block"
		>
			<div class="market-box">
				<a
					:href="LINKS.faq"
					target="_blank"
					class="market-box__faq"
				>FAQ<IconQuestion></IconQuestion>
				</a>
				<form
					@submit.prevent="marketStore.createOrder(username, amount, placeId)"
					class="market-form"
				>
					<div class="market__title">Quick Buy</div>
					<SelectBoxMerch
						:selectObj="marketStore.merchantSelect"
						@change="changeMerchantSelect"
						@create="marketStore.toggleShowProject(true)"
						class="market-select-merch"
					></SelectBoxMerch>
					<SelectBoxOneItem
						:selectObj="marketStore.typeSelect"
						@change="changeTypeSelect"
					></SelectBoxOneItem>
					<div class="market-field">
						<label
							for="marketUsername"
							class="ml-ui__label"
						>Roblox Username</label>
						<input
							v-model="marketStore.username"
							id="marketUsername"
							class="ml-ui__input"
							type="text"
							placeholder="example"
							required
						>
					</div>
					<div class="market-field">
						<label
							for="marketPlace"
							class="ml-ui__label"
						>Place ID</label>
						<input
							v-model="marketStore.placeId"
							id="marketPlace"
							class="ml-ui__input"
							type="text"
							placeholder="exampleID"
							required
						>
					</div>
					<div class="market-field">
						<label
							for="marketAmount"
							class="ml-ui__label"
						>Robux Amount</label>
						<input
							v-model="marketStore.amount"
							id="marketAmount"
							class="ml-ui__input"
							type="text"
							placeholder="999"
							required
						>
					</div>
					<label class="market-preorder">
						<input
							v-model="marketStore.isPreOrder"
							id="marketPreOrder"
							class="market-preorder__input"
							type="checkbox"
						>
						<span class="market-preorder__text">It's a preorder</span>
					</label>
					<BtnLoader
						:btnId="'createOrderBtn'"
						:disabled="!marketStore.merchant || marketStore.paused.value"
						class="market__btn ml-btn"
					>
						<span>Submit</span>
					</BtnLoader>
				</form>
			</div>
		</div>
		<FooterMobile></FooterMobile>
		<transition name="fade" appear>
			<div
				v-if="marketStore.isProjectShow"
				@click.self="marketStore.toggleShowProject(false)"
				class="merch-project-bg ml-blur-bg"
			>
				<MerchProject
					@create-merch="marketStore.createMerch"
					@close-project="marketStore.toggleShowProject(false)"
				></MerchProject>
			</div>
		</transition>
	</div>
</template>

<script>
import { useHead } from '@unhead/vue'
import { useMarketStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'
import { LINKS } from '@/enums'

import FooterMobile from '@/components/FooterMobile.vue'
import MerchProject from '@/components/merchants/blocks/MerchProject.vue'
import IconQuestion from '@/components/svg/IconQuestion.vue'
import SelectBoxMerch from '@/components/ui/SelectBoxMerch.vue'
import SelectBoxOneItem from '@/components/ui/SelectBoxOneItem.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'MarketPage',
	components: {
		FooterMobile,
		MerchProject,
		IconQuestion,
		SelectBoxMerch,
		SelectBoxOneItem,
		BtnLoader
	},
	setup() {
		useHead({
			title: 'RBXCRATE | Market',
			meta: [
				{
					name: 'description',
					content: 'Website description',
				}
			]
		})

		const marketStore = useMarketStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		
		const changeMerchantSelect = (val) => {
			marketStore.changeMerchantSelect(val)
		}

		const changeTypeSelect = (val) => {
			marketStore.changeTypeSelect(val)
		}


		marketStore.getData()
		
		
		return {
			marketStore,
			isMobile,
			LINKS,

			changeMerchantSelect,
			changeTypeSelect
		}
	}
}
</script>