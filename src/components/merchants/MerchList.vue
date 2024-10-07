<template>
	<div
		v-if="merchStore.merchants !== null"
		class="ml-right"
	>
		<div
			v-if="merchStore.merchants.length > 0"
			class="merch-list ml-block"
		>
			<CreateMerch></CreateMerch>
			<MerchBlock
				v-for="item in merchStore.merchants"
				:key="item.id"
				:data="item"
			></MerchBlock>
		</div>
		<div
			v-else
			class="ml-right-full ml-block"
		>
			<CreateMerch></CreateMerch>
		</div>
		<FooterMobile></FooterMobile>
		<transition name="fade" appear>
			<div
				v-if="merchStore.isProjectShow"
				@click.self="merchStore.toggleShowProject(false)"
				class="merch-project-bg ml-blur-bg"
			>
				<MerchProject
					@create-merch="merchStore.create"
					@close-project="merchStore.toggleShowProject(false)"
				></MerchProject>
			</div>
		</transition>
		<transition name="fade" appear>
			<div
				v-if="merchStore.isDeleteConfirmShow"
				@click.self="merchStore.cancelDelete"
				class="merch-delete-bg ml-blur-bg"
			>
				<ModalDelete
					@close-modal="merchStore.cancelDelete"
					@confirm-delete="merchStore.confirmDelete"
				>
					<div class="ml-modal-delete-desc"><span class="violet">Are you sure</span> you want to delete this merchant?</div>
				</ModalDelete>
			</div>
		</transition>
	</div>
</template>

<script>
import { mobileMatchMedia } from '@/utils/helpers'
import { useMerchStore } from '@/stores'

import FooterMobile from '@/components/FooterMobile.vue'
import MerchBlock from '@/components/merchants/blocks/MerchBlock.vue'
import CreateMerch from '@/components/merchants/blocks/CreateMerch.vue'
import MerchProject from '@/components/merchants/blocks/MerchProject.vue'
import ModalDelete from '@/components/ui/ModalDelete.vue'

export default {
	name: 'MerchantsList',
	components: {
		FooterMobile,
		MerchBlock,
		CreateMerch,
		MerchProject,
		ModalDelete
	},
	setup() {
		const merchStore = useMerchStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		return {
			merchStore,
			isMobile
		}
	}
}
</script>