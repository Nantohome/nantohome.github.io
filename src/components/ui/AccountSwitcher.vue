<template>
	<div
		:class="{ 'js-open': isListShow }"
		class="account-switcher switcher"
	>
		<div class="switcher-head">
			<span class="switcher-head__title">Switch account</span>
			<button
				@click="showList"
				class="switcher-head__btn"
			>•••</button>
		</div>
		<ul
			ref="listEl"
			class="switcher-list"
			:style="[isListShow ? { height: listHeight } : { height: '0px' }]"
		>
			<div
				v-for="(item, index) in navbarStore.user?.roles"
				:key="index"
				@click="navbarStore.changeRole(item)"
				:class="{ 'js-active': item === navbarStore.role }"
				class="switcher-list__item"
			>{{ item }}</div>
		</ul>
	</div>
</template>

<script>
import { ref, onMounted, onUpdated } from 'vue'
import { useNavbarStore } from '@/stores'

export default {
	name: 'AccountSwitcher',
	setup() {
		const navbarStore = useNavbarStore()

		const	isListShow = ref(false),
				listEl = ref(null),
				listHeight = ref('0px')

		const showList = () => {
			isListShow.value = !isListShow.value
		}

		onMounted(() =>
			listHeight.value = `${listEl.value.scrollHeight}px`,
		)
		onUpdated(() =>
			listHeight.value = `${listEl.value.scrollHeight}px`,
		)

		return {
			navbarStore,

			isListShow,
			listEl,
			listHeight,
			showList
		}
	}
}
</script>