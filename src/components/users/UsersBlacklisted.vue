<template>
	<div class="users-blacklisted tablepanel ml-block">
		<div
			v-if="isMobile"
			class="cpanel-back"
		>
			<span
				@click="usersStore.pageVisibility = 'UsersStart'"
				class="tl__back icon-back"
			>Go Back</span>
			<div class="mobile-title">
				<div class="mobile-title__text">Blacklisted</div>
			</div>
		</div>
		<div class="tablepanel-header-any">
			<div class="tablepanel-header-wrap">
				<button
					v-if="!isMobile"
					@click="usersStore.pageVisibility = 'UsersStart'"
					class="tablepanel__btn ml-btn ml-btn_violet icon-goback"
				><span>Go back</span></button>
				<button
					@click.stop="blacklistManagmentStore.isModalBlockShow = true"
					class="tablepanel__btn ml-btn icon-add"
				>
					<span>Add Subject</span>
				</button>
			</div>
		</div>
		<div class="tablepanel-list">
			<div class="tablepanel-subheader">
				<form
					@submit.prevent="blacklistManagmentStore.searchContent(searchStr)"
					class="tablepanel__search ml-ui-inputbtn"
				>
					<input
						v-model="searchStr"
						class="ml-ui__input"
						type="text"
						placeholder="Search content..."
					>
					<button
						class="ml-ui-inputbtn__btn icon-search"
					></button>
				</form>
				<PagenatorBlock
					v-if="!isMobile"
					:total-pages="blacklistManagmentStore.list.meta.totalPages"
					:per-page="blacklistManagmentStore.list.meta.limit"
					:current-page="blacklistManagmentStore.list.meta.page"
					@pagechanged="(val) => blacklistManagmentStore.onPageChange(val)"
				></PagenatorBlock>
			</div>
			<div class="profile-mobile-box">
				<div class="add-scrollbar-x table-wrap">
					<transition name="table">
						<div
							v-if="!blacklistManagmentStore.list.animated"
							class="table table-merchants-managment"
						>
							<div class="table-head">
								<div
									class="table-head-cell table-head-cell_btns"
								>Actions</div>
								<div
									@click="clickSort('type')"
									:class="{ 'js-active': blacklistManagmentStore.list.sortBy === 'type', 'js-decrease': blacklistManagmentStore.list.sortOrder && blacklistManagmentStore.list.sortBy === 'type' }"
									class="table-head-cell"
								>Detection Type</div>
								<div
									@click="clickSort('value')"
									:class="{ 'js-active': blacklistManagmentStore.list.sortBy === 'value', 'js-decrease': blacklistManagmentStore.list.sortOrder && blacklistManagmentStore.list.sortBy === 'value' }"
									class="table-head-cell"
								>Content</div>
								<div
									@click="clickSort('freezeReason')"
									:class="{ 'js-active': blacklistManagmentStore.list.sortBy === 'freezeReason', 'js-decrease': blacklistManagmentStore.list.sortOrder && blacklistManagmentStore.list.sortBy === 'freezeReason' }"
									class="table-head-cell"
								>Reason</div>
							</div>
							<div
								v-if="blacklistManagmentStore.list.data?.length > 0"
								class="table-body"
							>
								<div
									v-for="item in blacklistManagmentStore.list.data"
									:key="item.id"
									class="table-row"
								>
									<div class="table-cell table-cell_btns">
										<div class="table-cell-settings">
											<button
												@click.stop="blacklistManagmentStore.deleteItem(item.id)"
												class="table-cell__btn icon-btn icon-btn_del"
											></button>
										</div>
									</div>
									<div class="table-cell">{{ item.type }}</div>
									<div class="table-cell">{{ item.value }}</div>
									<div class="table-cell">{{ item.freezeReason }}</div>
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
								</div>
							</div>
						</div>
					</transition>
				</div>
				<PagenatorBlock
					v-if="isMobile"
					:total-pages="blacklistManagmentStore.list.meta.totalPages"
					:per-page="blacklistManagmentStore.list.meta.limit"
					:current-page="blacklistManagmentStore.list.meta.page"
					:maxVisibleButtons="3"
					@pagechanged="(val) => blacklistManagmentStore.onPageChange(val)"
				></PagenatorBlock>
			</div>
		</div>
		<transition name="fade" appear>
			<div
				v-if="blacklistManagmentStore.isModalBlockShow"
				@click.self="blacklistManagmentStore.isModalBlockShow = false"
				class="merch-delete-bg ml-blur-bg"
			>
				<ModalBlock
					@close-modal="blacklistManagmentStore.isModalBlockShow = false"
				></ModalBlock>
			</div>
		</transition>
		<transition name="fade" appear>
			<div
				v-if="blacklistManagmentStore.isDeleteConfirmShow"
				@click.self="blacklistManagmentStore.cancelDelete"
				class="merch-delete-bg ml-blur-bg"
			>
				<ModalDelete
					@close-modal="blacklistManagmentStore.cancelDelete"
					@confirm-delete="blacklistManagmentStore.confirmDelete"
				>
					<div class="ml-modal-delete-desc"><span class="violet">Are you sure</span> you want to remove this blocked item?</div>
				</ModalDelete>
			</div>
		</transition>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useUsersStore, useBlacklistManagmentStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'
import ModalBlock from '@/components/users/ModalBlock.vue'
import ModalDelete from '@/components/ui/ModalDelete.vue'

export default {
	name: 'UsersBlacklisted',
	components: {
		PagenatorBlock,
		ModalBlock,
		ModalDelete
	},
	setup() {
		const usersStore = useUsersStore()
		const blacklistManagmentStore = useBlacklistManagmentStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const searchStr = ref('')

		
		blacklistManagmentStore.getData()
		

		return {
			usersStore,
			blacklistManagmentStore,
			isMobile,

			searchStr
		}
	}
}
</script>