import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import mkcert from'vite-plugin-mkcert'
import vue from '@vitejs/plugin-vue'
import { robots } from 'vite-plugin-robots'


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		mkcert(),
		robots()
	],
/* 	ssgOptions: {
		includedRoutes(paths) {
			return paths.filter(i => !i.includes('/panel/'))
		}
	}, */
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})
