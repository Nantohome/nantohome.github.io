<template>
	<div class="ml-right">
		<div class="accounts tablepanel ml-block">
			<div
				v-if="isMobile"
				class="mobile-title"
			>
				<div class="mobile-title__text">Accounts</div>
			</div>
			<div class="tablepanel-header">
				<BtnLoader
					:disabled="accountsStore.list.selected.length === 0"
					@click="accountsStore.deactivateSelected()"
					:btnId="'accountsDeactivateBtn'"
					class="tablepanel__btn ml-btn icon-off"
				><span>Deactivate selected</span></BtnLoader>
				<button
					:disabled="accountsStore.list.selected.length === 0"
					@click="accountsStore.deleteSelected()"
					class="tablepanel__btn ml-btn icon-trash"
				><span>Delete selected</span></button>
				<BtnLoader
					:disabled="accountsStore.list.selected.length === 0"
					@click="accountsStore.updateSelected()"
					:btnId="'accountsUpdateBtn'"
					class="tablepanel__btn ml-btn icon-recycle"
				><span>Update selected</span></BtnLoader>
				<button
					:disabled="accountsStore.list.selected.length === 0"
					@click="accountsStore.toggleShowChangeRate(true)"
					class="tablepanel__btn ml-btn icon-pencil"
				><span>Change selected</span></button>
				<BtnLoader
					:disabled="accountsStore.list.selected.length === 0"
					@click="accountsStore.activateSelected()"
					:btnId="'accountsActivateBtn'"
					class="tablepanel__btn ml-btn icon-lightning"
				><span>Activate selected</span></BtnLoader>
				<BtnLoader
					v-if="!isMobile"
					@click="accountsStore.toggleShowAddAccounts(true)"
					:btnId="'addNewAccountBtn'"
					class="tablepanel__btn ml-btn ml-btn_violet icon-plus"
				><span>Add new account</span></BtnLoader>
			</div>
			<div class="tablepanel-list">
				<div class="tablepanel-subheader">
					<BtnLoader
						v-if="isMobile"
						@click="accountsStore.toggleShowAddAccounts(true)"
						:btnId="'addNewAccountBtn'"
						class="tablepanel__btn ml-btn ml-btn_violet icon-plus"
					><span>Add new account</span></BtnLoader>
					<div class="tablepanel-search-box">
						<form
							@submit.prevent="accountsStore.searchAccounts(searchStr)"
							class="tablepanel__search ml-ui-inputbtn"
						>
							<input
								v-model="searchStr"
								class="ml-ui__input"
								type="text"
								placeholder="Search account..."
							>
							<button
								class="ml-ui-inputbtn__btn icon-search"
							></button>
						</form>
						<HelpBtn
							:link="LINKS.help"
							class="tablepanel-search-help"
						></HelpBtn>
					</div>
					<div class="tablepanel__summary">{{ accountsStore.summary.totalRobuxAmount }} R$ | Accounts: {{ accountsStore.summary.accountCount }}</div>
					<PagenatorBlock
						v-if="!isMobile"
						:total-pages="accountsStore.list.meta.totalPages"
						:per-page="accountsStore.list.meta.limit"
						:current-page="accountsStore.list.meta.page"
						@pagechanged="(val) => accountsStore.onPageChange(val)"
					></PagenatorBlock>
				</div>
				<div class="profile-mobile-box">
					<div class="add-scrollbar-x table-wrap">
						<transition name="table">
							<div
								v-if="!accountsStore.list.animated"
								class="table table-accounts"
							>
								<div class="table-head">
									<div
										@click="accountsStore.checkAll()"
										:class="{ 'js-active': accountsStore.list.checkAll }"
										class="table-head-cell table-head-cell_check"
									>All</div>
									<div
										@click="clickSort('username')"
										:class="{ 'js-active': accountsStore.list.sortBy === 'username', 'js-decrease': accountsStore.list.sortOrder && accountsStore.list.sortBy === 'username' }"
										class="table-head-cell table-head-cell_name"
									>Username</div>
									<div
										@click="clickSort('balance')"
										:class="{ 'js-active': accountsStore.list.sortBy === 'balance', 'js-decrease': accountsStore.list.sortOrder && accountsStore.list.sortBy === 'balance' }"
										class="table-head-cell table-head-cell_robux"
									>Balance</div>
									<div
										@click="clickSort('spent')"
										:class="{ 'js-active': accountsStore.list.sortBy === 'spent', 'js-decrease': accountsStore.list.sortOrder && accountsStore.list.sortBy === 'spent' }"
										class="table-head-cell table-head-cell_spent"
									>Sold</div>
									<div
										@click="clickSort('rate')"
										:class="{ 'js-active': accountsStore.list.sortBy === 'rate', 'js-decrease': accountsStore.list.sortOrder && accountsStore.list.sortBy === 'rate' }"
										class="table-head-cell table-head-cell_price"
									>Price per 1K R$</div>
									<div
										@click="clickSort('status')"
										:class="{ 'js-active': accountsStore.list.sortBy === 'status', 'js-decrease': accountsStore.list.sortOrder && accountsStore.list.sortBy === 'status' }"
										class="table-head-cell table-head-cell_status"
									>Status</div>
									<div
										@click="clickSort('updatedAt')"
										:class="{ 'js-active': accountsStore.list.sortBy === 'updatedAt', 'js-decrease': accountsStore.list.sortOrder && accountsStore.list.sortBy === 'updatedAt' }"
										class="table-head-cell table-head-cell_date"
									>Updated</div>
								</div>
								<div
									v-if="accountsStore.list.data.length > 0"
									class="table-body"
								>
									<div
										v-for="item in accountsStore.list.data"
										:key="item.id"
										:class="{ 'js-selected': isRowSelected(item.id)}"
										class="table-row"
									>
										<div class="table-cell table-cell_check">
											<label
												class="ml-table-checkbox"
											>
												<input
													@change="changeItem"
													v-model="accountsStore.list.selected"
													:value="item.id"
													type="checkbox"
													class="ml-table-checkbox__input"
												>
												<span class="ml-table-checkbox__el"></span>
											</label>
										</div>
										<div class="table-cell table-cell_name">{{ item.username }}</div>
										<div class="table-cell table-cell_robux">{{ item.robuxBalance }} R$</div>
										<div class="table-cell table-cell_spent">{{ item.robuxSpent }} R$</div>
										<div class="table-cell table-cell_price">${{ item.rateEntity ? item.rateEntity.rate : item.rate }}</div>
										<div
											:class="item.status"
											class="table-cell table-cell_status"
										>
											<div class="table-cell-status-box">
												<span>{{ item.status.replace(/_/g, ' ') }}</span>
												<span
													v-show="item.status === 'TwoFA'"
													class="table-cell-status-box__icon"
												>
													<IconUpdate
														@click="accountsStore.updateSelected([item.id])"
														class="icon-update"
													></IconUpdate>
												</span>
											</div>
										</div>
										<div
											v-html="localTime(item.updatedAt)"
											class="table-cell table-cell_date"
										></div>
									</div>
								</div>
								<div
									v-else
									class="table-body"
								>
									<div class="table-row table-row_empty">
										<div class="table-cell tablepanel__empty">
											<span>You haven't added any account yet</span>
										</div>
										<div class="table-cell"></div>
										<div class="table-cell table-cell_robux">—</div>
										<div class="table-cell table-cell_spent">—</div>
										<div class="table-cell table-cell_price">—</div>
										<div class="table-cell table-cell_status">—</div>
										<div class="table-cell table-cell_date">—</div>
									</div>
								</div>
							</div>
						</transition>
					</div>
					<PagenatorBlock
						v-if="isMobile"
						:total-pages="accountsStore.list.meta.totalPages"
						:per-page="accountsStore.list.meta.limit"
						:current-page="accountsStore.list.meta.page"
						:maxVisibleButtons="3"
						@pagechanged="(val) => accountsStore.onPageChange(val)"
					></PagenatorBlock>
				</div>
			</div>
		</div>
		<FooterMobile></FooterMobile>
		<transition name="fade" appear>
			<div
				v-if="accountsStore.isDeleteConfirmShow"
				@click.self="accountsStore.cancelDelete"
				class="ml-blur-bg"
			>
				<ModalDelete
					@close-modal="accountsStore.cancelDelete"
					@confirm-delete="accountsStore.confirmDelete"
				>
					<div class="ml-modal-delete-desc"><span class="violet">Are you sure</span> you want to delete this accounts?</div>
				</ModalDelete>
			</div>
		</transition>
		<transition name="fade" appear>
			<div
				v-if="accountsStore.isChangeRateShow"
				@click.self="accountsStore.toggleShowChangeRate(false)"
				class="ml-blur-bg"
			>
				<ChangeRate
					v-if="accountsStore.ratesSelect.list"
				></ChangeRate>
			</div>
		</transition>
		<transition name="fade" appear mode="out-in">
			<div
				v-if="accountsStore.isAddAccountsShow"
				@click.self="accountsStore.toggleShowAddAccounts(false)"
				class="ml-blur-bg"
			>
				<AddAccounts
					v-if="accountsStore.proxySelect.list && accountsStore.priceSelect.list"
				></AddAccounts>
			</div>
			<div
				v-else-if="accountsStore.isAddAccounts2FAShow"
				@click.self="accountsStore.toggleShowAddAccounts2FA(false)"
				class="ml-blur-bg"
			>
				<AddTwoFactorAccounts></AddTwoFactorAccounts>
			</div>
		</transition>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useAccountsStore } from '@/stores'
import { mobileMatchMedia, formatLocalTime } from '@/utils/helpers'
import { LINKS } from '@/enums'

import FooterMobile from '@/components/FooterMobile.vue'
import HelpBtn from '@/components/ui/HelpBtn.vue'
import IconUpdate from '@/components/svg/IconUpdate.vue'
import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'
import ModalDelete from '@/components/ui/ModalDelete.vue'
import ChangeRate from '@/components/accounts/ChangeRate.vue'
import AddAccounts from '@/components/accounts/AddAccounts.vue'
import AddTwoFactorAccounts from '@/components/accounts/AddTwoFactorAccounts.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'AccountsPage',
	components: {
		FooterMobile,
		HelpBtn,
		IconUpdate,
		PagenatorBlock,
		ModalDelete,
		ChangeRate,
		AddAccounts,
		AddTwoFactorAccounts,
		BtnLoader
	},
	setup() {
		useHead({
			title: 'RBXCRATE | Accounts',
			meta: [
				{
					name: 'description',
					content: 'Website description'
				}
			]
		})

		const accountsStore = useAccountsStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const searchStr = ref('')

		const localTime = (timestamp) => {
			return formatLocalTime(timestamp)
		}

		const isRowSelected = (id) => {
			if(accountsStore.list.selected.indexOf(id) !== -1) {
				return true
			} else {
				return false
			}
		}

		const changeItem = () => {
			if(accountsStore.list.selected.length !== accountsStore.list.data.length) {
				accountsStore.list.checkAll = false
			}
		}

		const clickSort = (el) => {
			if(accountsStore.list.sortBy === el) {
				accountsStore.list.sortOrder = !accountsStore.list.sortOrder
			} else {
				accountsStore.list.sortOrder = false
				accountsStore.list.sortBy = el
			}

			accountsStore.getData()
		}

		
		accountsStore.getInitialData()


		return {
			accountsStore,
			isMobile,
			LINKS,
			localTime,

			searchStr,
			changeItem,
			clickSort,
			isRowSelected
		}
	}
}
</script>