<template>
	<div class="pending-orders ml-modal">
		<span
			@click="adminStore.toggleShowPendingOrders(false)"
			class="pending-orders__close ml__close icon-close"
		></span>
		<div class="ml__title">Pending orders</div>
		<ul class="pending-orders-list">
			<li
				v-for="item in adminStore.pendingOrders.list.data"
				:key="item.id"
				class="pending-orders-list-item"
			>
				<span>$ {{ item.rate }}</span> • <span class="active">{{ item.ordersCount }} Orders</span> • <span>{{ item.robuxAmount }} R$</span>
			</li>
		</ul>
		<div class="pending-orders-pagenator">
			<PagenatorBlock
				:total-pages="adminStore.pendingOrders.list.meta.totalPages"
				:per-page="adminStore.pendingOrders.list.meta.limit"
				:current-page="adminStore.pendingOrders.list.meta.page"
				:maxVisibleButtons="isMobile ? 3 : 4"
				@pagechanged="(val) => adminStore.onPageChangePendingOrders(val)"
			></PagenatorBlock>
		</div>
	</div>
</template>

<script>
import { useAdminStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'

export default {
	name: 'PendingOrders',
	components: {
		PagenatorBlock
	},
	setup() {
		const adminStore = useAdminStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		
		return {
			adminStore,
			isMobile
		}
	}
}
</script>