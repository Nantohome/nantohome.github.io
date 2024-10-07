<template>
	<div class="users-vendors-request tablepanel ml-block">
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
					@click.stop="vendorsRequestStore.verifySelected()"
					:disabled="vendorsRequestStore.list.selected.length === 0"
					:btnId="'vendorsRequestVerifyBtn'"
					class="tablepanel__btn ml-btn icon-lightning"
				>
					<span>Verify selected</span>
				</BtnLoader>
				<BtnLoader
					@click.stop="vendorsRequestStore.refuseSelected()"
					:disabled="vendorsRequestStore.list.selected.length === 0"
					:btnId="'vendorsRequestRefuseBtn'"
					class="tablepanel__btn ml-btn icon-off"
				>
					<span>Refuse selected</span>
				</BtnLoader>
			</div>
		</div>
		<div class="tablepanel-list">
			<div class="tablepanel-subheader">
				<div class="users-toggle-btns">
					<button
						class="ml-btn ml-btn_small ml-btn_violet pointer-events-none"
					>Suppliers Requests</button>
					<button
						@click="usersStore.pageVisibility = 'VendorsManagment'"
						class="ml-btn ml-btn_small"
					>Suppliers managment</button>
				</div>
				<form
					@submit.prevent="vendorsRequestStore.searchKeyword(searchStr)"
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
					:total-pages="vendorsRequestStore.list.meta.totalPages"
					:per-page="vendorsRequestStore.list.meta.limit"
					:current-page="vendorsRequestStore.list.meta.page"
					@pagechanged="(val) => vendorsRequestStore.onPageChange(val)"
				></PagenatorBlock>
			</div>
			<div class="profile-mobile-box">
				<div class="add-scrollbar-x table-wrap">
					<transition name="table">
						<div
							v-if="!vendorsRequestStore.list.animated"
							class="table table-vendors-request"
						>
							<div class="table-head">
								<div
									@click="vendorsRequestStore.checkAll()"
									:class="{ 'js-active': vendorsRequestStore.list.checkAll }"
									class="table-head-cell table-head-cell_check"
								>All</div>
								<div
									class="table-head-cell table-head-cell_btns"
								>Actions</div>
								<div
									@click="clickSort('login')"
									:class="{ 'js-active':  vendorsRequestStore.list.sortBy === 'login', 'js-decrease':  vendorsRequestStore.list.sortOrder &&  vendorsRequestStore.list.sortBy === 'login' }"
									class="table-head-cell"
								>Username</div>
								<div
									@click="clickSort('email')"
									:class="{ 'js-active': vendorsRequestStore.list.sortBy === 'email', 'js-decrease':  vendorsRequestStore.list.sortOrder &&  vendorsRequestStore.list.sortBy === 'email' }"
									class="table-head-cell"
								>Email</div>
								<div
									@click="clickSort('discordUsername')"
									:class="{ 'js-active': vendorsRequestStore.list.sortBy === 'discordUsername', 'js-decrease':  vendorsRequestStore.list.sortOrder &&  vendorsRequestStore.list.sortBy === 'discordUsername' }"
									class="table-head-cell"
								>Discord name</div>
								<div
									class="table-head-cell table-head-cell_nosort"
								>Method</div>
								<div
									@click="clickSort('secondQuestion')"
									:class="{ 'js-active': vendorsRequestStore.list.sortBy === 'secondQuestion', 'js-decrease':  !vendorsRequestStore.list.sortOrder &&  vendorsRequestStore.list.sortBy === 'secondQuestion' }"
									class="table-head-cell table-head-cell_right"
								>Weekly stock R$</div>
								<div
									@click="clickSort('registrationIp')"
									:class="{ 'js-active': vendorsRequestStore.list.sortBy === 'registrationIp', 'js-decrease':  vendorsRequestStore.list.sortOrder &&  vendorsRequestStore.list.sortBy === 'registrationIp' }"
									class="table-head-cell table-head-cell_right"
								>User IP</div>
							</div>
							<div
								v-if="vendorsRequestStore.list.data?.length > 0"
								class="table-body"
							>
								<div
									v-for="item in vendorsRequestStore.list.data"
									:key="item.id"
									:class="{ 'js-selected': isRowSelected(item.id)}"
									class="table-row"
								>
									<div class="table-cell table-cell_check">
										<label
											class="ml-table-checkbox"
										>
											<input
												@change="vendorsRequestStore.changeItem"
												v-model="vendorsRequestStore.list.selected"
												:value="item.id"
												type="checkbox"
												class="ml-table-checkbox__input"
											>
											<span class="ml-table-checkbox__el"></span>
										</label>
									</div>
									<div class="table-cell table-cell_btns">
										<button
											@click.stop="vendorsRequestStore.verifySelected([item.id])"
											:class="{ 'js-active': item.isVerified && !item.isWaitingForVerify }"
											:disabled="!item.isWaitingForVerify"
											class="table-cell__btn icon-btn icon-btn_yes"
										></button>
										<button
											@click.stop="vendorsRequestStore.refuseSelected([item.id])"
											:class="{ 'js-active': !item.isVerified && !item.isWaitingForVerify }"
											:disabled="!item.isWaitingForVerify"
											class="table-cell__btn icon-btn icon-btn_no"
										></button>
									</div>
									<div class="table-cell">{{ item.login }}</div>
									<div class="table-cell">
										<div class="table-cell-copy">
											<span class="table-cell-copy__val">{{ item.email }}</span>
											<IconCopypaste
												@click="vendorsRequestStore.copyEmail(item.email)"
											></IconCopypaste>
										</div>
									</div>
									<div class="table-cell">{{ item.discordUsername }}</div>
									<div class="table-cell">
										<button
											@click.stop="vendorsRequestStore.toggleShowMethodModal(true)"
											class="users-show-btn"
										>
											<span>Show</span>
											<IconQuestion></IconQuestion>
										</button>
									</div>
									<div class="table-cell table-cell_right">{{ item.secondQuestion }}</div>
									<div class="table-cell table-cell_right">{{ item.registrationIp }} <span class="semibold">{{ item.countryCode }}</span></div>
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
									<div class="table-cell table-cell_right">—</div>
									<div class="table-cell table-cell_right">—</div>
								</div>
							</div>
						</div>
					</transition>
				</div>
				<PagenatorBlock
					v-if="isMobile"
					:total-pages="vendorsRequestStore.list.meta.totalPages"
					:per-page="vendorsRequestStore.list.meta.limit"
					:current-page="vendorsRequestStore.list.meta.page"
					:maxVisibleButtons="3"
					@pagechanged="(val) => vendorsRequestStore.onPageChange(val)"
				></PagenatorBlock>
			</div>
		</div>
	</div>
	<transition name="fade" appear>
		<div
			v-if="vendorsRequestStore.isMethodModalShow"
			@click.self="vendorsRequestStore.toggleShowMethodModal(false)"
			class="ml-blur-bg"
		>
			<MethodModal
				@close-modal="vendorsRequestStore.toggleShowMethodModal(false)"
			></MethodModal>
		</div>
	</transition>
</template>

<script>
import { ref } from 'vue'
import { useUsersStore, useVendorsRequestStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'
import IconQuestion from '@/components/svg/IconQuestion.vue'
import IconCopypaste from '@/components/svg/IconCopypaste.vue'
import MethodModal from '@/components/users/MethodModal.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'VendorsRequest',
	components: {
		PagenatorBlock,
		IconQuestion,
		IconCopypaste,
		MethodModal,
		BtnLoader
	},
	setup() {
		const usersStore = useUsersStore()
		const vendorsRequestStore = useVendorsRequestStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const searchStr = ref('')


		const isRowSelected = (id) => {
			if(vendorsRequestStore.list.selected.indexOf(id) !== -1) {
				return true
			} else {
				return false
			}
		}

		const clickSort = (el) => {
			if(vendorsRequestStore.list.sortBy === el) {
				vendorsRequestStore.list.sortOrder = !vendorsRequestStore.list.sortOrder
			} else {
				vendorsRequestStore.list.sortOrder = false
				vendorsRequestStore.list.sortBy = el
			}
			vendorsRequestStore.getData()
		}


		vendorsRequestStore.getData()
		
		
		return {
			usersStore,
			vendorsRequestStore,
			isMobile,
			
			searchStr,
			isRowSelected,
			clickSort
		}
	}
}
</script>