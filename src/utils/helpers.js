import { ref, onMounted } from 'vue'
import { useApiMsgStore } from '@/stores'

export function mobileMatchMedia() {

	let isMediaQueryMatch = ref(null),
		mediaQuery = window.matchMedia('(max-width: 1199px)')

	const addMediaQueryListener = () => {
		mediaQuery.addEventListener('change', compareMediaQuery)
	}

	const compareMediaQuery = () => {
		isMediaQueryMatch.value = mediaQuery.matches
	}


	onMounted(addMediaQueryListener)
	onMounted(compareMediaQuery)

	return {
		isMediaQueryMatch,
		addMediaQueryListener,
		compareMediaQuery
	}
}

export function handleServerError(error) {
	const apiMsgStore = useApiMsgStore()

	let errors
	
	if(error.response?.data?.message) {
		errors = error.response?.data?.message
	} else {
		errors = error.message
	}
	
	if(Array.isArray(errors)) { // parse error answer
		let err = ''
		errors.forEach(el => {
			err += `<p>${el}</p>`
		})
		apiMsgStore.showMsg('error', 'Error', err)
	} else {
		apiMsgStore.showMsg('error', 'Error', errors)
	}
}

export function formatLocalTime(timestamp) {
	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	}
	
	let src = new Date(timestamp)
	let timeStr = `<span class="table-date"> ${src.toLocaleDateString(undefined, options)}</span><span class="table-time">${src.toLocaleTimeString()}</span>`

	return timeStr
}