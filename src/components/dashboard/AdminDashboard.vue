<template>
	<div class="ml-right ml-right-graph ml-right-graph_admin">
		<div class="ml-dashboard ml-grid-autorow ml-block">
			<div
				v-if="isMobile"
				class="mobile-title"
			>
				<div class="mobile-title__text">Dashboard</div>
				<div class="mobile-title__desc">Keep track of your profile statistics and sort your data using filters</div>
			</div>
			<div
				class="ml-grid-row"
			>
				<AdminSelectBoxUsers></AdminSelectBoxUsers>
				<SelectBox
					:selectObj="adminStore.typeSelect"
					@change-val="changeTypeSelect"
				></SelectBox>
				<SelectBoxCalendar
					:selectObj="adminStore.periodSelect"
					@change="changePeriodSelect"
					@change-day="changePeriod"
				></SelectBoxCalendar>
			</div>
			<div
				v-if="isMobile"
				class="mobile-title"
			>
				<div class="mobile-title__text">Orders</div>
			</div>
			<div class="ml-grid-row">
				<div class="ml-box">
					<div class="ml-box-header">
						<div class="ml-box-header__title">Completed Orders</div>
					</div>
					<div class="ml-box-body">
						<span class="ml-box-body__text">{{ adminStore.stats.completedOrders.count }}</span>
						<span class="ml-box-body__icon icon-ml-check"></span>
					</div>
				</div>
				<div class="ml-box">
					<a
						v-if="adminStore.stats.pendingOrders.count > 0"
						@click.prevent="adminStore.showPendingOrders()"
						class="ml-box-header__title ml-box-header__title_link"
					>Pending Orders</a>
					<span
						v-else
						class="ml-box-header__title"
					>Pending Orders</span>
					<div class="ml-box-body">
						<span class="ml-box-body__text">{{ adminStore.stats.pendingOrders.count }}</span>
						<span class="ml-box-body__icon icon-ml-clock"></span>
					</div>
				</div>
			</div>
			<div class="ml-grid-row ml-grid-row_total">
				<div class="ml-box-total">
					<div class="ml-box-total__title">Pending Orders <span class="highlight">total summ</span>:</div>
					<div class="ml-box-total__value">{{ Number(adminStore.stats.pendingOrders.robuxAmount) }} R$</div>
				</div>
			</div>
			<div
				v-if="isMobile"
				class="mobile-title ml-grid-autorow-lastorder"
			>
				<div class="mobile-title__text">Robux Stats</div>
				<div class="mobile-title__desc">Keep track of your profile statistics and sort your data using filters</div>
			</div>
			<div class="ml-grid-row ml-grid-autorow-lastorder">
				<div class="ml-box ml-box_small">
					<div class="ml-box-header">
						<div class="ml-box-header__title">Buyed Robux</div>
					</div>
					<div class="ml-box-body">
						<span class="ml-box-body__text">{{ adminStore.stats.completedOrders.robuxAmount }} R$</span>
						<span class="ml-box-body__icon icon-ml-cardout"></span>
					</div>
				</div>
				<div class="ml-box ml-box_small">
					<div class="ml-box-header">
						<div class="ml-box-header__title">Credits Spent</div>
					</div>
					<div class="ml-box-body">
						<span class="ml-box-body__text">${{ adminStore.stats.completedOrders.creditsSpentAmount }}</span>
						<span class="ml-box-body__icon icon-ml-card"></span>
					</div>
				</div>
				<div class="ml-box ml-box_small">
					<div class="ml-box-header">
						<span
							@click="adminStore.showAvailableRobux()"
							class="ml-box-header__title ml-box-header__title_link"
						>
							<span class="highlight">Available</span> Robux
						</span>
					</div>
					<div class="ml-box-body">
						<span class="ml-box-body__text">{{ adminStore.stats.availableRobuxAmount }} R$</span>
						<span class="ml-box-body__icon icon-ml-wallet"></span>
					</div>
				</div>
				<div class="ml-box ml-box_small">
					<div class="ml-box-header">
						<div class="ml-box-header__title">Average rate</div>
					</div>
					<div class="ml-box-body">
						<span class="ml-box-body__text">${{ Number(adminStore.stats.completedOrders.averageRate).toFixed(2) }}</span>
						<span class="ml-box-body__icon icon-ml-paper"></span>
					</div>
				</div>
			</div>
			<div
				v-if="isMobile && !adminStore.customer.value && !adminStore.merchant.value"
				class="mobile-title"
			>
				<div class="mobile-title__text">Merchant Purchases</div>
				<div class="mobile-title__desc">Merchant purchase statistics for all time</div>
			</div>
			<transition name="scaley">
				<div
					v-if="!adminStore.customer.value && !adminStore.merchant.value"
					class="ml-merchants-row"
				>
					<div class="ml-merchants-row-navbox">
						<transition name="fade">
							<button
								v-if="adminStore.merchants.meta.page > 1"
								@click="adminStore.prevMerchants()"
								class="ml-merchants-row__nav ml-merchants-row__nav_prev"
							></button>
						</transition>
					</div>
					<div class="ml-grid-row">
						<ChartBlock
							:merchantsData="adminStore.merchants.data"
						></ChartBlock>
					</div>
					<div class="ml-merchants-row-navbox">
						<transition name="fade">
							<button
								v-if="adminStore.merchants.meta.totalPages > adminStore.merchants.meta.page"
								@click="adminStore.nextMerchants()"
								class="ml-merchants-row__nav ml-merchants-row__nav_next"
							></button>
						</transition>
					</div>
				</div>
			</transition>
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
						v-if="adminStore.graphObj"
					>
						<GraphBlock
							:graphObj="adminStore.graphObj"
						></GraphBlock>
					</div>
				</transition>
			</div>
		</div>
		<FooterMobile></FooterMobile>
		<transition name="fade">
			<div
				v-if="adminStore.pendingOrders.isShow"
				@click.self="adminStore.toggleShowPendingOrders(false)"
				class="ml-blur-bg"
			>
				<PendingOrdersAdmin></PendingOrdersAdmin>
			</div>
		</transition>
		<transition name="fade">
			<div
				v-if="adminStore.availableRobux.isShow"
				@click.self="adminStore.toggleShowAvailableRobux(false)"
				class="ml-blur-bg"
			>
				<AvailableRobuxAdmin></AvailableRobuxAdmin>
			</div>
		</transition>
	</div>
</template>

<script>
import { useAdminStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import FooterMobile from '@/components/FooterMobile.vue'
import SelectBox from '@/components/ui/SelectBox.vue'
import AdminSelectBoxUsers from '@/components/ui/AdminSelectBoxUsers.vue'
import SelectBoxCalendar from '@/components/ui/SelectBoxCalendar.vue'
import ChartBlock from '@/components/dashboard/blocks/ChartBlock.vue'
import GraphBlock from '@/components/dashboard/blocks/GraphBlock.vue'
import PendingOrdersAdmin from '@/components/dashboard/blocks/PendingOrdersAdmin.vue'
import AvailableRobuxAdmin from '@/components/dashboard/blocks/AvailableRobuxAdmin.vue'

export default {
	name: 'AdminDashboard',
	components: {
		SelectBox,
		AdminSelectBoxUsers,
		SelectBoxCalendar,
		ChartBlock,
		GraphBlock,
		FooterMobile,
		PendingOrdersAdmin,
		AvailableRobuxAdmin
	},
	setup() {
		const adminStore = useAdminStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch
		
		const changeTypeSelect = (val) => {
			adminStore.changeTypeSelect(val)
		}

		const changePeriodSelect = (val) => {
			adminStore.changePeriodSelect(val)
		}

		const changePeriod = (val) => {
			adminStore.changePeriod(val)
		}
		

		adminStore.getAllStatsTimer()

		
		return {
			adminStore,
			isMobile,

			changeTypeSelect,
			changePeriodSelect,
			changePeriod
		}
	}
}
</script>