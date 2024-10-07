import axios from 'axios'
import { getToken } from '@/utils/storage'

axios.defaults.timeout = 60000
axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.interceptors.request.use((request) => {
	const token = getToken()
	
	if(token) {
		request.headers = {
			...request.headers,
			Authorization: `Bearer ${token}`
		}
	}
	
	return request
})

axios.interceptors.response.use(
	(response) => { // if 200
		// ... doing something
		return Promise.resolve(response.data)
	},
	(error) => { // if 4xx 5xx
		return Promise.reject(error)
	}
)

export default axios