<template>
	<div
		v-if="merchantsData.length > 0"
		class="chart"
	>
		<div
			v-for="(item, i) in merchantsData"
			:key="i"
			class="chart-item"
		>
			<div class="chart-item-label">
				<span class="chart-labels-item__text">{{ item.merchantName || item.projectName }}</span>
				<span class="chart-labels-item__val">{{ item.buyedRobuxAmount }} R$</span>
			</div>
			<div class="chart-item-color">
				<div
					:style="{ width: `calc(30px + ((100% - 30px) * ${item.percentage}))` }"
					class="chart-item-color__percent"
				>{{ (item.percentage * 100).toFixed(1) }}%</div>
			</div>
		</div>
	</div>
	<div
		v-else
		class="chart chart_nodata"
	>
		<div class="chart-item">
			<div class="chart-item-label">
				<span class="chart-labels-item__text">No DATA</span>
			</div>
			<div class="chart-item-color">
				<div
					class="chart-item-color__percent-nodata"
				>-</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ChartBlock',
	props: {
		merchantsData: Array
	}
}
</script>