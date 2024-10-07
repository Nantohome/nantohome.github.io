<template>
	<div class="ml-right">
		<div
			v-if="proxiesStore.list.data !== null"
			class="proxies tablepanel ml-block"
		>
			<div
				v-if="isMobile"
				class="mobile-title"
			>
				<div class="mobile-title__text">Proxy</div>
			</div>
			<div class="tablepanel-header">
				<div class="tablepanel-header-wrap">
					<button
						@click="proxiesStore.toggleShowAddProxy(true)"
						class="tablepanel__btn ml-btn ml-btn_violet icon-plus"
					><span>Add single proxy</span></button>
					<button
						@click="proxiesStore.toggleShowAddProxies(true)"
						class="tablepanel__btn ml-btn ml-btn_violet icon-plus"
					><span>Mass proxy addition</span></button>
				</div>
				<div class="tablepanel-header-wrap order-1">
					<BtnLoader
						:disabled="proxiesStore.list.selected.length === 0"
						@click="proxiesStore.updateSelected()"
						:btnId="'updateSelectedBtn'"
						class="tablepanel__btn ml-btn icon-recycle"
					><span>Update selected</span></BtnLoader>
					<button
						:disabled="proxiesStore.list.selected.length === 0"
						@click="proxiesStore.deleteSelected()"
						class="tablepanel__btn ml-btn icon-trash"
					><span>Delete selected</span></button>
				</div>
			</div>
			<div class="tablepanel-list">
				<div class="tablepanel-subheader">
					<div class="tablepanel-search-box">
						<form
							@submit.prevent="proxiesStore.searchHosts(searchStr)"
							class="tablepanel__search ml-ui-inputbtn"
						>
							<input
								v-model="searchStr"
								class="ml-ui__input"
								type="text"
								placeholder="Search hosts..."
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
					<PagenatorBlock
						v-if="!isMobile"
						:total-pages="proxiesStore.list.meta.totalPages"
						:per-page="proxiesStore.list.meta.limit"
						:current-page="proxiesStore.list.meta.page"
						@pagechanged="(val) => proxiesStore.onPageChange(val)"
					></PagenatorBlock>
				</div>
				<div class="profile-mobile-box">
					<div class="add-scrollbar-x table-wrap">
						<transition name="table">
							<div
								v-if="!proxiesStore.list.animated"
								class="table table-proxies"
							>
								<div class="table-head">
									<div
										@click="proxiesStore.checkAll()"
										:class="{ 'js-active': proxiesStore.list.checkAll }"
										class="table-head-cell table-head-cell_check"
									>All</div>
									<div
										@click="clickSort('host')"
										:class="{ 'js-active': proxiesStore.list.sortBy === 'host', 'js-decrease': proxiesStore.list.sortOrder && proxiesStore.list.sortBy === 'host' }"
										class="table-head-cell table-head-cell_host"
									>Host</div>
									<div
										@click="clickSort('port')"
										:class="{ 'js-active': proxiesStore.list.sortBy === 'port', 'js-decrease': proxiesStore.list.sortOrder && proxiesStore.list.sortBy === 'port' }"
										class="table-head-cell table-head-cell_port"
									>Port</div>
									<div
										@click="clickSort('username')"
										:class="{ 'js-active': proxiesStore.list.sortBy === 'username', 'js-decrease': proxiesStore.list.sortOrder && proxiesStore.list.sortBy === 'username' }"
										class="table-head-cell table-head-cell_name"
									>Username</div>
									<div
										@click="clickSort('password')"
										:class="{ 'js-active': proxiesStore.list.sortBy === 'password', 'js-decrease': proxiesStore.list.sortOrder && proxiesStore.list.sortBy === 'password' }"
										class="table-head-cell table-head-cell_pass"
									>Password</div>
									<div
										@click="clickSort('status')"
										:class="{ 'js-active': proxiesStore.list.sortBy === 'status', 'js-decrease': proxiesStore.list.sortOrder && proxiesStore.list.sortBy === 'status' }"
										class="table-head-cell table-head-cell_status"
									>Status</div>
									<div
										class="table-head-cell table-head-cell_btns"
									>Actions</div>
								</div>
								<div
									v-if="proxiesStore.list.data.length > 0"
									class="table-body"
								>
									<div
										v-for="item in proxiesStore.list.data"
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
													v-model="proxiesStore.list.selected"
													:value="item.id"
													type="checkbox"
													class="ml-table-checkbox__input"
												>
												<span class="ml-table-checkbox__el"></span>
											</label>
										</div>
										<div class="table-cell table-cell_host">{{ item.host }}</div>
										<div class="table-cell table-cell_port">{{ item.port }}</div>
										<div class="table-cell table-cell_name">{{ item.username }}</div>
										<div class="table-cell table-cell_pass">{{ item.password }}</div>
										<div
											:class="item.status"
											class="table-cell table-cell_status"
										>
											<div class="table-cell-status-box"><span>{{ item.status }}</span></div>
										</div>
										<div class="table-cell table-cell_btns">
											<button
												@click="proxiesStore.updateSelected([item.id])"
												class="table-cell__btn icon-btn icon-btn_update"
												title="Update status"
											></button>
											<button
												@click="proxiesStore.deleteSelected([item.id])"
												class="table-cell__btn icon-btn icon-btn_del"
												title="Delete proxy"
											></button>
										</div>
									</div>
								</div>
								<div
									v-else
									class="table-body"
								>
									<div class="table-row table-row_empty">
										<div class="table-cell tablepanel__empty">
											<span>You haven't added any proxy yet.</span>
										</div>
										<div class="table-cell"></div>
										<div class="table-cell table-cell_port">—</div>
										<div class="table-cell table-cell_name">—</div>
										<div class="table-cell table-cell_pass">—</div>
										<div class="table-cell table-cell_status">—</div>
										<div class="table-cell table-cell_actions">—</div>
									</div>
								</div>
							</div>
						</transition>
					</div>
					<PagenatorBlock
						v-if="isMobile"
						:total-pages="proxiesStore.list.meta.totalPages"
						:per-page="proxiesStore.list.meta.limit"
						:current-page="proxiesStore.list.meta.page"
						:maxVisibleButtons="3"
						@pagechanged="(val) => proxiesStore.onPageChange(val)"
					></PagenatorBlock>
				</div>
			</div>
		</div>
		<FooterMobile></FooterMobile>
		<transition name="fade" appear>
			<div
				v-if="proxiesStore.isAddProxyShow"
				@click.self="proxiesStore.toggleShowAddProxy(false)"
				class="ml-blur-bg"
			>
				<AddProxy></AddProxy>
			</div>
		</transition>
		<transition name="fade" appear>
			<div
				v-if="proxiesStore.isAddProxiesShow"
				@click.self="proxiesStore.toggleShowAddProxies(false)"
				class="ml-blur-bg"
			>
				<AddProxies></AddProxies>
			</div>
		</transition>
		<transition name="fade" appear>
			<div
				v-if="proxiesStore.isDeleteConfirmShow"
				@click.self="proxiesStore.cancelDelete"
				class="ml-blur-bg"
			>
				<ModalDelete
					@close-modal="proxiesStore.cancelDelete"
					@confirm-delete="proxiesStore.confirmDelete"
				>
					<div class="ml-modal-delete-desc"><span class="violet">Are you sure</span> you want to delete this proxies?</div>
				</ModalDelete>
			</div>
		</transition>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useProxiesStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'
import { LINKS } from '@/enums'

import FooterMobile from '@/components/FooterMobile.vue'
import HelpBtn from '@/components/ui/HelpBtn.vue'
import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'
import AddProxy from '@/components/proxies/AddProxy.vue'
import AddProxies from '@/components/proxies/AddProxies.vue'
import ModalDelete from '@/components/ui/ModalDelete.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'ProxiesPage',
	components: {
		FooterMobile,
		HelpBtn,
		PagenatorBlock,
		AddProxy,
		AddProxies,
		ModalDelete, BtnLoader
	},
	setup() {
		useHead({
			title: 'RBXCRATE | Proxies',
			meta: [
				{
					name: 'description',
					content: 'Website description',
				}
			]
		})

		const proxiesStore = useProxiesStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const searchStr = ref('')


		const isRowSelected = (id) => {
			if(proxiesStore.list.selected.indexOf(id) !== -1) {
				return true
			} else {
				return false
			}
		}

		const changeItem = () => {
			if(proxiesStore.list.selected.length !== proxiesStore.list.data.length) {
				proxiesStore.list.checkAll = false
			}
		}

		const clickSort = (el) => {
			if(proxiesStore.list.sortBy === el) {
				proxiesStore.list.sortOrder = !proxiesStore.list.sortOrder
			} else {
				proxiesStore.list.sortOrder = false
				proxiesStore.list.sortBy = el
			}

			proxiesStore.getData()
		}

		
		proxiesStore.listReset()
		proxiesStore.getData()


		return {
			proxiesStore,
			isMobile,
			LINKS,

			searchStr,
			changeItem,
			clickSort,
			isRowSelected
		}
	}
}
</script>