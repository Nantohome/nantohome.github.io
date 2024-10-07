<template>
	<div class="ml-right ml-right-graph ml-right-graph_customer">
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
				<SelectBox
					:selectObj="customerStore.merchantSelect"
					@change-val="changeMerchantSelect"
				></SelectBox>
				<SelectBox
					:selectObj="customerStore.typeSelect"
					@change-val="changeTypeSelect"
				></SelectBox>
				<SelectBoxCalendar
					:selectObj="customerStore.periodSelect"
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
						<span class="ml-box-body__text">{{ customerStore.ordersStats.completedOrdersCount }}</span>
						<span class="ml-box-body__icon icon-ml-check"></span>
					</div>
				</div>
				<div class="ml-box">
					<div class="ml-box-header">
						<router-link
							:to="{ name: 'profile' }"
							class="ml-box-header__title ml-box-header__title_link"
						>Pending Orders</router-link>
					</div>
					<div class="ml-box-body">
						<span class="ml-box-body__text">{{ customerStore.ordersStats.pendingOrders.ordersCount }}</span>
						<span class="ml-box-body__icon icon-ml-clock"></span>
					</div>
				</div>
			</div>
			<div class="ml-grid-row ml-grid-row_total">
				<div class="ml-box-total">
					<div class="ml-box-total__title">Pending Orders <span class="highlight">total summ</span>:</div>
					<div class="ml-box-total__value">{{ Number(customerStore.ordersStats.pendingOrders.robuxAmount) }} R$</div>
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
						<span class="ml-box-body__text">{{ customerStore.ordersStats.buyedRobuxAmount }} R$</span>
						<span class="ml-box-body__icon icon-ml-cardout"></span>
					</div>
				</div>
				<div class="ml-box ml-box_small">
					<div class="ml-box-header">
						<div class="ml-box-header__title">Credits Spent</div>
					</div>
					<div class="ml-box-body">
						<span class="ml-box-body__text">${{ customerStore.ordersStats.creditsSpentAmount }}</span>
						<span class="ml-box-body__icon icon-ml-card"></span>
					</div>
				</div>
				<div class="ml-box ml-box_small">
					<div class="ml-box-header">
						<span
							@click="customerStore.showAvailableRobux()"
							class="ml-box-header__title ml-box-header__title_link"
						>
							<span class="highlight">Available</span> Robux
						</span>
					</div>
					<div class="ml-box-body">
						<span class="ml-box-body__text">{{ customerStore.ordersStats.availableRobuxAmount }} R$</span>
						<span class="ml-box-body__icon icon-ml-wallet"></span>
					</div>
				</div>
				<div class="ml-box ml-box_small">
					<div class="ml-box-header">
						<div class="ml-box-header__title"><span class="highlight">Average</span> rate</div>
					</div>
					<div class="ml-box-body">
						<span class="ml-box-body__text">${{ Number(customerStore.ordersStats.averageRate) }}</span>
						<span class="ml-box-body__icon icon-ml-paper"></span>
					</div>
				</div>
			</div>
			<div
				v-if="isMobile"
				class="mobile-title"
			>
				<div class="mobile-title__text">Merchant Purchases</div>
				<div class="mobile-title__desc">Merchant purchase statistics for all time</div>
			</div>
			<div class="ml-grid-row">
				<ChartBlock
					:merchantsData="customerStore.ordersStats.merchantStats"
				></ChartBlock>
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
						v-if="customerStore.graphObj"
					>
						<GraphBlock
							:graphObj="customerStore.graphObj"
						></GraphBlock>
					</div>
				</transition>
			</div>
		</div>
		<FooterMobile></FooterMobile>
		<transition name="fade">
			<div
				v-if="customerStore.availableRobux.isShow"
				@click.self="customerStore.toggleShowAvailableRobux(false)"
				class="ml-blur-bg"
			>
				<AvailableRobux></AvailableRobux>
			</div>
		</transition>
	</div>
</template>

<script>
import { useCustomerStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import FooterMobile from '@/components/FooterMobile.vue'
import SelectBox from '@/components/ui/SelectBox.vue'
import SelectBoxCalendar from '@/components/ui/SelectBoxCalendar.vue'
import ChartBlock from '@/components/dashboard/blocks/ChartBlock.vue'
import GraphBlock from '@/components/dashboard/blocks/GraphBlock.vue'
import AvailableRobux from '@/components/dashboard/blocks/AvailableRobux.vue'

export default {
	name: 'CustomerDashboard',
	components: {
		SelectBox,
		SelectBoxCalendar,
		ChartBlock,
		GraphBlock,
		FooterMobile,
		AvailableRobux
	},
	setup() {
		const customerStore = useCustomerStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch
		
		const changeMerchantSelect = (val) => {
			customerStore.changeMerchantSelect(val)
		}

		const changeTypeSelect = (val) => {
			customerStore.changeTypeSelect(val)
		}

		const changePeriodSelect = (val) => {
			customerStore.changePeriodSelect(val)
		}

		const changePeriod = (val) => {
			customerStore.changePeriod(val)
		}
		

		customerStore.getAllStatsTimer()

		
		return {
			customerStore,
			isMobile,

			changeMerchantSelect,
			changeTypeSelect,
			changePeriodSelect,
			changePeriod
		}
	}
}
</script>