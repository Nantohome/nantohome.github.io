<template>
	<div class="users-customers-managment tablepanel ml-block">
		<div
			v-if="isMobile"
			class="cpanel-back"
		>
			<span
				@click="usersStore.pageVisibility = 'UsersStart'"
				class="tl__back icon-back"
			>Go Back</span>
			<div class="mobile-title">
				<div class="mobile-title__text">Customers</div>
			</div>
		</div>
		<div class="tablepanel-header-any">
			<div class="tablepanel-header-wrap">
				<button
					v-if="!isMobile"
					@click="usersStore.pageVisibility = 'UsersStart'"
					class="tablepanel__btn ml-btn ml-btn_violet icon-goback"
				><span>Go back</span></button>
				<BtnLoader
					@click.stop="customersManagmentStore.freezeSelected()"
					:disabled="customersManagmentStore.list.selected.length === 0"
					:btnId="'customersManagmentFreezeBtn'"
					class="tablepanel__btn ml-btn icon-freeze"
				>
					<span>Freeze selected</span>
				</BtnLoader>
				<BtnLoader
					@click.stop="customersManagmentStore.unfreezeSelected()"
					:disabled="customersManagmentStore.list.selected.length === 0"
					:btnId="'customersManagmentUnfreezeBtn'"
					class="tablepanel__btn ml-btn icon-lightning"
				>
					<span>Unfreeze selected</span>
				</BtnLoader>
				<BtnLoader
					@click.stop="customersManagmentStore.deleteSelected()"
					:disabled="customersManagmentStore.list.selected.length === 0"
					:btnId="'customersManagmentDeleteBtn'"
					class="tablepanel__btn ml-btn icon-trash"
				>
					<span>Delete selected</span>
				</BtnLoader>
			</div>
		</div>
		<div class="tablepanel-list">
			<div class="tablepanel-subheader">
				<div class="users-toggle-btns">
					<button
						class="ml-btn ml-btn_small ml-btn_violet pointer-events-none"
					>Customers managment</button>
					<button
						@click="usersStore.pageVisibility = 'CustomersRequest'"
						class="ml-btn ml-btn_small"
					>Customers Requests</button>
				</div>
				<form
					@submit.prevent="customersManagmentStore.searchKeyword(searchStr)"
					class="tablepanel__search ml-ui-inputbtn"
				>
					<input
						v-model="searchStr"
						class="ml-ui__input"
						type="text"
						placeholder="Search..."
					>
					<button
						class="ml-ui-inputbtn__btn icon-search"
					></button>
				</form>
				<PagenatorBlock
					v-if="!isMobile"
					:total-pages="customersManagmentStore.list.meta.totalPages"
					:per-page="customersManagmentStore.list.meta.limit"
					:current-page="customersManagmentStore.list.meta.page"
					@pagechanged="(val) => customersManagmentStore.onPageChange(val)"
				></PagenatorBlock>
			</div>
			<div class="profile-mobile-box">
				<div class="add-scrollbar-x table-wrap js-padding">
					<transition name="table">
						<div
							v-if="!customersManagmentStore.list.animated"
							class="table table-customers-managment"
						>
							<div class="table-head">
								<div
									@click="customersManagmentStore.checkAll()"
									:class="{ 'js-active': customersManagmentStore.list.checkAll }"
									class="table-head-cell table-head-cell_check"
								>All</div>
								<div
									class="table-head-cell table-head-cell_btns"
								>Actions</div>
								<div
									@click="clickSort('login')"
									:class="{ 'js-active':  customersManagmentStore.list.sortBy === 'login', 'js-decrease':  customersManagmentStore.list.sortOrder &&  customersManagmentStore.list.sortBy === 'login' }"
									class="table-head-cell"
								>Buyer login</div>
								<div
									@click="clickSort('balance')"
									:class="{ 'js-active': customersManagmentStore.list.sortBy === 'balance', 'js-decrease':  customersManagmentStore.list.sortOrder &&  customersManagmentStore.list.sortBy === 'balance' }"
									class="table-head-cell table-head-cell_right"
								>Balance</div>
								<div
									class="table-head-cell table-head-cell_right table-head-cell_nosort"
								>Percent Fee</div>
								<div
									class="table-head-cell table-head-cell_right table-head-cell_nosort"
								>Fixed Fee</div>
								<div
									@click="clickSort('totalRobuxAmount')"
									:class="{ 'js-active': customersManagmentStore.list.sortBy === 'totalRobuxAmount', 'js-decrease':  customersManagmentStore.list.sortOrder &&  customersManagmentStore.list.sortBy === 'totalRobuxAmount' }"
									class="table-head-cell table-head-cell_right"
								>Buyed Total</div>
								<div
									class="table-head-cell table-head-cell_right table-head-cell_nosort"
								>Affiliate income</div>
								<!-- <div
									@click="clickSort('referralsTotalEarned')"
									:class="{ 'js-active': customersManagmentStore.list.sortBy === 'referralsTotalEarned', 'js-decrease':  !customersManagmentStore.list.sortOrder &&  customersManagmentStore.list.sortBy === 'referralsTotalEarned' }"
									class="table-head-cell table-head-cell_right"
								>Affiliate income</div> -->
								<div
									@click="clickSort('totalDeposit')"
									:class="{ 'js-active': customersManagmentStore.list.sortBy === 'totalDeposit', 'js-decrease':  customersManagmentStore.list.sortOrder &&  customersManagmentStore.list.sortBy === 'totalDeposit' }"
									class="table-head-cell table-head-cell_right"
								>Deposited Total</div>
							</div>
							<div
								v-if="customersManagmentStore.list.data?.length > 0"
								class="table-body"
							>
								<div
									v-for="(item, index) in customersManagmentStore.list.data"
									:key="item.id"
									:class="{ 'js-selected': isRowSelected(item.id)}"
									class="table-row"
								>
									<div class="table-cell table-cell_check">
										<label
											class="ml-table-checkbox"
										>
											<input
												@change="customersManagmentStore.changeItem"
												v-model="customersManagmentStore.list.selected"
												:value="item.id"
												type="checkbox"
												class="ml-table-checkbox__input"
											>
											<span class="ml-table-checkbox__el"></span>
										</label>
									</div>
									<div class="table-cell table-cell_btns">
										<div class="table-cell-settings">
											<button
												v-if="item.isFrozen"
												@click.stop="customersManagmentStore.unfreezeUser(item.id, item.login)"
												class="table-cell__btn icon-btn icon-btn_freeze js-active"
											></button>
											<button
												v-else
												@click.stop="customersManagmentStore.freezeUser(item.id, item.login)"
												class="table-cell__btn icon-btn icon-btn_freeze"
											></button>
											<button
												@click.stop="customersManagmentStore.deleteSelected([item.id])"
												class="table-cell__btn icon-btn icon-btn_del"
											></button>
											<div
												:class="{ 'js-active': customersManagmentStore.isSettingsShow === item.id }"
												class="table-cell-btn-settings-wrap"
											>
												<button
													@click.stop="customersManagmentStore.showSettings(item.id)"
													class="table-cell__btn icon-btn icon-btn_settings"
												></button>
												<transition name="scaley" appear>
													<div
														v-if="customersManagmentStore.isSettingsShow === item.id"
														class="users-managment-settings"
													>
														<div class="users-managment-settings-item">
															<span class="users-managment-settings-item__title">Admin</span>
															<input
																v-model="item.isAdmin"
																@change="customersManagmentStore.setRole(index)"
																type="checkbox"
															>
														</div>
														<div class="users-managment-settings-item">
															<span class="users-managment-settings-item__title">Owner</span>
															<input
																v-model="item.isOwner"
																@change="customersManagmentStore.setRole(index)"
																type="checkbox"
															>
														</div>
													</div>
												</transition>
											</div>
											<button
												@click.stop="customersManagmentStore.toggleFee(index, item.id)"
												:class="{ 'js-active': item.cryptoTopupFeePercent !== null || item.cryptoTopupFeeFixed !== null }"
												class="table-cell__btn icon-btn icon-btn_dollar"
											></button>
										</div>
									</div>
									<div class="table-cell">{{ item.login }}</div>
									<div class="table-cell table-cell_right table-cell-edit">
										<div
											v-if="item.editBalance"
											class="table-cell-edit-yes"
										>
											<input
												value=""
												@input="(el) => item.balance = Number(el.target.value)"
												class="users-editable-input__el"
												type="number"
												step="any"
												min="0"
												max="99999999"
												placeholder="Enter value..."
												autofocus
											>
											<button
												@click.stop="customersManagmentStore.changeBalance(item.id, item.balance), item.editBalance = false"
												class="edit-admin-btn icon-btn_edit"
											></button>
										</div>
										<div
											v-else
											class="table-cell-edit-no"
										>
											<span class="users-editable-text__el">${{ item.balance }}</span>
											<button
												@click.stop="item.editBalance = true"
												class="edit-admin-btn icon-btn_edit"
											></button>
										</div>
									</div>
									<div class="table-cell table-cell_right table-cell-edit">
										<div
											v-if="item.editFeePercent"
											class="table-cell-edit-yes"
										>
											<input
												value=""
												@input="(el) => item.cryptoTopupFeePercent = Number(el.target.value)"
												class="users-editable-input__el"
												type="number"
												step="any"
												min="0"
												max="99"
												placeholder="Enter value..."
												autofocus
											>
											<button
												@click.stop="customersManagmentStore.changeFee(item.id, item.cryptoTopupFeePercent, item.cryptoTopupFeeFixed), item.editFeePercent = false"
												class="edit-admin-btn icon-btn_edit"
											></button>
										</div>
										<div
											v-else-if="!item.editFeePercent && item.cryptoTopupFeePercent !== null"
											class="table-cell-edit-no"
										>
											<span class="users-editable-text__el">{{ item.cryptoTopupFeePercent }}%</span>
											<button
												@click.stop="item.editFeePercent = true"
												class="edit-admin-btn icon-btn_edit"
											></button>
										</div>
										<div
											v-else
											class="table-cell-edit-empty"
										>—</div>
									</div>
									<div class="table-cell table-cell_right table-cell-edit">
										<div
											v-if="item.editFeeFixed"
											class="table-cell-edit-yes"
										>
											<input
												value=""
												@input="(el) => item.cryptoTopupFeeFixed = Number(el.target.value)"
												class="users-editable-input__el"
												type="number"
												step="any"
												min="0"
												max="999"
												placeholder="Enter value..."
												autofocus
											>
											<button
												@click.stop="customersManagmentStore.changeFee(item.id, item.cryptoTopupFeePercent, item.cryptoTopupFeeFixed), item.editFeeFixed = false"
												class="edit-admin-btn icon-btn_edit"
											></button>
										</div>
										<div
											v-else-if="!item.editFeeFixed && item.cryptoTopupFeeFixed !== null"
											class="table-cell-edit-no"
										>
											<span class="users-editable-text__el">{{ item.cryptoTopupFeeFixed }}</span>
											<button
												@click.stop="item.editFeeFixed = true"
												class="edit-admin-btn icon-btn_edit"
											></button>
										</div>
										<div
											v-else
											class="table-cell-edit-empty"
										>—</div>
									</div>
									<div class="table-cell table-cell_right">{{ item.totalRobuxAmount }} R$</div>
									<div class="table-cell table-cell_right">${{ item.referralsTotalEarned }}</div>
									<div class="table-cell table-cell_right">${{ item.totalDeposit }}</div>
								</div>
							</div>
							<div
								v-else
								class="table-body"
							>
								<div class="table-row table-row_empty">
									<div class="table-cell tablepanel__empty">
										<span>List is empty</span>
									</div>
									<div class="table-cell"></div>
									<div class="table-cell">—</div>
									<div class="table-cell table-cell_right">—</div>
									<div class="table-cell table-cell_right">—</div>
									<div class="table-cell table-cell_right">—</div>
									<div class="table-cell table-cell_right">—</div>
									<div class="table-cell table-cell_right">—</div>
									<div class="table-cell table-cell_right">—</div>
								</div>
							</div>
						</div>
					</transition>
				</div>
				<PagenatorBlock
					v-if="isMobile"
					:total-pages="customersManagmentStore.list.meta.totalPages"
					:per-page="customersManagmentStore.list.meta.limit"
					:current-page="customersManagmentStore.list.meta.page"
					:maxVisibleButtons="3"
					@pagechanged="(val) => customersManagmentStore.onPageChange(val)"
				></PagenatorBlock>
			</div>
		</div>
		<transition name="fade" appear>
			<div
				v-if="customersManagmentStore.isDeleteConfirmShow"
				@click.self="customersManagmentStore.cancelDelete"
				class="merch-delete-bg ml-blur-bg"
			>
				<ModalDelete
					@close-modal="customersManagmentStore.cancelDelete"
					@confirm-delete="customersManagmentStore.confirmDelete"
				>
					<div class="ml-modal-delete-desc"><span class="violet">Are you sure</span> you want to delete the selected account/accounts?</div>
				</ModalDelete>
			</div>
		</transition>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useUsersStore, useCustomersManagmentStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'
import ModalDelete from '@/components/ui/ModalDelete.vue'

export default {
	name: 'CustomersManagment',
	components: {
		PagenatorBlock,
		BtnLoader,
		ModalDelete
	},
	setup() {
		const usersStore = useUsersStore()
		const customersManagmentStore = useCustomersManagmentStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const searchStr = ref('')


		const isRowSelected = (id) => {
			if(customersManagmentStore.list.selected.indexOf(id) !== -1) {
				return true
			} else {
				return false
			}
		}

		const clickSort = (el) => {
			if(customersManagmentStore.list.sortBy === el) {
				customersManagmentStore.list.sortOrder = !customersManagmentStore.list.sortOrder
			} else {
				customersManagmentStore.list.sortOrder = false
				customersManagmentStore.list.sortBy = el
			}
			customersManagmentStore.getData()
		}


		customersManagmentStore.getData()
		
		
		return {
			usersStore,
			customersManagmentStore,
			isMobile,
			
			searchStr,
			isRowSelected,
			clickSort
		}
	}
}
</script>