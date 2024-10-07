import Cookies from 'js-cookie'
import { useStorage } from '@vueuse/core'

const 	KEY_TOKEN = 'access_token',
		KEY_PREFIX = 'RBXCRATE_'


export function getToken() {
	return Cookies.get(KEY_TOKEN)
}

export function setToken(token) {
	Cookies.set(KEY_TOKEN, token, { expires: 7 })
}

export function removeToken() {
	return Cookies.remove(KEY_TOKEN)
}


export function getStorage(key) {
	const storage = useStorage(KEY_PREFIX + key)
	return storage.value
}

export function setStorage(key, val) {
	const storage = useStorage(KEY_PREFIX + key)
	storage.value = val
}

export function removeStorage(key) {
	const storage = useStorage(KEY_PREFIX + key)
	storage.value = null
}


export function getSessionStorage(key) {
	const storage = sessionStorage.getItem(KEY_PREFIX + key)
	return storage
}

export function setSessionStorage(key, val) {
	sessionStorage.setItem(KEY_PREFIX + key, val)
}

export function removeSessionStorage(key) {
	sessionStorage.removeItem(KEY_PREFIX + key)
}