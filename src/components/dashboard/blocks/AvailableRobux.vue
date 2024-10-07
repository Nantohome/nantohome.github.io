<template>
	<div class="available-robux ml-modal">
		<span
			@click="customerStore.toggleShowAvailableRobux(false)"
			class="available-robux__close ml__close icon-close"
		></span>
		<div class="ml__title">Available Robux</div>
		<div class="add-scrollbar-x dashboard-table-wrap">
			<div class="table table-dashboard">
				<div class="table-head">
					<div
						@click="clickSort('rate')"
						:class="{ 'js-active': customerStore.availableRobux.list.sortBy === 'rate', 'js-decrease': customerStore.availableRobux.list.sortOrder && customerStore.availableRobux.list.sortBy === 'rate' }"
						class="table-head-cell table-head-cell_price"
					>Price<span v-if="!isMobile"> per 1000 R$</span></div>
					<div
						@click="clickSort('maxPreOrder')"
						:class="{ 'js-active': customerStore.availableRobux.list.sortBy === 'maxPreOrder', 'js-decrease': customerStore.availableRobux.list.sortOrder && customerStore.availableRobux.list.sortBy === 'maxPreOrder' }"
						class="table-head-cell table-head-cell_right table-head-cell_amount"
					>Max Order<span v-if="!isMobile"> Amount</span></div>
					<div
						@click="clickSort('totalRobux')"
						:class="{ 'js-active': customerStore.availableRobux.list.sortBy === 'totalRobux', 'js-decrease': customerStore.availableRobux.list.sortOrder && customerStore.availableRobux.list.sortBy === 'totalRobux' }"
						class="table-head-cell table-head-cell_right table-head-cell_amount"
					>Robux</div>
					<div
						@click="clickSort('accountsCount')"
						:class="{ 'js-active': customerStore.availableRobux.list.sortBy === 'accountsCount', 'js-decrease': customerStore.availableRobux.list.sortOrder && customerStore.availableRobux.list.sortBy === 'accountsCount' }"
						class="table-head-cell table-head-cell_right table-head-cell_accounts"
					>Accounts</div>
				</div>
				<div
					v-for="item in customerStore.availableRobux.list.data"
					:key="item.rate"
					class="table-row"
				>
					<div class="table-cell table-cell_price">$ {{ item.rate }}</div>
					<div class="table-cell table-cell_right table-cell_amount">{{ item.maxPreOrder }}<span v-if="!isMobile"> R$</span></div>
					<div class="table-cell table-cell_right table-cell_amount">{{ item.totalRobux }}<span v-if="!isMobile"> R$</span></div>
					<div class="table-cell table-cell_right table-cell_accounts">{{ item.accountsCount }}</div>
				</div>
			</div>
		</div>
		<div class="dashboard-table-footer">
			<PagenatorBlock
				:total-pages="customerStore.availableRobux.list.meta.totalPages"
				:per-page="customerStore.availableRobux.list.meta.limit"
				:current-page="customerStore.availableRobux.list.meta.page"
				:maxVisibleButtons="3"
				@pagechanged="(val) => customerStore.onPageChange(val)"
			></PagenatorBlock>
			<div class="dashboard-table-total">Total Robux in Queue: <span class="dashboard-table-total__val">{{ customerStore.availableRobux.totalRobux }} R$</span></div>
		</div>
	</div>
</template>

<script>
import { useCustomerStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'

export default {
	name: 'AvailableRobux',
	components: {
		PagenatorBlock
	},
	setup() {
		const customerStore = useCustomerStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const clickSort = (el) => {
			if(customerStore.availableRobux.list.sortBy === el) {
				customerStore.availableRobux.list.sortOrder = !customerStore.availableRobux.list.sortOrder
			} else {
				customerStore.availableRobux.list.sortOrder = false
				customerStore.availableRobux.list.sortBy = el
			}

			customerStore.getAvailableRobux()
		}


		return {
			customerStore,
			isMobile,

			clickSort
		}
	}
}
</script>