<template>
	<div class="pagenator">
		<button
			@click="onClickFirstPage"
			:disabled="isInFirstPage"
			class="pagenator__btn pagenator__btn_first"
		></button>
		<button
			@click="onClickPreviousPage"
			:disabled="isInFirstPage"
			class="pagenator__btn pagenator__btn_prev"
		></button>
		<button
			v-for="(page, index) in pages"
			:key="index"
			@click="onClickPage(page.name)"
			:class="{ 'js-active': isPageActive(page.name) }"
			class="pagenator__btn pagenator__btn_number"
		>{{ page.name }}</button>
		<button
			@click="onClickNextPage"
			:disabled="isInLastPage"
			class="pagenator__btn pagenator__btn_next"
		></button>
		<button
			@click="onClickLastPage"
			:disabled="isInLastPage"
			class="pagenator__btn pagenator__btn_last"
		></button>
	</div>
</template>

<script>
import { computed } from 'vue'

export default {
	name: 'PagenatorBlock',
	props: {
		maxVisibleButtons: {
			type: Number,
			required: false,
			default: 4
		},
		totalPages: {
			type: Number,
			required: true
		},
		total: {
			type: Number,
			required: false
		},
		perPage: {
			type: Number,
			required: true
		},
		currentPage: {
			type: Number,
			required: true
		},
	},
	setup(props, { emit }) {
		const totalPages = computed(() => {
			if(props.totalPages === 0) {
				return props.totalPages + 1
			} else {
				return props.totalPages
			}
		})

		const startPage = computed(() => {
			if(props.currentPage === 1) {
				return 1
			}

			if(props.currentPage >= (totalPages.value - props.maxVisibleButtons + 3)) { 
				return Math.max(totalPages.value - props.maxVisibleButtons + 1, 1)
			}

			return props.currentPage - 1
		})

		const endPage = computed(() => {
			return Math.min(startPage.value + props.maxVisibleButtons - 1, totalPages.value)
		})
		
		const pages = computed(() => {
			const range = []

			for(let i = startPage.value; i <= endPage.value; i += 1 ) {
				range.push({
					name: i,
					isDisabled: i === props.currentPage 
				})
			}

			return range
		})

		const isInFirstPage = computed(() => {
			return props.currentPage === 1
		})
		
		const isInLastPage = computed(() => {
			return props.currentPage === totalPages.value
		})



		const onClickFirstPage = () => {
			emit('pagechanged', 1)
		}
		const onClickPreviousPage = () => {
			emit('pagechanged', props.currentPage - 1)
		}
		const onClickPage = (page) => {
			emit('pagechanged', page)
		}
		const onClickNextPage = () => {
			emit('pagechanged', props.currentPage + 1)
		}
		const onClickLastPage = () => {
			emit('pagechanged', totalPages.value)
		}
		const isPageActive = (page) => {
			return props.currentPage === page
		}

		return {
			startPage,
			endPage,
			pages,
			isInFirstPage,
			isInLastPage,

			onClickFirstPage,
			onClickPreviousPage,
			onClickPage,
			onClickNextPage,
			onClickLastPage,
			isPageActive
		}

	}
}
</script>