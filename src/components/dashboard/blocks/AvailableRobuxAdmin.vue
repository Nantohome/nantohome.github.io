<template>
	<div class="available-robux ml-modal">
		<span
			@click="adminStore.toggleShowAvailableRobux(false)"
			class="available-robux__close ml__close icon-close"
		></span>
		<div class="ml__title">Available Robux</div>
		<div class="add-scrollbar-x dashboard-table-wrap">
			<div class="table table-dashboard">
				<div class="table-head">
					<div
						@click="clickSort('rate')"
						:class="{ 'js-active': adminStore.availableRobux.list.sortBy === 'rate', 'js-decrease': adminStore.availableRobux.list.sortOrder && adminStore.availableRobux.list.sortBy === 'rate' }"
						class="table-head-cell table-head-cell_price"
					>Price<span v-if="!isMobile"> per 1000 R$</span></div>
					<div
						@click="clickSort('maxPreOrder')"
						:class="{ 'js-active': adminStore.availableRobux.list.sortBy === 'maxPreOrder', 'js-decrease': adminStore.availableRobux.list.sortOrder && adminStore.availableRobux.list.sortBy === 'maxPreOrder' }"
						class="table-head-cell table-head-cell_right table-head-cell_amount"
					>Max Order<span v-if="!isMobile"> Amount</span></div>
					<div
						@click="clickSort('totalRobux')"
						:class="{ 'js-active': adminStore.availableRobux.list.sortBy === 'totalRobux', 'js-decrease': adminStore.availableRobux.list.sortOrder && adminStore.availableRobux.list.sortBy === 'totalRobux' }"
						class="table-head-cell table-head-cell_right table-head-cell_amount"
					>Robux</div>
					<div
						@click="clickSort('accountsCount')"
						:class="{ 'js-active': adminStore.availableRobux.list.sortBy === 'accountsCount', 'js-decrease': adminStore.availableRobux.list.sortOrder && adminStore.availableRobux.list.sortBy === 'accountsCount' }"
						class="table-head-cell table-head-cell_right table-head-cell_accounts"
					>Accounts</div>
				</div>
				<div
					v-for="item in adminStore.availableRobux.list.data"
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
				:total-pages="adminStore.availableRobux.list.meta.totalPages"
				:per-page="adminStore.availableRobux.list.meta.limit"
				:current-page="adminStore.availableRobux.list.meta.page"
				:maxVisibleButtons="3"
				@pagechanged="(val) => adminStore.onPageChangeAvailableRobux(val)"
			></PagenatorBlock>
			<div class="dashboard-table-total">Total Robux in Queue: <span class="dashboard-table-total__val">{{ adminStore.availableRobux.totalRobux }} R$</span></div>
		</div>
	</div>
</template>

<script>
import { useAdminStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'

export default {
	name: 'AvailableRobuxAdmin',
	components: {
		PagenatorBlock
	},
	setup() {
		const adminStore = useAdminStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const clickSort = (el) => {
			if(adminStore.availableRobux.list.sortBy === el) {
				adminStore.availableRobux.list.sortOrder = !adminStore.availableRobux.list.sortOrder
			} else {
				adminStore.availableRobux.list.sortOrder = false
				adminStore.availableRobux.list.sortBy = el
			}

			adminStore.getAvailableRobux()
		}


		return {
			adminStore,
			isMobile,

			clickSort
		}
	}
}
</script>