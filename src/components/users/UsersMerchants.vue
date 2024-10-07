<template>
	<div class="users-merchants tablepanel ml-block">
		<div
			v-if="isMobile"
			class="cpanel-back"
		>
			<span
				@click="usersStore.pageVisibility = 'UsersStart'"
				class="tl__back icon-back"
			>Go Back</span>
			<div class="mobile-title">
				<div class="mobile-title__text">Merchants</div>
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
					@click.stop="merchantsManagmentStore.deleteSelected()"
					:disabled="merchantsManagmentStore.list.selected.length === 0"
					:btnId="'merchantsManagmentDeleteBtn'"
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
						@click="merchantsManagmentStore.listReset(), merchantsManagmentStore.getData()"
						class="ml-btn ml-btn_small ml-btn_violet"
					>Merchants list</button>
				</div>
				<form
					@submit.prevent="merchantsManagmentStore.searchKeyword(searchStr)"
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
					:total-pages="merchantsManagmentStore.list.meta.totalPages"
					:per-page="merchantsManagmentStore.list.meta.limit"
					:current-page="merchantsManagmentStore.list.meta.page"
					@pagechanged="(val) => merchantsManagmentStore.onPageChange(val)"
				></PagenatorBlock>
			</div>
			<div class="profile-mobile-box">
				<div class="add-scrollbar-x table-wrap">
					<transition name="table">
						<div
							v-if="!merchantsManagmentStore.list.animated"
							class="table table-merchants-managment"
						>
							<div class="table-head">
								<div
									@click="merchantsManagmentStore.checkAll()"
									:class="{ 'js-active': merchantsManagmentStore.list.checkAll }"
									class="table-head-cell table-head-cell_check"
								>All</div>
								<div
									class="table-head-cell table-head-cell_btns"
								>Actions</div>
								<div
									@click="clickSort('login')"
									:class="{ 'js-active':  merchantsManagmentStore.list.sortBy === 'login', 'js-decrease':  merchantsManagmentStore.list.sortOrder &&  merchantsManagmentStore.list.sortBy === 'login' }"
									class="table-head-cell"
								>Owner login</div>
								<div
									@click="clickSort('projectName')"
									:class="{ 'js-active': merchantsManagmentStore.list.sortBy === 'projectName', 'js-decrease':  merchantsManagmentStore.list.sortOrder &&  merchantsManagmentStore.list.sortBy === 'projectName' }"
									class="table-head-cell"
								>Merchant name</div>
								<div
									@click="clickSort('projectUrl')"
									:class="{ 'js-active': merchantsManagmentStore.list.sortBy === 'projectUrl', 'js-decrease':  merchantsManagmentStore.list.sortOrder &&  merchantsManagmentStore.list.sortBy === 'projectUrl' }"
									class="table-head-cell"
								>Merchant URL</div>
								<div
									@click="clickSort('minRate')"
									:class="{ 'js-active': merchantsManagmentStore.list.sortBy === 'minRate', 'js-decrease':  merchantsManagmentStore.list.sortOrder &&  merchantsManagmentStore.list.sortBy === 'minRate' }"
									class="table-head-cell"
								>Min rate (buy)</div>
								<div
									@click="clickSort('maxRate')"
									:class="{ 'js-active': merchantsManagmentStore.list.sortBy === 'maxRate', 'js-decrease':  merchantsManagmentStore.list.sortOrder &&  merchantsManagmentStore.list.sortBy === 'maxRate' }"
									class="table-head-cell"
								>Max rate (buy)</div>
								<div
									@click="clickSort('buyedRobuxAmount')"
									:class="{ 'js-active': merchantsManagmentStore.list.sortBy === 'buyedRobuxAmount', 'js-decrease':  merchantsManagmentStore.list.sortOrder &&  merchantsManagmentStore.list.sortBy === 'buyedRobuxAmount' }"
									class="table-head-cell"
								>Buyed R$</div>
								<div
									@click="clickSort('spentCreditsAmount')"
									:class="{ 'js-active': merchantsManagmentStore.list.sortBy === 'spentCreditsAmount', 'js-decrease':  merchantsManagmentStore.list.sortOrder &&  merchantsManagmentStore.list.sortBy === 'spentCreditsAmount' }"
									class="table-head-cell table-head-cell_right"
								>Spent credits</div>
							</div>
							<div
								v-if=" merchantsManagmentStore.list.data?.length > 0"
								class="table-body"
							>
								<div
									v-for="item in merchantsManagmentStore.list.data"
									:key="item.id"
									:class="{ 'js-selected': isRowSelected(item.id)}"
									class="table-row"
								>
									<div class="table-cell table-cell_check">
										<label
											class="ml-table-checkbox"
										>
											<input
												@change="merchantsManagmentStore.changeItem"
												v-model="merchantsManagmentStore.list.selected"
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
												@click.stop="merchantsManagmentStore.deleteSelected([item.id])"
												class="table-cell__btn icon-btn icon-btn_del"
											></button>
											<button
												@click.stop="merchantsManagmentStore.freezeUser([item.id], item.login)"
												class="table-cell__btn icon-btn icon-btn_freeze"
											></button>
										</div>
									</div>
									<div class="table-cell">{{ item.login }}</div>
									<div class="table-cell">{{ item.projectName }}</div>
									<div class="table-cell">
										<div class="table-cell-copy">
											<span class="table-cell-copy__val">{{ item.projectUrl }}</span>
											<IconCopypaste
												@click="merchantsManagmentStore.copyUrl(item.projectUrl)"
											></IconCopypaste>
										</div>
									</div>
									<div class="table-cell table-cell-edit table-cell-edit_left">
										<div
											v-if="item.editMinRate"
											class="table-cell-edit-yes"
										>
											<input
												value=""
												@input="(el) => item.minRate = Number(el.target.value)"
												class="users-editable-input__el"
												type="number"
												step="any"
												min="0"
												max="9"
												maxlength="4"
												placeholder="Enter value..."
												autofocus
											>
											<button
												@click.stop="merchantsManagmentStore.changeRate([item.id], item.minRate, item.maxRate), item.editMinRate = false"
												class="edit-admin-btn icon-btn_edit"
											></button>
										</div>
										<div
											v-else
											class="table-cell-edit-no"
										>
											<span class="users-editable-text__el">{{ item.minRate }}</span>
											<button
												@click.stop="item.editMinRate = true"
												class="edit-admin-btn icon-btn_edit"
											></button>
										</div>
									</div>
									<div class="table-cell table-cell-edit table-cell-edit_left">
										<div
											v-if="item.editMaxRate"
											class="table-cell-edit-yes"
										>
											<input
												value=""
												@input="(el) => item.maxRate = Number(el.target.value)"
												class="users-editable-input__el"
												type="number"
												step="any"
												min="0"
												max="9"
												maxlength="4"
												placeholder="Enter value..."
												autofocus
											>
											<button
												@click.stop="merchantsManagmentStore.changeRate([item.id], item.minRate, item.maxRate), item.editMaxRate = false"
												class="edit-admin-btn icon-btn_edit"
											></button>
										</div>
										<div
											v-else
											class="table-cell-edit-no"
										>
											<span class="users-editable-text__el">{{ item.maxRate }}</span>
											<button
												@click.stop="item.editMaxRate = true"
												class="edit-admin-btn icon-btn_edit"
											></button>
										</div>
									</div>
									<div class="table-cell">{{ item.buyedRobuxAmount }} R$</div>
									<div class="table-cell table-cell_right">${{ item.spentCreditsAmount }}</div>
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
									<div class="table-cell">—</div>
								</div>
							</div>
						</div>
					</transition>
				</div>
				<PagenatorBlock
					v-if="isMobile"
					:total-pages="merchantsManagmentStore.list.meta.totalPages"
					:per-page="merchantsManagmentStore.list.meta.limit"
					:current-page="merchantsManagmentStore.list.meta.page"
					:maxVisibleButtons="3"
					@pagechanged="(val) => merchantsManagmentStore.onPageChange(val)"
				></PagenatorBlock>
			</div>
		</div>
		<transition name="fade" appear>
			<div
				v-if="merchantsManagmentStore.isDeleteConfirmShow"
				@click.self="merchantsManagmentStore.cancelDelete"
				class="merch-delete-bg ml-blur-bg"
			>
				<ModalDelete
					@close-modal="merchantsManagmentStore.cancelDelete"
					@confirm-delete="merchantsManagmentStore.confirmDelete"
				>
					<div class="ml-modal-delete-desc"><span class="violet">Are you sure</span> you want to delete the selected account/accounts?</div>
				</ModalDelete>
			</div>
		</transition>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useUsersStore, useMerchantsManagmentStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'
import ModalDelete from '@/components/ui/ModalDelete.vue'
import IconCopypaste from '@/components/svg/IconCopypaste.vue'

export default {
	name: 'UsersMerchants',
	components: {
		PagenatorBlock,
		BtnLoader,
		ModalDelete,
		IconCopypaste
	},
	setup() {
		const usersStore = useUsersStore()
		const merchantsManagmentStore = useMerchantsManagmentStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const searchStr = ref('')


		const isRowSelected = (id) => {
			if(merchantsManagmentStore.list.selected.indexOf(id) !== -1) {
				return true
			} else {
				return false
			}
		}

		const clickSort = (el) => {
			if(merchantsManagmentStore.list.sortBy === el) {
				merchantsManagmentStore.list.sortOrder = !merchantsManagmentStore.list.sortOrder
			} else {
				merchantsManagmentStore.list.sortOrder = false
				merchantsManagmentStore.list.sortBy = el
			}
			merchantsManagmentStore.getData()
		}


		merchantsManagmentStore.getData()
		
		return {
			usersStore,
			merchantsManagmentStore,
			isMobile,
			
			searchStr,
			isRowSelected,
			clickSort
		}
	}
}
</script>