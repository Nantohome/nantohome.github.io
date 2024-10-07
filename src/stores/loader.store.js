// stores/loader.store.js
import { defineStore } from 'pinia'

export const useLoaderStore = defineStore({
	id: 'loader',
	state: () => ({
		isLoaderVisible: false,
		loaderId: null,
		loaderDuration: 500
	}),
	actions: {
		async setLoader(bool, id) {
			const loaderStore = useLoaderStore()
			
			if(bool) {
				this.loaderId = id
				this.isLoaderVisible = true
			} else {
				await loaderStore.loaderDelay().then(() => {
					this.isLoaderVisible = false
				})
			}
		},
		loaderDelay() {
			return new Promise(resolve => setTimeout(resolve, this.loaderDuration))
		}
	}
})