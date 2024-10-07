<template>
	<div class="select select_rates">
		<div class="select__label">{{ label }}</div>
		<div class="select-wrap">
			<div
				@blur="blurSelectbox"
				:class="{ 'js-open': open }"
				:style="[open ? { height: listHeight } : null]"
				class="select-el select-el_rates"
				tabindex="0"
			>
				<div
					@click="open = !open"
					class="select-value"
				>Check rates for delete</div>
				<ul	ref="listEl" class="select-list select-list_rates">
					<li
						v-for="option of list"
						:key="option.id"
						class="select-item select-item_rates"
					>
						<div class="select-item-justify">
							<span class="select-item__title">{{ option.rate }}</span>
							<input
								v-model="option.isEnabled"
								@change.stop="$emit('updateRate', option.id, option.rate, option.isEnabled)"
								type="checkbox"
								class="select-item__checkbox_rates"
							>
						</div>
					</li>
				</ul>
				<div class="select-rates-btnwrap">
					<button
						@click.prevent="$emit('deleteRates')"
						class="ml-btn"
					>
						<span>Delete</span>
					</button>
					<button
						@click.prevent="$emit('addRate')"
						class="ml-btn"
					>
						<span>Add new</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'

export default {
	name: 'SelectBoxRatesDelete',
	props:{
		label: String,
		list: Array
	},
	setup() {

		const 	listEl = ref(),
				listHeight = '288px',
				open = ref(false)
		
		
		const closeOnEscape = (e) => {
			if(open.value && e.keyCode === 27) {
				open.value = false;
			}
		}

		const blurSelectbox = async({ currentTarget, relatedTarget }) => {
			if(!currentTarget.contains(relatedTarget)) {
				open.value = false
			}			
		}

		
		onMounted(() =>
			document.addEventListener('keydown', closeOnEscape)
		)

		onUnmounted(() =>
			document.removeEventListener('keydown', closeOnEscape)
		)
		
		
		return {
			listEl,
			listHeight,
			open,
			blurSelectbox
		}
	}
}
</script>