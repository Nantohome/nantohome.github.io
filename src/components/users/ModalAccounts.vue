<template>
	<div class="ml-modal ml-modal_accounts">
		<span
			@click="$emit('closeModal')"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">{{ vendorsManagmentStore.accounts.login }} accounts</div>
		<div class="add-scrollbar-x dashboard-table-wrap">
			<div class="table table-dashboard table-dashboard_accounts">
				<div class="table-head">
					<div class="table-head-cell table-head-cell_btns">Actions</div>
					<div
						@click="clickSort('username')"
						:class="{ 'js-active':  vendorsManagmentStore.accounts.sortBy === 'username', 'js-decrease':  vendorsManagmentStore.accounts.sortOrder &&  vendorsManagmentStore.accounts.sortBy === 'username' }"
						class="table-head-cell table-head-cell_name"
					>Nickname</div>
					<div
						@click="clickSort('balance')"
						:class="{ 'js-active':  vendorsManagmentStore.accounts.sortBy === 'balance', 'js-decrease':  vendorsManagmentStore.accounts.sortOrder &&  vendorsManagmentStore.accounts.sortBy === 'balance' }"
						class="table-head-cell table-head-cell_balance"
					>Balance</div>
					<div
						@click="clickSort('createdAt')"
						:class="{ 'js-active':  vendorsManagmentStore.accounts.sortBy === 'createdAt', 'js-decrease':  vendorsManagmentStore.accounts.sortOrder &&  vendorsManagmentStore.accounts.sortBy === 'createdAt' }"
						class="table-head-cell table-head-cell_right"
					>Added</div>
					<div
						@click="clickSort('status')"
						:class="{ 'js-active':  vendorsManagmentStore.accounts.sortBy === 'status', 'js-decrease':  vendorsManagmentStore.accounts.sortOrder &&  vendorsManagmentStore.accounts.sortBy === 'status' }"
						class="table-head-cell table-head-cell_right table-head-cell_status"
					>Status</div>
				</div>
				<div
					v-for="item in vendorsManagmentStore.accounts.data"
					:key="item.id"
					class="table-row"
				>
					<div class="table-cell table-cell_btns">
						<button
							@click.stop="vendorsManagmentStore.deleteAccount(item.id)"
							class="table-cell__btn icon-btn icon-btn_del"
						></button>
					</div>
					<div class="table-cell table-cell_name">{{ item.username }}</div>
					<div class="table-cell table-cell_balance">{{ item.robuxBalance }} R$</div>
					<div
						v-html="localTime(item.createdAt)"
						class="table-cell table-cell_right"
					></div>
					<div
						:class="item.status"
						class="table-cell table-cell_status"
					>
						<div class="table-cell-status-box">
							<span>{{ item.status.replace(/_/g, ' ') }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="dashboard-table-footer">
			<PagenatorBlock
				:total-pages="vendorsManagmentStore.accounts.meta.totalPages"
				:per-page="vendorsManagmentStore.accounts.meta.limit"
				:current-page="vendorsManagmentStore.accounts.meta.page"
				:maxVisibleButtons="3"
				@pagechanged="(val) => vendorsManagmentStore.onAccountsPageChange(val)"
			></PagenatorBlock>
		</div>
	</div>
</template>

<script>
import { useVendorsManagmentStore } from '@/stores'
import { formatLocalTime } from '@/utils/helpers'

import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'

export default {
	name: 'ModalAccounts',
	components: {
		PagenatorBlock
	},
	setup() {
		const vendorsManagmentStore = useVendorsManagmentStore()

		const localTime = (timestamp) => {
			return formatLocalTime(timestamp)
		}

		const clickSort = (el) => {
			if(vendorsManagmentStore.accounts.sortBy === el) {
				vendorsManagmentStore.accounts.sortOrder = !vendorsManagmentStore.accounts.sortOrder
			} else {
				vendorsManagmentStore.accounts.sortOrder = false
				vendorsManagmentStore.accounts.sortBy = el
			}
			vendorsManagmentStore.getInitialAccountsData()
		}

		return {
			vendorsManagmentStore,
			localTime,
			clickSort
		}
	}
}
</script>