<template>
	<div class="users-vendors-managment tablepanel ml-block">
		<div
			v-if="isMobile"
			class="cpanel-back"
		>
			<span
				@click="usersStore.pageVisibility = 'UsersStart'"
				class="tl__back icon-back"
			>Go Back</span>
			<div class="mobile-title">
				<div class="mobile-title__text">Suppliers</div>
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
					@click.stop="vendorsManagmentStore.freezeSelected()"
					:disabled="vendorsManagmentStore.list.selected.length === 0"
					:btnId="'vendorsManagmentFreezeBtn'"
					class="tablepanel__btn ml-btn icon-freeze"
				>
					<span>Freeze selected</span>
				</BtnLoader>
				<BtnLoader
					@click.stop="vendorsManagmentStore.unfreezeSelected()"
					:disabled="vendorsManagmentStore.list.selected.length === 0"
					:btnId="'vendorsManagmentUnfreezeBtn'"
					class="tablepanel__btn ml-btn icon-lightning"
				>
					<span>Unfreeze selected</span>
				</BtnLoader>
			</div>
		</div>
		<div class="tablepanel-list">
			<div class="tablepanel-subheader">
				<div class="users-toggle-btns">
					<button
						@click="usersStore.pageVisibility = 'VendorsRequest'"
						class="ml-btn ml-btn_small"
					>Suppliers Requests</button>
					<button
						class="ml-btn ml-btn_small ml-btn_violet pointer-events-none"
					>Suppliers managment</button>
				</div>
				<form
					@submit.prevent="vendorsManagmentStore.searchKeyword(searchStr)"
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
					:total-pages="vendorsManagmentStore.list.meta.totalPages"
					:per-page="vendorsManagmentStore.list.meta.limit"
					:current-page="vendorsManagmentStore.list.meta.page"
					@pagechanged="(val) => vendorsManagmentStore.onPageChange(val)"
				></PagenatorBlock>
			</div>
			<div class="profile-mobile-box">
				<div class="add-scrollbar-x table-wrap">
					<transition name="table">
						<div
							v-if="!vendorsManagmentStore.list.animated"
							class="table table-vendors-managment"
						>
							<div class="table-head">
								<div
									@click="vendorsManagmentStore.checkAll()"
									:class="{ 'js-active': vendorsManagmentStore.list.checkAll }"
									class="table-head-cell table-head-cell_check"
								>All</div>
								<div
									class="table-head-cell table-head-cell_btns"
								>Actions</div>
								<div
									@click="clickSort('login')"
									:class="{ 'js-active':  vendorsManagmentStore.list.sortBy === 'login', 'js-decrease':  vendorsManagmentStore.list.sortOrder &&  vendorsManagmentStore.list.sortBy === 'login' }"
									class="table-head-cell"
								>Supplier login</div>
								<div
									@click="clickSort('balance')"
									:class="{ 'js-active': vendorsManagmentStore.list.sortBy === 'balance', 'js-decrease':  vendorsManagmentStore.list.sortOrder &&  vendorsManagmentStore.list.sortBy === 'balance' }"
									class="table-head-cell"
								>Balance</div>
								<div
									@click="clickSort('listedRobuxAmount')"
									:class="{ 'js-active': vendorsManagmentStore.list.sortBy === 'listedRobuxAmount', 'js-decrease':  vendorsManagmentStore.list.sortOrder &&  vendorsManagmentStore.list.sortBy === 'listedRobuxAmount' }"
									class="table-head-cell"
								>Listed R$</div>
								<div
									class="table-head-cell table-head-cell_nosort"
								>Listed accounts</div>
								<div
									@click="clickSort('soldRobuxAmount')"
									:class="{ 'js-active': vendorsManagmentStore.list.sortBy === 'soldRobuxAmount', 'js-decrease':  !vendorsManagmentStore.list.sortOrder &&  vendorsManagmentStore.list.sortBy === 'soldRobuxAmount' }"
									class="table-head-cell"
								>Sold</div>
								<div
									@click="clickSort('totalEarned')"
									:class="{ 'js-active': vendorsManagmentStore.list.sortBy === 'totalEarned', 'js-decrease':  vendorsManagmentStore.list.sortOrder &&  vendorsManagmentStore.list.sortBy === 'totalEarned' }"
									class="table-head-cell table-head-cell_right"
								>Earned</div>
							</div>
							<div
								v-if="vendorsManagmentStore.list.data?.length > 0"
								class="table-body"
							>
								<div
									v-for="item in vendorsManagmentStore.list.data"
									:key="item.id"
									:class="{ 'js-selected': isRowSelected(item.id)}"
									class="table-row"
								>
									<div class="table-cell table-cell_check">
										<label
											class="ml-table-checkbox"
										>
											<input
												@change="vendorsManagmentStore.changeItem"
												v-model="vendorsManagmentStore.list.selected"
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
												@click.stop="vendorsManagmentStore.unfreezeUser(item.id, item.login)"
												class="table-cell__btn icon-btn icon-btn_freeze js-active"
											></button>
											<button
												v-else
												@click.stop="vendorsManagmentStore.freezeUser(item.id, item.login)"
												class="table-cell__btn icon-btn icon-btn_freeze"
											></button>
											<button
												@click.stop="vendorsManagmentStore.deleteSelected([item.id])"
												class="table-cell__btn icon-btn icon-btn_del"
											></button>
										</div>
									</div>
									<div class="table-cell">{{ item.login }}</div>
									<div class="table-cell table-cell-edit table-cell-edit_left">
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
												@click.stop="vendorsManagmentStore.changeBalance(item.id, item.balance), item.editBalance = false"
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
									<div class="table-cell">{{ item.listedRobuxAmount }} R$</div>
									<div class="table-cell">
										<button
											@click.stop="vendorsManagmentStore.showAccountsModal(item.id, item.login)"
											class="users-show-btn"
										>
											<span>Show</span>
											<IconQuestion></IconQuestion>
										</button>
									</div>
									<div class="table-cell">{{ item.soldRobuxAmount }} R$</div>
									<div class="table-cell table-cell_right">${{ item.totalEarned }}</div>
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
									<div class="table-cell">—</div>
									<div class="table-cell">—</div>
									<div class="table-cell">—</div>
									<div class="table-cell">—</div>
									<div class="table-cell">—</div>
								</div>
							</div>
						</div>
					</transition>
				</div>
				<PagenatorBlock
					v-if="isMobile"
					:total-pages="vendorsManagmentStore.list.meta.totalPages"
					:per-page="vendorsManagmentStore.list.meta.limit"
					:current-page="vendorsManagmentStore.list.meta.page"
					:maxVisibleButtons="3"
					@pagechanged="(val) => vendorsManagmentStore.onPageChange(val)"
				></PagenatorBlock>
			</div>
		</div>
		<transition name="fade" appear>
			<div
				v-if="vendorsManagmentStore.isDeleteConfirmShow"
				@click.self="vendorsManagmentStore.cancelDelete"
				class="merch-delete-bg ml-blur-bg"
			>
				<ModalDelete
					@close-modal="vendorsManagmentStore.cancelDelete"
					@confirm-delete="vendorsManagmentStore.confirmDelete"
				>
					<div class="ml-modal-delete-desc"><span class="violet">Are you sure</span> you want to delete the selected account/accounts?</div>
				</ModalDelete>
			</div>
		</transition>
		<transition name="fade" appear>
			<div
				v-if="vendorsManagmentStore.isAccountsModalShow"
				@click.self="vendorsManagmentStore.toggleShowAccountsModal(false)"
				class="users-accounts-bg ml-blur-bg"
			>
				<ModalAccounts
					@close-modal="vendorsManagmentStore.toggleShowAccountsModal(false)"
				></ModalAccounts>
			</div>
		</transition>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useUsersStore, useVendorsManagmentStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'
import ModalDelete from '@/components/ui/ModalDelete.vue'
import ModalAccounts from '@/components/users/ModalAccounts.vue'
import IconQuestion from '@/components/svg/IconQuestion.vue'

export default {
	name: 'VendorsManagment',
	components: {
		PagenatorBlock,
		BtnLoader,
		ModalDelete,
		ModalAccounts,
		IconQuestion
	},
	setup() {
		const usersStore = useUsersStore()
		const vendorsManagmentStore = useVendorsManagmentStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const searchStr = ref('')


		const isRowSelected = (id) => {
			if(vendorsManagmentStore.list.selected.indexOf(id) !== -1) {
				return true
			} else {
				return false
			}
		}

		const clickSort = (el) => {
			if(vendorsManagmentStore.list.sortBy === el) {
				vendorsManagmentStore.list.sortOrder = !vendorsManagmentStore.list.sortOrder
			} else {
				vendorsManagmentStore.list.sortOrder = false
				vendorsManagmentStore.list.sortBy = el
			}
			vendorsManagmentStore.getData()
		}


		vendorsManagmentStore.getData()
		
		
		return {
			usersStore,
			vendorsManagmentStore,
			isMobile,
			
			searchStr,
			isRowSelected,
			clickSort
		}
	}
}
</script>