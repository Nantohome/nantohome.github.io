<template>
	<div class="ml-right ml-right-graph ml-right-graph_vendor">
		<div class="ml-dashboard-table ml-block">
			<div
				v-if="isMobile"
				class="mobile-title"
			>
				<div class="mobile-title__text">Dashboard</div>
				<div class="mobile-title__desc">Keep track of your profile statistics and sort your data using filters</div>
			</div>
			<div class="dashboard-table-wrap">
				<div class="table table-dashboard">
					<div class="table-head">
						<div
							@click="clickSort('rate')"
							:class="{ 'js-active': vendorStore.list.sortBy === 'rate', 'js-decrease': vendorStore.list.sortOrder && vendorStore.list.sortBy === 'rate' }"
							class="table-head-cell table-head-cell_price"
						>Price<span v-if="!isMobile"> per 1000 R$</span></div>
						<div
							@click="clickSort('accountsCount')"
							:class="{ 'js-active': vendorStore.list.sortBy === 'accountsCount', 'js-decrease': vendorStore.list.sortOrder && vendorStore.list.sortBy === 'accountsCount' }"
							class="table-head-cell table-head-cell_right table-head-cell_accounts"
						>Accounts</div>
						<div
							@click="clickSort('totalRobux')"
							:class="{ 'js-active': vendorStore.list.sortBy === 'totalRobux', 'js-decrease': vendorStore.list.sortOrder && vendorStore.list.sortBy === 'totalRobux' }"
							class="table-head-cell table-head-cell_right table-head-cell_amount"
						>Robux</div>
					</div>
					<div
						v-for="item in vendorStore.list.data"
						:key="item.rate"
						class="table-row"
					>
						<div class="table-cell table-cell_price">$ {{ item.rate }}</div>
						<div class="table-cell table-cell_right table-cell_accounts">{{ item.accountsCount }}</div>
						<div class="table-cell table-cell_right table-cell_amount">{{ item.totalRobux }}<span v-if="!isMobile"> R$</span></div>
					</div>
					<template
						v-if="vendorStore.list.defaultSize"
					>
						<div
							v-for="item in (vendorStore.list.meta.limit - vendorStore.list.data.length)"
							:key="item"
							class="table-row table-row_empty"
						>
							<div class="table-cell">&nbsp;</div>
							<div class="table-cell">&nbsp;</div>
							<div class="table-cell">&nbsp;</div>
						</div>
					</template>
				</div>
			</div>
			<div class="dashboard-table-footer">
				<PagenatorBlock
					:total-pages="vendorStore.list.meta.totalPages"
					:per-page="vendorStore.list.meta.limit"
					:current-page="vendorStore.list.meta.page"
					:maxVisibleButtons="3"
					@pagechanged="(val) => vendorStore.onPageChange(val)"
				></PagenatorBlock>
				<div class="dashboard-table-total">Total Robux in Queue: <span class="dashboard-table-total__val">{{ vendorStore.totalRobux }} R$</span></div>
			</div>
		</div>
		<div class="ml-dashboard ml-block">
			<div class="vendor-dashboard">
				<div class="vendor-dashboard__select">
					<SelectBoxDefault
						:selectObj="vendorStore.rateSelect"
						@change="changeRateSelect"
					></SelectBoxDefault>
				</div>
				<div class="vendor-dashboard__select">
					<SelectBoxCalendar
						:selectObj="vendorStore.periodSelect"
						@change="changePeriodSelect"
						@change-day="changePeriod"
					></SelectBoxCalendar>
				</div>
				<div class="ml-box">
					<div class="ml-box-header">
						<div class="ml-box-header__title">Completed Orders</div>
					</div>
					<div class="ml-box-body">
						<span class="ml-box-body__text">{{ vendorStore.ordersStats.completedOrders }}</span>
						<span class="ml-box-body__icon icon-ml-check"></span>
					</div>
				</div>
				<div class="ml-box">
					<div class="ml-box-header">
						<a
							v-if="vendorStore.ordersStats.pendingOrdersCount > 0"
							@click.prevent="vendorStore.showPendingOrders()"
							class="ml-box-header__title ml-box-header__title_link"
						>Pending Orders</a>
						<span
							v-else
							class="ml-box-header__title"
						>Pending Orders</span>
					</div>
					<div class="ml-box-body">
						<span class="ml-box-body__text">{{ vendorStore.ordersStats.pendingOrdersCount }}</span>
						<span class="ml-box-body__icon icon-ml-clock"></span>
					</div>
				</div>
				<div class="ml-box">
					<div class="ml-box-header">
						<div class="ml-box-header__title">Robux Sold</div>
					</div>
					<div class="ml-box-body">
						<span class="ml-box-body__text">{{ vendorStore.ordersStats.totalRobuxSold }} R$</span>
						<span class="ml-box-body__icon icon-ml-cardout"></span>
					</div>
				</div>
				<div class="ml-box">
					<div class="ml-box-header">
						<div class="ml-box-header__title">USD Earned</div>
					</div>
					<div class="ml-box-body">
						<span class="ml-box-body__text">$ {{ vendorStore.ordersStats.totalUSDEarned }}</span>
						<span class="ml-box-body__icon icon-ml-card"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="ml-graph">
			<div
				v-if="isMobile"
				class="mobile-title ml-block"
			>
				<div class="mobile-title__text">Analytics</div>
				<div class="mobile-title__desc">Analyze most accurately your stats by using timelines</div>
			</div>
			<div
				:class="{ 'ml-block': !isMobile }"
				class="graph"
			>
				<transition name="fade">
					<div
						class="graph-wrap"
						v-if="vendorStore.graphObj"
					>
						<GraphBlock
							:graphObj="vendorStore.graphObj"
						></GraphBlock>
					</div>
				</transition>
			</div>
		</div>
		<FooterMobile></FooterMobile>
		<transition name="fade">
			<div
				v-if="vendorStore.pendingOrders.isShow"
				@click.self="vendorStore.toggleShowPendingOrders(false)"
				class="ml-blur-bg"
			>
				<PendingOrders></PendingOrders>
			</div>
		</transition>
	</div>
</template>

<script>
import { useVendorStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import FooterMobile from '@/components/FooterMobile.vue'
import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'
import SelectBoxDefault from '@/components/ui/SelectBoxDefault.vue'
import SelectBoxCalendar from '@/components/ui/SelectBoxCalendar.vue'
import GraphBlock from '@/components/dashboard/blocks/GraphBlock.vue'
import PendingOrders from '@/components/dashboard/blocks/PendingOrders.vue'

export default {
	name: 'VendorDashboard',
	components: {
		PagenatorBlock,
		SelectBoxDefault,
		SelectBoxCalendar,
		GraphBlock,
		FooterMobile,
		PendingOrders
	},
	setup() {
		const vendorStore = useVendorStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch


		const clickSort = (el) => {
			if(vendorStore.list.sortBy === el) {
				vendorStore.list.sortOrder = !vendorStore.list.sortOrder
			} else {
				vendorStore.list.sortOrder = false
				vendorStore.list.sortBy = el
			}

			vendorStore.getAccountsList()
		}

		const changeRateSelect = (val) => {
			vendorStore.changeRateSelect(val)
		}

		const changePeriodSelect = (val) => {
			vendorStore.changePeriodSelect(val)
		}

		const changePeriod = (val) => {
			vendorStore.changePeriod(val)
		}


		vendorStore.getAllStatsTimer()


		return {
			vendorStore,
			isMobile,

			clickSort,
			
			changeRateSelect,
			changePeriodSelect,
			changePeriod
		}
	}
}
</script>