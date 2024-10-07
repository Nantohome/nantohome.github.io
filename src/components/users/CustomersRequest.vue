<template>
	<div class="users-customers-request tablepanel ml-block">
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
					@click.stop="customersRequestStore.verifySelected()"
					:disabled="customersRequestStore.list.selected.length === 0"
					:btnId="'customersRequestVerifyBtn'"
					class="tablepanel__btn ml-btn icon-lightning"
				>
					<span>Verify selected</span>
				</BtnLoader>
				<BtnLoader
					@click.stop="customersRequestStore.refuseSelected()"
					:disabled="customersRequestStore.list.selected.length === 0"
					:btnId="'customersRequestRefuseBtn'"
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
						@click="usersStore.pageVisibility = 'CustomersManagment'"
						class="ml-btn ml-btn_small"
					>Customers managment</button>
					<button
						class="ml-btn ml-btn_small ml-btn_violet pointer-events-none"
					>Customers Requests</button>
				</div>
				<form
					@submit.prevent="customersRequestStore.searchKeyword(searchStr)"
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
					:total-pages="customersRequestStore.list.meta.totalPages"
					:per-page="customersRequestStore.list.meta.limit"
					:current-page="customersRequestStore.list.meta.page"
					@pagechanged="(val) => customersRequestStore.onPageChange(val)"
				></PagenatorBlock>
			</div>
			<div class="profile-mobile-box">
				<div class="add-scrollbar-x table-wrap">
					<transition name="table">
						<div
							v-if="!customersRequestStore.list.animated"
							class="table table-customers-request"
						>
							<div class="table-head">
								<div
									@click="customersRequestStore.checkAll()"
									:class="{ 'js-active': customersRequestStore.list.checkAll }"
									class="table-head-cell table-head-cell_check"
								>All</div>
								<div
									class="table-head-cell table-head-cell_btns"
								>Actions</div>
								<div
									@click="clickSort('login')"
									:class="{ 'js-active':  customersRequestStore.list.sortBy === 'login', 'js-decrease':  customersRequestStore.list.sortOrder &&  customersRequestStore.list.sortBy === 'login' }"
									class="table-head-cell"
								>Username</div>
								<div
									@click="clickSort('email')"
									:class="{ 'js-active': customersRequestStore.list.sortBy === 'email', 'js-decrease':  customersRequestStore.list.sortOrder &&  customersRequestStore.list.sortBy === 'email' }"
									class="table-head-cell"
								>Email</div>
								<div
									@click="clickSort('discordUsername')"
									:class="{ 'js-active': customersRequestStore.list.sortBy === 'discordUsername', 'js-decrease':  customersRequestStore.list.sortOrder &&  customersRequestStore.list.sortBy === 'discordUsername' }"
									class="table-head-cell"
								>Discord name</div>
								<div
									class="table-head-cell table-head-cell_nosort"
								>Method</div>
								<div
									@click="clickSort('secondQuestion')"
									:class="{ 'js-active': customersRequestStore.list.sortBy === 'secondQuestion', 'js-decrease':  customersRequestStore.list.sortOrder &&  customersRequestStore.list.sortBy === 'secondQuestion' }"
									class="table-head-cell table-head-cell_right"
								>Daily buying</div>
								<div
									@click="clickSort('registrationIp')"
									:class="{ 'js-active': customersRequestStore.list.sortBy === 'registrationIp', 'js-decrease':  customersRequestStore.list.sortOrder &&  customersRequestStore.list.sortBy === 'registrationIp' }"
									class="table-head-cell table-head-cell_right"
								>User IP</div>
							</div>
							<div
								v-if="customersRequestStore.list.data?.length > 0"
								class="table-body"
							>
								<div
									v-for="item in customersRequestStore.list.data"
									:key="item.customerId"
									:class="{ 'js-selected': isRowSelected(item.customerId)}"
									class="table-row"
								>
									<div class="table-cell table-cell_check">
										<label
											class="ml-table-checkbox"
										>
											<input
												@change="customersRequestStore.changeItem"
												v-model="customersRequestStore.list.selected"
												:value="item.customerId"
												type="checkbox"
												class="ml-table-checkbox__input"
											>
											<span class="ml-table-checkbox__el"></span>
										</label>
									</div>
									<div class="table-cell table-cell_btns">
										<button
											@click.stop="customersRequestStore.verifySelected([item.customerId])"
											:class="{ 'js-active': item.isVerified && !item.isWaitingForVerify }"
											:disabled="!item.isWaitingForVerify"
											class="table-cell__btn icon-btn icon-btn_yes"
										></button>
										<button
											@click.stop="customersRequestStore.refuseSelected([item.customerId])"
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
												@click="customersRequestStore.copyEmail(item.email)"
											></IconCopypaste>
										</div>
									</div>
									<div class="table-cell">{{ item.discordUsername }}</div>
									<div class="table-cell">
										<button
											@click.stop="customersRequestStore.toggleShowMethodModal(true)"
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
					:total-pages="customersRequestStore.list.meta.totalPages"
					:per-page="customersRequestStore.list.meta.limit"
					:current-page="customersRequestStore.list.meta.page"
					:maxVisibleButtons="3"
					@pagechanged="(val) => customersRequestStore.onPageChange(val)"
				></PagenatorBlock>
			</div>
		</div>
	</div>
	<transition name="fade" appear>
		<div
			v-if="customersRequestStore.isMethodModalShow"
			@click.self="customersRequestStore.toggleShowMethodModal(false)"
			class="ml-blur-bg"
		>
			<MethodModal
				@close-modal="customersRequestStore.toggleShowMethodModal(false)"
			></MethodModal>
		</div>
	</transition>
</template>

<script>
import { ref } from 'vue'
import { useUsersStore, useCustomersRequestStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'
import IconQuestion from '@/components/svg/IconQuestion.vue'
import IconCopypaste from '@/components/svg/IconCopypaste.vue'
import MethodModal from '@/components/users/MethodModal.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'CustomersRequest',
	components: {
		PagenatorBlock,
		IconQuestion,
		IconCopypaste,
		MethodModal,
		BtnLoader
	},
	setup() {
		const usersStore = useUsersStore()
		const customersRequestStore = useCustomersRequestStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const searchStr = ref('')


		const isRowSelected = (id) => {
			if(customersRequestStore.list.selected.indexOf(id) !== -1) {
				return true
			} else {
				return false
			}
		}

		const clickSort = (el) => {
			if(customersRequestStore.list.sortBy === el) {
				customersRequestStore.list.sortOrder = !customersRequestStore.list.sortOrder
			} else {
				customersRequestStore.list.sortOrder = false
				customersRequestStore.list.sortBy = el
			}
			customersRequestStore.getData()
		}


		customersRequestStore.getData()
		
		
		return {
			usersStore,
			customersRequestStore,
			isMobile,
			
			searchStr,
			isRowSelected,
			clickSort
		}
	}
}
</script>