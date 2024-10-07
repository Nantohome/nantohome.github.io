<template>
	<div class="select">
		<div class="select__label">Choose users</div>
		<div
			@blur="blurSelectbox"
			:class="{ 'js-active-user': adminStore.customer.value || adminStore.merchant.value }"
			class="select-wrap select-wrap_tree"
			tabindex="0"
		>
			<div
				:class="[{ 'js-open': open }, { 'js-duration': isCustomerListOpen || isMerchantListOpen }]"
				:style="[open ? { height: listHeight } : null]"
				class="select-el select-el_tree"
			>
				<ul	ref="listEl" class="select-list select-list_tree">
					<li
						v-if="adminStore.customer.value"
						@click="selectUser"
						class="select-item"
					>
						<span class="select-item__title">{{ adminStore.customer.title }}</span>
					</li>
					<li
						v-if="adminStore.merchant.value"
						@click="selectUser"
						class="select-item"
					>
						<span class="select-item__title">{{ adminStore.merchant.title }}</span>
					</li>
					<li
						@click="selectAll"
						class="select-item"
					>
						<span class="select-item__title">All</span>
					</li>
					<li
						@click="selectCustomer"
						:class="{ 'js-open': isCustomerListOpen }"
						class="select-item select-item_tree"
					>
						<span class="select-item__title">Customers</span>
					</li>
					<li
						@click="selectMerchant"
						:class="{ 'js-open': isMerchantListOpen }"
						class="select-item select-item_tree"
					>
						<span class="select-item__title">Merchants</span>
					</li>
				</ul>
			</div>
			<transition name="translatex">
				<ul
					v-if="isCustomerListOpen && open"
					class="select-sublist select-sublist_customer"
				>
					<li class="select-sublist-search">
						<div class="ml-ui-inputbtn">
							<input
								@input="adminStore.getCustomerSubList(customer)"
								v-model="customer"
								class="ml-ui__input"
								type="text"
								placeholder="Find by nickname..."
							>
							<span class="ml-ui-inputbtn__btn icon-search"></span>
						</div>
					</li>
					<li
						v-for="(option, i) of adminStore.customerSubList"
						:key="i"
						@click="addCustomer(option.title, option.value)"
						class="select-item"
					>
						<span class="select-item__title">{{ option.title }}</span>
					</li>
				</ul>
			</transition>
			<transition name="translatex">
				<ul
					v-if="isMerchantListOpen && open"
					class="select-sublist select-sublist_merchant"
				>
					<li class="select-sublist-search">
						<div class="ml-ui-inputbtn">
							<input
								@input="adminStore.getMerchantSubList(merchant)"
								v-model="merchant"
								class="ml-ui__input"
								type="text"
								placeholder="Find by nickname..."
							>
							<span class="ml-ui-inputbtn__btn icon-search"></span>
						</div>
					</li>
					<li
						v-for="(option, i) of adminStore.merchantSubList"
						:key="i"
						@click="addMerchant(option.title, option.value)"
						class="select-item"
					>
						<span class="select-item__title">{{ option.title }}</span>
					</li>
				</ul>
			</transition>
		</div>
	</div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated, nextTick, ref } from 'vue'
import { useAdminStore } from '@/stores'
import { SETTINGS } from '@/enums'

export default {
	name: 'AdminSelectBoxUsers',
	setup() {
		const adminStore = useAdminStore()


		const 	listEl = ref(),
				listHeight = ref(),
				open = ref(false),
				customer = ref(''),
				merchant = ref(''),
				isCustomerListOpen = ref(false),
				isMerchantListOpen = ref(false)
		
		
		const clearSelectbox = async() => {
			await Promise.all([
				customer.value = '',
				merchant.value = '',
				adminStore.resetCustomerSubList(),
				adminStore.resetMerchantSubList()
			])
			setTimeout(() => {
				isCustomerListOpen.value = false
				isMerchantListOpen.value = false
			}, SETTINGS.ANIM_TIME)
		}
		
		const closeOnEscape = async(e) => {
			if(open.value && e.keyCode === 27) {
				await clearSelectbox()
				open.value = false
			}
		}

		const blurSelectbox = async({ currentTarget, relatedTarget }) => {
			if(!currentTarget.contains(relatedTarget)) {
				await clearSelectbox()
				open.value = false
			}			
		}
		
		
		const selectAll = async() => {
			if(open.value) {
				await adminStore.getAllUsers()
				await clearSelectbox()
				open.value = false
			} else {
				await clearSelectbox()
				open.value = true
			}
		}

		const selectUser = async() => {
			if(open.value) {
				await clearSelectbox()
				open.value = false
			} else {
				await clearSelectbox()
				open.value = true
			}
		}

		const selectCustomer = async() => {
			if(isMerchantListOpen.value) {
				merchant.value = ''
				await adminStore.resetMerchantSubList()
				isMerchantListOpen.value = false
			}

			if(isCustomerListOpen.value) {
				customer.value = ''
				await adminStore.resetCustomerSubList()
				isCustomerListOpen.value = false
			} else {
				isCustomerListOpen.value = true
			}
		}

		const selectMerchant = async() => {
			if(isCustomerListOpen.value) {
				customer.value = ''
				await adminStore.resetCustomerSubList()
				isCustomerListOpen.value = false
			}

			if(isMerchantListOpen.value) {
				merchant.value = ''
				await adminStore.resetMerchantSubList()
				isMerchantListOpen.value = false
			} else {
				isMerchantListOpen.value = true
			}
		}

		const addCustomer = async(title, value) => {
			await clearSelectbox()
			open.value = false
			adminStore.addCustomerToSelect(title, value)
		}

		const addMerchant = async(title, value) => {
			await clearSelectbox()
			open.value = false
			adminStore.addMerchantToSelect(title, value)
		}


		
		
		onMounted(() =>
			listHeight.value = `${listEl.value.getBoundingClientRect().height}px`,
			document.addEventListener('keydown', closeOnEscape)
		)

		onUpdated(() =>
			nextTick().then(() => {
				listHeight.value = `${listEl.value.getBoundingClientRect().height}px`
			})
		)
		
		onUnmounted(() =>
			document.removeEventListener('keydown', closeOnEscape)
		)
		
		
		return {
			adminStore,

			listEl,
			listHeight,
			open,
			customer,
			merchant,
			blurSelectbox,

			isCustomerListOpen,
			isMerchantListOpen,

			selectAll,
			selectUser,
			selectCustomer,
			selectMerchant,
			addCustomer,
			addMerchant
		}
	}
}
</script>