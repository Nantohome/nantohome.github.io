<template>
	<div
		:class="{ 'js-overflow-hidden': topupStore.isTopupShow && (navbarStore.isNavbarOpen && isMobile) }"
		class="wrapper"
	>
		<div class="ml">
			<HeaderComponent
				v-if="isMobile"
			></HeaderComponent>
			<NavBar></NavBar>
			<router-view v-slot="{ Component }">
				<transition name="router" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
		<ApiMessage></ApiMessage>
		<transition name="fade" appear>
			<div
				v-if="cpanelStore.isShow && !isMobile"
				@click.self="cpanelStore.toggleShow(false)"
				class="cpanel-bg ml-blur-bg"
			></div>
		</transition>
		<transition name="translatey" appear>
			<ControlPanel
				v-if="cpanelStore.isShow"
			></ControlPanel>
		</transition>
		<transition name="router" appear>
			<div
				v-if="topupStore.isTopupShow"
				@click.self="topupStore.toggleShow(false)"
				class="ml-blur-bg"
			>
				<TopUp></TopUp>
			</div>
		</transition>
	</div>
</template>

<script>
import { ref } from 'vue'
import { mobileMatchMedia } from '@/utils/helpers'
import { useNavbarStore, useCpanelStore, useTopupStore, useDashboardStore } from '@/stores'

import HeaderComponent from '@/components/Header.vue'
import NavBar from '@/components/NavBar.vue'
import ApiMessage from '@/components/ui/ApiMessage.vue'
import ControlPanel from '@/components/ControlPanel.vue'
import TopUp from '@/components/TopUp.vue'

export default {
	name: 'MainLayout',
	components: {
		HeaderComponent,
		NavBar,
		ApiMessage,
		ControlPanel,
		TopUp
	},
	setup() {
		const navbarStore = useNavbarStore()
		const cpanelStore = useCpanelStore()
		const topupStore = useTopupStore()
		const dashboardStore = useDashboardStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const unreadMsg = ref(0)


		dashboardStore.initAction()
		navbarStore.setDiscordUser()

		
		return {
			navbarStore,
			cpanelStore,
			topupStore,

			isMobile,
			unreadMsg
		}
	}
}
</script>