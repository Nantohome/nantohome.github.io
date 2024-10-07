<template>
	<div>
		<transition name="fade" appear mode="out-in">
			<MerchList
				v-if="merchStore.settingsMerch === null"
			></MerchList>
			<MerchSettings
				v-else
			></MerchSettings>
		</transition>
	</div>
</template>

<script>
import { useHead } from '@unhead/vue'
import { useMerchStore } from '@/stores'

import MerchList from '@/components/merchants/MerchList.vue'
import MerchSettings from '@/components/merchants/MerchSettings.vue'

export default {
	name: 'MerchantsPage',
	components: {
		MerchList,
		MerchSettings
	},
	setup() {
		useHead({
			title: 'RBXCRATE | Merchants',
			meta: [
				{
					name: 'description',
					content: 'Website description'
				}
			]
		})
		
		const merchStore = useMerchStore()

		merchStore.getData()


		return {
			merchStore
		}
	}
}
</script>