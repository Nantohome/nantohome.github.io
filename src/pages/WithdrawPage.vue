<template>
	<div class="ml-right">
		<div
			v-if="withdrawStore.list.data !== null"
			class="withdraw tablepanel ml-block"
		>
			<div
				v-if="isMobile"
				class="mobile-title"
			>
				<div class="mobile-title__text">Withdraw</div>
			</div>
			<div class="tablepanel-list">
				<div class="tablepanel-subheader">
					<div class="tablepanel-search-box">
						<form
							@submit.prevent="withdrawStore.searchWallets(searchStr)"
							class="tablepanel__search ml-ui-inputbtn"
						>
							<input
								v-model="searchStr"
								class="ml-ui__input"
								type="text"
								placeholder="Search wallet..."
							>
							<button
								class="ml-ui-inputbtn__btn icon-search"
							></button>
						</form>
						<HelpBtn
							:link="LINKS.help"
							class="tablepanel-search-help"
						></HelpBtn>
					</div>
					<PagenatorBlock
						v-if="!isMobile"
						:total-pages="withdrawStore.list.meta.totalPages"
						:per-page="withdrawStore.list.meta.limit"
						:current-page="withdrawStore.list.meta.page"
						@pagechanged="(val) => withdrawStore.onPageChange(val)"
					></PagenatorBlock>
					<button
						v-if="!isMobile"
						@click="withdrawStore.toggleShowWithdrawModal(true)"
						class="tablepanel__btn ml-btn ml-btn_violet icon-withdraw"
					><span>Withdraw</span></button>
				</div>
				<div class="profile-mobile-box">
					<div class="add-scrollbar-x table-wrap">
						<transition name="table">
							<div
								v-if="!withdrawStore.list.animated"
								class="table table-withdraw"
							>
								<div class="table-head">
									<div
										@click="clickSort('id')"
										:class="{ 'js-active': withdrawStore.list.sortBy === 'id', 'js-decrease': withdrawStore.list.sortOrder && withdrawStore.list.sortBy === 'id' }"
										class="table-head-cell table-head-cell_id"
									>ID</div>
									<div
										@click="clickSort('wallet')"
										:class="{ 'js-active': withdrawStore.list.sortBy === 'wallet', 'js-decrease': withdrawStore.list.sortOrder && withdrawStore.list.sortBy === 'wallet' }"
										class="table-head-cell table-head-cell_wallet"
									>Wallet</div>
									<div
										@click="clickSort('method')"
										:class="{ 'js-active': withdrawStore.list.sortBy === 'method', 'js-decrease': withdrawStore.list.sortOrder && withdrawStore.list.sortBy === 'method' }"
										class="table-head-cell table-head-cell_method"
									>Method</div>
									<div
										@click="clickSort('amount')"
										:class="{ 'js-active': withdrawStore.list.sortBy === 'amount', 'js-decrease': withdrawStore.list.sortOrder && withdrawStore.list.sortBy === 'amount' }"
										class="table-head-cell table-head-cell_amount"
									>Amount</div>
									<div
										@click="clickSort('status')"
										:class="{ 'js-active': withdrawStore.list.sortBy === 'status', 'js-decrease': withdrawStore.list.sortOrder && withdrawStore.list.sortBy === 'status' }"
										class="table-head-cell table-head-cell_status"
									>Status</div>
									<div
										@click="clickSort('date')"
										:class="{ 'js-active': withdrawStore.list.sortBy === 'date', 'js-decrease': withdrawStore.list.sortOrder && withdrawStore.list.sortBy === 'date' }"
										class="table-head-cell table-head-cell_date"
									>Date</div>
								</div>
								<template
									v-if="withdrawStore.list.data.length > 0"
								>
									<div
										v-for="item in withdrawStore.list.data"
										:key="item.orderId"
										class="table-row"
									>
										<div class="table-cell table-cell_id">{{ `#${item.orderId}` }}</div>
										<div class="table-cell table-cell_wallet">
											<div class="table-cell-copy">
												<span class="table-cell-copy__val">{{ item.wallet }}</span>
												<IconCopypaste
													@click="withdrawStore.copyWallet(item.wallet)"
												></IconCopypaste>
											</div>
										</div>
										<div class="table-cell table-cell_method">{{ item.currency }}</div>
										<div class="table-cell table-cell_amount">$ {{ item.amount }}</div>
										<div
											:class="item.status"
											class="table-cell table-cell_status"
										>
											<div class="table-cell-status-box">
												<span>{{ item.status.replace(/_/g, ' ') }}</span>
												<a
													v-show="item.txUrl"
													:href="item.txUrl"
													target="_blank"
													class="table-cell-status-box__icon"
												>
													<IconLink
														class="icon-link"
													></IconLink>
												</a>
											</div>
										</div>
										<div
											v-html="localTime(item.createdAt)"
											class="table-cell table-cell_date"
										></div>
									</div>
								</template>
								<template
									v-else
								>
									<div class="table-row table-row_empty">
										<div class="table-cell tablepanel__empty">
											<span>You have not withdrawn funds yet.</span>
										</div>
										<div class="table-cell"></div>
										<div class="table-cell table-cell_spent">—</div>
										<div class="table-cell table-cell_price">—</div>
										<div class="table-cell table-cell_status">—</div>
										<div class="table-cell table-cell_date">—</div>
									</div>
								</template>
							</div>
						</transition>
					</div>
					<PagenatorBlock
						v-if="isMobile"
						:total-pages="withdrawStore.list.meta.totalPages"
						:per-page="withdrawStore.list.meta.limit"
						:current-page="withdrawStore.list.meta.page"
						:maxVisibleButtons="3"
						@pagechanged="(val) => withdrawStore.onPageChange(val)"
					></PagenatorBlock>
				</div>
			</div>
			<button
				v-if="isMobile"
				@click="withdrawStore.toggleShowWithdrawModal(true)"
				class="tablepanel__btn ml-btn ml-btn_violet icon-withdraw"
			><span>Withdraw</span></button>
		</div>
		<FooterMobile></FooterMobile>
		<transition name="fade" appear>
			<div
				v-if="withdrawStore.isWithdrawModalShow"
				@click.self="withdrawStore.toggleShowWithdrawModal(false)"
				class="ml-blur-bg"
			>
				<WithdrawModal></WithdrawModal>
			</div>
		</transition>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useWithdrawStore } from '@/stores'
import { mobileMatchMedia, formatLocalTime } from '@/utils/helpers'
import { LINKS } from '@/enums'

import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'
import FooterMobile from '@/components/FooterMobile.vue'
import HelpBtn from '@/components/ui/HelpBtn.vue'
import IconCopypaste from '@/components/svg/IconCopypaste.vue'
import IconLink from '@/components/svg/IconLink.vue'
import WithdrawModal from '@/components/withdraw/WithdrawModal.vue'

export default {
	name: 'WithdrawPage',
	components: {
		PagenatorBlock,
		FooterMobile,
		HelpBtn,
		IconCopypaste,
		IconLink,
		WithdrawModal
	},
	setup() {
		useHead({
			title: 'RBXCRATE | Withdraw',
			meta: [
				{
					name: 'description',
					content: 'Website description',
				}
			]
		})

		const withdrawStore = useWithdrawStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const searchStr = ref('')

		const localTime = (timestamp) => {
			return formatLocalTime(timestamp)
		}

		const clickSort = (el) => {
			if(withdrawStore.list.sortBy === el) {
				withdrawStore.list.sortOrder = !withdrawStore.list.sortOrder
			} else {
				withdrawStore.list.sortOrder = false
				withdrawStore.list.sortBy = el
			}

			withdrawStore.getData()
		}

		
		withdrawStore.$reset()
		withdrawStore.getFee()
		withdrawStore.getData()


		return {
			withdrawStore,
			isMobile,
			LINKS,
			localTime,

			searchStr,
			clickSort
		}
	}
}
</script>