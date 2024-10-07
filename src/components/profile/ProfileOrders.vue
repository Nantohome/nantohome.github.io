<template>
	<div class="profile-orders">
		<div class="profile-subheader">
			<div class="profile-toggle-btns">
				<button
					class="ml-btn ml-btn_small ml-btn_violet pointer-events-none"
				>Order History</button>
				<button
					@click="profileStore.toggleOrderHistoryShow(false)"
					class="ml-btn ml-btn_small"
				>Top-up History</button>
			</div>
			<div class="profile-subheader-box">
				<form
					@submit.prevent="profileStore.searchUserOrders(searchStr)"
					class="profile__search ml-ui-inputbtn"
				>
					<input
						v-model="searchStr"
						class="ml-ui__input"
						type="text"
						placeholder="Search nickname..."
					>
					<button
						class="ml-ui-inputbtn__btn icon-search"
					></button>
				</form>
				<PagenatorBlock
					v-if="!isMobile"
					:total-pages="profileStore.orders.meta.totalPages"
					:per-page="profileStore.orders.meta.limit"
					:current-page="profileStore.orders.meta.page"
					@pagechanged="(val) => profileStore.ordersOnPageChange(val)"
				></PagenatorBlock>
			</div>
		</div>
		<div class="profile-mobile-box">
			<div class="add-scrollbar-x table-wrap">
				<transition name="table">
					<div
						v-if="!profileStore.orders.animated"
						class="table table-orders"
					>
						<div class="table-head">
							<div
								@click="clickSort('id')"
								:class="{ 'js-active': profileStore.orders.sortBy === 'id', 'js-decrease': profileStore.orders.sortOrder && profileStore.orders.sortBy === 'id' }"
								class="table-head-cell"
							>ID</div>
							<div
								@click="clickSort('type')"
								:class="{ 'js-active': profileStore.orders.sortBy === 'type', 'js-decrease': profileStore.orders.sortOrder && profileStore.orders.sortBy === 'type' }"
								class="table-head-cell"
							>Type</div>
							<div
								@click="clickSort('status')"
								:class="{ 'js-active': profileStore.orders.sortBy === 'status', 'js-decrease': profileStore.orders.sortOrder && profileStore.orders.sortBy === 'status' }"
								class="table-head-cell table-head-cell_right"
							>Status</div>
							<div
								@click="clickSort('nickname')"
								:class="{ 'js-active': profileStore.orders.sortBy === 'nickname', 'js-decrease': profileStore.orders.sortOrder && profileStore.orders.sortBy === 'nickname' }"
								class="table-head-cell table-head-cell_right"
							>Nickname</div>
							<div
								@click="clickSort('robuxAmount')"
								:class="{ 'js-active': profileStore.orders.sortBy === 'robuxAmount', 'js-decrease': profileStore.orders.sortOrder && profileStore.orders.sortBy === 'robuxAmount' }"
								class="table-head-cell table-head-cell_right"
							>Robux Amount</div>
							<div
								@click="clickSort('price')"
								:class="{ 'js-active': profileStore.orders.sortBy === 'price', 'js-decrease': profileStore.orders.sortOrder && profileStore.orders.sortBy === 'price' }"
								class="table-head-cell table-head-cell_right"
							>Price</div>
							<div
								class="table-head-cell table-head-cell_right table-head-cell_nosort"
							>Rate</div>
							<div
								@click="clickSort('updatedAt')"
								:class="{ 'js-active': profileStore.orders.sortBy === 'updatedAt', 'js-decrease': profileStore.orders.sortOrder && profileStore.orders.sortBy === 'updatedAt' }"
								class="table-head-cell table-head-cell_right"
							>Updated</div>
						</div>
						<div
							v-if="profileStore.orders.data.length > 0"
							class="table-body"
						>
							<div
								v-for="(item, index) in profileStore.orders.data"
								:key="item.orderId"
								class="table-row"
							>
								<div class="table-cell">{{ item.orderId }}</div>
								<div class="table-cell">{{ item.type.replace(/_s/g, '-S') }}</div>
								<div
									:class="item.status"
									class="table-cell table-cell_status table-cell_right"
								>
									<div class="table-cell-status-box">
										<span>{{ item.status }}</span>
										<template
											v-if="item.status === 'Error'"
										>
											<IconQuestion
												@click="profileStore.showOrderError(index)"
											></IconQuestion>
											<IconDelete
												@click="profileStore.cancelOrder(item.orderId)"
											></IconDelete>
										</template>
										<IconDelete
											v-else-if="item.status !== 'Completed' && item.status !== 'Cancelled'"
											@click="profileStore.cancelOrder(item.orderId)"
										></IconDelete>
									</div>
								</div>
								<div class="table-cell table-cell_right">{{ item.sellerUsername }}</div>
								<div class="table-cell table-cell_right">{{ item.robuxAmount }} R$</div>
								<div class="table-cell table-cell_right">{{ item.price ? `$${item.price}` : '—' }}</div>
								<div class="table-cell table-cell_right">{{ item.rate ? `$${item.rate}` : '—' }}</div>
								<div
									v-html="localTime(item.updatedAt)"
									:class="item.isWebhookSent ? 'icon-complete' : 'icon-await'"
									class="table-cell table-cell_right table-icon"
								></div>
							</div>
						</div>
						<div
							v-else
							class="table-body"
						>
							<div class="table-row table-row_empty">
								<div class="table-cell tablepanel__empty">
									<span>You haven't made a purchase yet</span>
								</div>
								<div class="table-cell"></div>
								<div class="table-cell table-cell_right">—</div>
								<div class="table-cell table-cell_right">—</div>
								<div class="table-cell table-cell_right">—</div>
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
				:total-pages="profileStore.orders.meta.totalPages"
				:per-page="profileStore.orders.meta.limit"
				:current-page="profileStore.orders.meta.page"
				:maxVisibleButtons="3"
				@pagechanged="onPageChange"
			></PagenatorBlock>
		</div>
		<transition name="fade" appear>
			<div
				v-if="profileStore.isCancelConfirmShow"
				@click.self="profileStore.revocationCancel"
				class="ml-blur-bg"
			>
				<ModalCancel
					@close-modal="profileStore.revocationCancel"
					@confirm-cancel="profileStore.confirmCancel"
				>
					<div class="ml-modal-delete-desc"><span class="violet">Are you sure</span> you want to cancel this order?</div>
				</ModalCancel>
			</div>
		</transition>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useProfileStore } from '@/stores'
import { mobileMatchMedia, formatLocalTime } from '@/utils/helpers'

import ModalCancel from '@/components/profile/ModalCancel.vue'
import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'
import IconDelete from '@/components/svg/IconDelete.vue'
import IconQuestion from '@/components/svg/IconQuestion.vue'


export default {
	name: 'ProfileOrders',
	components: {
		ModalCancel,
		PagenatorBlock,
		IconDelete,
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
			if(profileStore.orders.sortBy === el) {
				profileStore.orders.sortOrder = !profileStore.orders.sortOrder
			} else {
				profileStore.orders.sortOrder = false
				profileStore.orders.sortBy = el
			}

			profileStore.getUserOrders()
		}


		profileStore.getUserOrders()


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