<template>
	<svg
		ref="el"
		@click="rotate360"
		width="15"
		height="16"
		viewBox="0 0 15 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4187 0.5C12.7511 0.5 13.0206 0.769457 13.0206 1.10185V4.50642C13.0206 4.83882 12.7511 5.10827 12.4187 5.10827H9.01415C8.68175 5.10827 8.4123 4.83882 8.4123 4.50642C8.4123 4.17403 8.68175 3.90457 9.01415 3.90457H10.9083C8.62495 2.10458 5.30465 2.25791 3.198 4.36457C0.925976 6.63659 0.925976 10.3203 3.198 12.5923C5.47002 14.8643 9.1537 14.8643 11.4257 12.5923C12.9479 11.0701 13.451 8.91398 12.9322 6.97129C12.8465 6.65015 13.0373 6.32029 13.3584 6.23453C13.6796 6.14877 14.0094 6.33958 14.0952 6.66072C14.7203 9.00148 14.1152 11.6051 12.2769 13.4434C9.53477 16.1855 5.08895 16.1855 2.34686 13.4434C-0.395241 10.7013 -0.395241 6.25552 2.34686 3.51342C4.94044 0.91984 9.05819 0.77937 11.8169 3.09201V1.10185C11.8169 0.769457 12.0863 0.5 12.4187 0.5Z" fill="white" fill-opacity="0.2"/>
	</svg>
</template>

<script>
import { ref } from 'vue'

export default {
	name: 'IconUpdate',
	setup() {
		const el = ref(null)
		
		const rotate360 = () => {
			el.value.animate([
				{ transform: 'rotate(0)' },
				{ transform: 'rotate(360deg)' }
			], {
				easing: ['ease-in-out'],
				duration: 1000
			})
		}


		return {
			el,
			rotate360
		}
	}
}
</script>