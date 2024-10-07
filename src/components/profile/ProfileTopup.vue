<template>
	<div class="profile-topup">
		<div class="profile-subheader">
			<div class="profile-toggle-btns">
				<button
					@click="profileStore.toggleOrderHistoryShow(true)"
					class="ml-btn ml-btn_small"
				>Order History</button>
				<button
					class="ml-btn ml-btn_small ml-btn_violet pointer-events-none"
				>Top-up History</button>
			</div>
			<div class="profile-subheader-box">
				<form
					@submit.prevent="profileStore.searchUserPayments(searchStr)"
					class="profile__search ml-ui-inputbtn"
				>
					<input
						v-model="searchStr"
						class="ml-ui__input"
						type="text"
						placeholder="Search payments ID..."
					>
					<button
						class="ml-ui-inputbtn__btn icon-search"
					></button>
				</form>
				<PagenatorBlock
					v-if="!isMobile"
					:total-pages="profileStore.payments.meta.totalPages"
					:per-page="profileStore.payments.meta.limit"
					:current-page="profileStore.payments.meta.page"
					@pagechanged="(val) => profileStore.paymentsOnPageChange(val)"
				></PagenatorBlock>
			</div>
		</div>
		<div class="profile-mobile-box">
			<div class="add-scrollbar-x table-wrap">
				<transition name="table">
					<div
						v-if="!profileStore.payments.animated"
						class="table table-topup"
					>
						<div class="table-head">
							<div
								@click="clickSort('id')"
								:class="{ 'js-active': profileStore.payments.sortBy === 'id', 'js-decrease': profileStore.payments.sortOrder && profileStore.payments.sortBy === 'id' }"
								class="table-head-cell"
							>ID</div>
							<div
								@click="clickSort('status')"
								:class="{ 'js-active': profileStore.payments.sortBy === 'status', 'js-decrease': profileStore.payments.sortOrder && profileStore.payments.sortBy === 'status' }"
								class="table-head-cell table-head-cell_right"
							>Status</div>
							<div
								@click="clickSort('method')"
								:class="{ 'js-active': profileStore.payments.sortBy === 'method', 'js-decrease': profileStore.payments.sortOrder && profileStore.payments.sortBy === 'method' }"
								class="table-head-cell table-head-cell_right"
							>Method</div>
							<div
								@click="clickSort('amount')"
								:class="{ 'js-active': profileStore.payments.sortBy === 'amount', 'js-decrease': profileStore.payments.sortOrder && profileStore.payments.sortBy === 'amount' }"
								class="table-head-cell table-head-cell_right"
							>Amount</div>
							<div
								@click="clickSort('date')"
								:class="{ 'js-active': profileStore.payments.sortBy === 'date', 'js-decrease': profileStore.payments.sortOrder && profileStore.payments.sortBy === 'date' }"
								class="table-head-cell table-head-cell_right"
							>Date</div>
						</div>
						<div
							v-if="profileStore.payments.data.length > 0"
							class="table-body"
						>
							<div
								v-for="(item, index) in profileStore.payments.data"
								:key="item.id"
								class="table-row"
							>
								<div class="table-cell">{{ item.orderId }}</div>
								<div
									:class="item.status"
									class="table-cell table-cell_status table-cell_right"
								>
									<div class="table-cell-status-box">
										<span>{{ item.status }}</span>
										<IconQuestion
											v-show="item.status === 'Error'"
											@click="profileStore.showTopupError(index)"
										></IconQuestion>
									</div>
								</div>
								<div class="table-cell table-cell_right">{{ item.payerCurrency? item.payerCurrency : '—' }}</div>
								<div class="table-cell table-cell_right">{{ item.amount + ' ' + item.currency }}</div>
								<div
									v-html="localTime(item.createdAt)"
									class="table-cell table-cell_right"
								></div>
							</div>
						</div>
						<div
							v-else
							class="table-body"
						>
							<div class="table-row table-row_empty">
								<div class="table-cell tablepanel__empty">
									<span>You haven't made any payments yet</span>
								</div>
								<div class="table-cell"></div>
								<div class="table-cell table-cell_right">—</div>
								<div class="table-cell table-cell_right">—</div>
								<div class="table-cell table-cell_right">—</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
			<PagenatorBlock
				v-if="isMobile"
				:total-pages="profileStore.payments.meta.totalPages"
				:per-page="profileStore.payments.meta.limit"
				:current-page="profileStore.payments.meta.page"
				:maxVisibleButtons="3"
				@pagechanged="(val) => profileStore.paymentsOnPageChange(val)"
			></PagenatorBlock>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useProfileStore } from '@/stores'
import { mobileMatchMedia, formatLocalTime } from '@/utils/helpers'

import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'
import IconQuestion from '@/components/svg/IconQuestion.vue'

export default {
	name: 'ProfileTopup',
	components: {
		PagenatorBlock,
		IconQuestion
	},
	setup() {
		const profileStore = useProfileStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const searchStr = ref('')
		
		const localTime = (timestamp) => {
			return formatLocalTime(timestamp)
		}

		const clickSort = (el) => {
			if(profileStore.payments.sortBy === el) {
				profileStore.payments.sortOrder = !profileStore.payments.sortOrder
			} else {
				profileStore.payments.sortOrder = false
				profileStore.payments.sortBy = el
			}

			profileStore.getUserPayments()
		}


		profileStore.getUserPayments()


		return {
			profileStore,
			isMobile,
			localTime,
		
			searchStr,
			clickSort
		}
	}
}
</script>