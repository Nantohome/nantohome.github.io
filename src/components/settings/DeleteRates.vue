<template>
	<form
		@submit.prevent="settingsStore.deleteRates(arr)"
		class="delete-rates ml-modal"
	>
		<span
			@click="settingsStore.toggleShowDeleteRates(false)"
			class="ml__close icon-close"
		></span>
		<div class="ml__title">Delete rates</div>
		<div class="ml__subtitle">Check rates to be deleted</div>
		<div class="delete-rates-list">
			<label
				v-for="item of arr"
				:key="item.id"
				class="delete-rates-list-item"
			>
				<input
					v-model="item.deleting"
					type="checkbox"
					class="delete-rates-list-item__checkbox"
				>
				<span class="delete-rates-list-item__title">{{ item.rate }}</span>
			</label>
		</div>
		<BtnLoader
			:btnId="'deleteRatesBtn'"
			class="ml-btn ml-btn_violet"
		>
			<span>Submit</span>
		</BtnLoader>		
	</form>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSettingsStore } from '@/stores'

import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'DeleteRates',
	components: {
		BtnLoader
	},
	setup() {
		const settingsStore = useSettingsStore()
		const arr = ref([])


		const initDeletingArr = () => {
			settingsStore.settings.vendorRates.forEach((item) => {
				let el = item
				el.deleting = false
				
				arr.value.push(el)
			})
		}

		onMounted(() =>
			initDeletingArr()
		)
		
		onUnmounted(() =>
			arr.value = []
		)


		return {
			settingsStore,
			arr
		}
	}
}
</script>