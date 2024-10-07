// stores/dashboard.store.js
import { defineStore } from 'pinia'
import { SETTINGS } from '@/enums'
import { useNavbarStore, useTopupStore, useApiMsgStore, useCpanelStore } from '@/stores'
import { setSessionStorage, getSessionStorage, removeSessionStorage} from '@/utils/storage'

export const useDashboardStore = defineStore({
	id: 'dashboard',
	state: () => ({
	}),
	actions: {
		async initAction() {
			await this.getCurrentNav()
			this.setCurrentNav()
			this.hideTopup()
			this.closeNavbar()
		},
		async getCurrentNav() {
			const currentNav = await getSessionStorage('CURRENT_NAV')

			let currentRoute = this.$router.currentRoute.value

			if(currentRoute.name === 'dashboard' && this.$router.hasRoute(currentNav)) {
				this.$router.push({ name: currentNav })
			}
		},
		async setCurrentNav() {
			const apiMsgStore = useApiMsgStore()
			
			apiMsgStore.apiMsg.show = false

			this.$router.afterEach((to, from, failure) => {
				if(!failure && to.path === '/panel') {
					setSessionStorage('CURRENT_NAV', to.name)
					this.closeCpanel()
					this.closeNavbar()
					this.hideTopup()
				} else {
					removeSessionStorage('CURRENT_NAV')
				}
			})
		},
		hideTopup() {
			const topupStore = useTopupStore()
			topupStore.toggleShow(false)
		},
		closeNavbar() {
			const navbarStore = useNavbarStore()

			setTimeout(() => {
				navbarStore.toggleNavbar(false)
			}, SETTINGS.ANIM_TIME)
		},
		closeCpanel() {
			const cpanelStore = useCpanelStore()

			cpanelStore.$reset()
		}
	}
})