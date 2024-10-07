<template>
	<div class="merch-create">
		<div class="merch-create__img"></div>
		<div class="merch-create__text">Add a new merchant to manage his settings</div>
		<button
			@click="merchStore.toggleShowProject(true)"
			class="merch-create__btn ml-btn"
		><span>Create</span></button>
	</div>
</template>

<script>
import { useMerchStore } from '@/stores'

export default {
	name: 'CreateMerch',
	components: {
		
	},
	setup() {
		const merchStore = useMerchStore()
				
		return {
			merchStore
		}
	}
}
</script>