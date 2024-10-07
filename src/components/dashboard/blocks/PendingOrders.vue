<template>
	<div class="pending-orders ml-modal">
		<span
			@click="vendorStore.toggleShowPendingOrders(false)"
			class="pending-orders__close ml__close icon-close"
		></span>
		<div class="ml__title">Pending orders</div>
		<ul class="pending-orders-list">
			<li
				v-for="item in vendorStore.pendingOrders.list.data"
				:key="item.id"
				class="pending-orders-list-item"
			>
				<span>$ {{ item.rate }}</span> • <span class="active">{{ item.ordersCount }} Orders</span> • <span>{{ item.robuxAmount }} R$</span>
			</li>
		</ul>
		<div class="pending-orders-pagenator">
			<PagenatorBlock
				:total-pages="vendorStore.pendingOrders.list.meta.totalPages"
				:per-page="vendorStore.pendingOrders.list.meta.limit"
				:current-page="vendorStore.pendingOrders.list.meta.page"
				:maxVisibleButtons="isMobile ? 3 : 4"
				@pagechanged="(val) => vendorStore.onPageChangePendingOrders(val)"
			></PagenatorBlock>
		</div>
	</div>
</template>

<script>
import { useVendorStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'

export default {
	name: 'PendingOrders',
	components: {
		PagenatorBlock
	},
	setup() {
		const vendorStore = useVendorStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		return {
			vendorStore,
			isMobile
		}
	}
}
</script>