<template>
	<TermsLayout>
		<div class="tl-title">API Documentation</div>
	</TermsLayout>
</template>

<script>
import { useHead } from '@unhead/vue'

import TermsLayout from '@/layouts/TermsLayout.vue'


export default {
	name: 'ApiPage',
	components: { TermsLayout },
	setup() {
		useHead({
			title: 'RBXCRATE | API Documentation',
			meta: [
				{
					name: 'description',
					content: 'Website description',
				}
			]
		})
	}
}
</script>