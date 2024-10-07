<template>
	<div class="ml-right ml-right-graph ml-right-graph_admin">
		<div class="ml-dashboard ml-block ml-dashboard_finances">
			<div class="finance-header">
				<SelectBoxCalendar
					:selectObj="financeStore.periodSelect"
					@change="changePeriodSelect"
					@change-day="changePeriod"
				></SelectBoxCalendar>
				<BtnLoader
					@click.stop="financeStore.getData()"
					:btnId="'financeStoreRefreshBtn'"
					class="ml-btn"
				>
					<span>Refresh</span>
				</BtnLoader>
			</div>
			<transition name="table">
				<div
					v-if="!financeStore.tableAnimated"
					class="finance-table add-scrollbar-x"
				>
					<div
						v-if="financeStore.table"
						class="finance-table-wrap"
					>
						<div class="finance-table-title">
							<div class="finance-table-title__item finance-table-title__item_desc">Categories</div>
							<div class="finance-table-title__item">Payout comissions</div>
							<div class="finance-table-title__item">Topup comissions</div>
							<div class="finance-table-title__item finance-table-title__item_total">Total</div>
						</div>
						<div
							v-for="(item, i) in financeStore.table.payout.stats"
							:key="i"
							class="finance-table-col"
						>
							<div class="finance-table-col__item finance-table-col__item_desc">{{ financeStore.literalPeriod === 'year' ? item.time : item.dateString }}</div>
							<div
								v-if="item.usdAmount !== 0"
								class="finance-table-col__item"
							>${{ item.usdAmount.toFixed(2) }}</div>
							<div
								v-else
								class="finance-table-col__item"
							>$0</div>
							<div
								v-if="financeStore.table.topup.stats[i].usdAmount !== 0"
								class="finance-table-col__item"
							>${{ financeStore.table.topup.stats[i].usdAmount.toFixed(2) }}</div>
							<div
								v-else
								class="finance-table-col__item"
							>$0</div>
							<div class="finance-table-col__item finance-table-col__item_total"></div>
						</div>
						<div class="finance-table-total">
							<div class="finance-table-total__item finance-table-total__item_desc">Total</div>
							<div class="finance-table-total__item">${{ financeStore.table.payout.totalUsdAmount.toFixed(2) }}</div>
							<div class="finance-table-total__item">${{ financeStore.table.topup.totalUsdAmount.toFixed(2) }}</div>
							<div class="finance-table-total__item finance-table-total__item_total">${{ financeStore.table.totalUsdAmount.toFixed(2) }}</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
		<div class="ml-graph">
			<div
				:class="{ 'ml-block': !isMobile }"
				class="graph"
			>
				<transition name="fade">
					<div
						class="graph-wrap"
						v-if="financeStore.graphObj"
					>
						<GraphBlockFinance
							:graphObj="financeStore.graphObj"
						></GraphBlockFinance>
					</div>
				</transition>
			</div>
		</div>
		<FooterMobile></FooterMobile>
	</div>
</template>

<script>
import { useHead } from '@unhead/vue'
import { useFinancesStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import BtnLoader from '@/components/ui/BtnLoader.vue'
import FooterMobile from '@/components/FooterMobile.vue'
import SelectBoxCalendar from '@/components/ui/SelectBoxCalendar.vue'
import GraphBlockFinance from '@/components/finance/GraphBlockFinance.vue'

export default {
	name: 'FinancesPage',
	components: {
		BtnLoader,
		FooterMobile,
		SelectBoxCalendar,
		GraphBlockFinance
	},
	setup() {
		useHead({
			title: 'RBXCRATE | Finances',
			meta: [
				{
					name: 'description',
					content: 'Website description',
				}
			]
		})

		const financeStore = useFinancesStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const changePeriodSelect = (val) => {
			financeStore.changePeriodSelect(val)
		}

		const changePeriod = (val) => {
			financeStore.changePeriod(val)
		}


		financeStore.$reset()
		financeStore.getData()
		

		return {
			financeStore,
			isMobile,

			changePeriodSelect,
			changePeriod
		}
	}
}
</script>