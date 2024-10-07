import './assets/css/index.css'

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'

import App from './App.vue'
import { router } from './router'
import Vue3TouchEvents from "vue3-touch-events"
import { setupCalendar } from 'v-calendar'
import { getToken } from '@/utils/storage'
import { useTopupStore } from '@/stores'



export const createApp = ViteSSG(
	App,
	{ routes: router },
	({ app, router, initialState }) => {
		const pinia = createPinia()
		pinia.use(({ store }) => {
			store.$router = markRaw(router)
		})
		app.use(pinia)
		app.use(Vue3TouchEvents)
		app.use(setupCalendar, {})

		if(import.meta.env.SSR) initialState.pinia = pinia.state.value
		else pinia.state.value = initialState.pinia || {}
		
		router.beforeEach(async(to) => {
			const topupStore = useTopupStore()
			await topupStore.toggleShow(false)

			const token = await getToken()

			if(!token && to.name === 'dashboard') {
				return { name: 'landing' }
			} else if(token && to.name === 'landing') {
				return {name: 'dashboard'}
			}
		})
	}
)