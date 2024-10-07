<template>
	<div class="merch-block">
		<div class="merch-block-header">
			<button
				@click="merchStore.deleteMerch(data.id)"
				class="merch-block__del icon-btn icon-btn_del"
			></button>
			<EditableInput
				:val="name"
				@changeName="changeMerchName"
				class="merch-block__name"
			></EditableInput>
		</div>
		<div class="merch-block-body">
			<div class="merch-block-selects-wrap">
				<div class="merch-block-selects">
					<div
						class="merch-block-selects-field"
					>
						<label
							for="merchMinRate"
							class="ml-ui__label"
						>Min rate</label>
						<input
							:value="data.minRate"
							id="merchMinRate"
							class="merch-block-selects__input ml-ui__input"
							type="text"
							disabled
						>
					</div>
					<SelectBoxDefault
						:selectObj="selectMaxRateObj"
						@change="changeSelectMaxRate"
					></SelectBoxDefault>
				</div>
			</div>
			<div class="merch-block-api">
				<div class="ml-ui-inputbtn">
					<input
						v-model="apikey"
						class="merch-block__apikey ml-ui__input"
						type="text"
						readonly
					>
					<button
						@click="merchStore.copyApi(apikey)"
						class="ml-ui-inputbtn__btn icon-copypaste"
					></button>
				</div>
			</div>
		</div>
		<BtnLoader
			@click="merchStore.showMerchSettings(data.id)"
			:btnId="`merchBtn_${data.id}`"
			class="merch-create__btn ml-btn"
		>
			<span>Manage</span>
		</BtnLoader>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useMerchStore } from '@/stores'

import EditableInput from '@/components/ui/EditableInput.vue'
import SelectBoxDefault from '@/components/ui/SelectBoxDefault.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'MerchBlock',
	components: {
		EditableInput,
		SelectBoxDefault,
		BtnLoader
	},
	props: {
		data: Object
	},
	setup(props) {
		const merchStore = useMerchStore()

		const name = ref(props.data.projectName)
		const apikey = ref(props.data.APIKey)

		const selectMaxRateObj = ref({
			label: 'Max rate',
			list: []
		})


		const updateMaxRateObj = () => {
			let maxRate = Number(props.data.maxRate)

			merchStore.maxRates.forEach((item) => {
				let el = {}
				el.title = item.rate
				el.value = item.rate
				if(item.rate === maxRate) {
					el.default = true
				}

				selectMaxRateObj.value.list.push(el)
			})
		}

		const changeMerchName = async(val) => {
			const newName =  await merchStore.renameMerch(props.data.id, val)
			name.value = String(newName.data)
		}

		const changeSelectMaxRate = (val) => {
			merchStore.changeMaxRate(props.data.id, val)
		}


		updateMaxRateObj()


		return {
			merchStore,
			
			name,
			apikey,

			changeMerchName,

			selectMaxRateObj,
			changeSelectMaxRate
		}
	}
}

</script>
