<template>
	<div class="graph-total">Total: <span class="graph-total__data">{{ graphObj.totalRobux }} R$</span></div>
	<div class="graph-container">
		<LineSpline
			v-if="isMobile"
			:data="dataMobile"
			:options="optionsMobile"
		></LineSpline>
		<LineSpline
			v-else
			:data="data"
			:options="options"
		></LineSpline>
	</div>
</template>

<script>
import { computed } from 'vue'
import { mobileMatchMedia } from '@/utils/helpers'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default {
	name: 'GraphBlock',
	props: {
		graphObj: Object
	},
	components: {
		LineSpline: Line
	},
	setup(props) {
		const isMobile = mobileMatchMedia().isMediaQueryMatch
		
		let width, height, gradient


		const generateLabels = () => {
			let arr = []
			props.graphObj.graphData.forEach((item) => {
				arr.push(item.dateString)
			})
			return arr
		}
		
		const generateData = () => {
			let arr = []
			props.graphObj.graphData.forEach((item) => {
				arr.push(item.robuxAmount)
			})
			return arr
		}
		
		const getBorderGradient = (ctx, chartArea) => {
			const chartWidth = chartArea.right - chartArea.left
			const chartHeight = chartArea.bottom - chartArea.top
			
			if (!gradient || width !== chartWidth || height !== chartHeight) {
				width = chartWidth
				height = chartHeight
				gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0)
				gradient.addColorStop(0, '#CB00EC')
				gradient.addColorStop(0.62, '#3F21F5')
			}

			return gradient
		}

		const data = computed(() => {
			return {
				labels: generateLabels(),
				datasets: [
					{
						cubicInterpolationMode: 'monotone',
						borderColor: function(context) {
							const chart = context.chart
							const {ctx, chartArea} = chart

							if (!chartArea) {
								return
							}
							return getBorderGradient(ctx, chartArea)
						},
						borderWidth: 3,
						backgroundColor: 'rgba(108, 84, 246, 0.25)',
						fill: true,
						pointStyle: 'circle',
						pointRadius: 4,
						pointBorderWidth: 0,
						pointBackgroundColor: '#FFFFFF',
						pointHoverRadius: 8,
						pointHoverBorderWidth: 0,
						pointHitRadius: 12,
						data: generateData()
					}
				]
			}
		})

		const dataMobile = computed(() => {
			return {
				labels: generateLabels(),
				datasets: [
					{
						cubicInterpolationMode: 'monotone',
						borderColor: function(context) {
							const chart = context.chart
							const {ctx, chartArea} = chart

							if (!chartArea) {
								return
							}
							return getBorderGradient(ctx, chartArea)
						},
						borderWidth: 1,
						backgroundColor: 'rgba(108, 84, 246, 0.25)',
						fill: true,
						pointStyle: 'circle',
						pointRadius: 0,
						pointBorderWidth: 0,
						pointBackgroundColor: '#FFFFFF',
						pointHoverRadius: 3,
						pointHoverBorderWidth: 0,
						pointHitRadius: 12,
						data: generateData()
					}
				]
			}
		})

		const options = computed(() => {
			return {
				layout: {
					padding: 0
				},
				plugins:{
					legend: {
						display: false
					},
					tooltip: {
						displayColors: false,
						caretPadding: 20,
						callbacks: {
							title: () => {
								return ''
							},
							label: function(tooltipItem) { 
								return  `${props.graphObj.graphData[tooltipItem.dataIndex].robuxAmount} R$ / ${props.graphObj.graphData[tooltipItem.dataIndex].ordersCount} Orders`
							}
						},
						xAlign: 'center',
						yAlign: 'bottom',
						backgroundColor: '#090909',
						bodyAlign: 'center',
						bodyColor: 'rgba(255, 255, 255, 0.85)',
						bodyFont: {
							family: 'Montserrat',
							weight: 400,
							size: 16
						},
						borderWidth: 1,
						caretSize: 0,
						cornerRadius: 17,
						padding: {
							top: 5,
							bottom: 5,
							left: 15,
							right: 15
						}
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						title: {
							display: false,
							text: 'Period of time [GMT±0]',
							color: 'rgba(255, 255, 255, 0.30)',
							font: {
								family: 'Montserrat',
								size: 18
							}
						},
						border: {
							display: true,
							dash: [12, 12],
						},
						grid: {
							display: true,
							drawOnChartArea: true,
							drawTicks: true,
							color: 'rgba(255, 255, 255, 0.07)'
						},
						ticks: {
							color: '#A295F6',
							font: {
								family: 'Montserrat',
								size: 14
							}
						}
					},
					y: {
						title: {
							display: true,
							text: 'Robux amount',
							color: 'rgba(255, 255, 255, 0.20)',
							font: {
								family: 'Montserrat',
								size: 16
							}
						},
						afterDataLimits: (scale) => {
							scale.min = -scale.max / 40
						},
						grace: '20%',
						min: 0,
						border: {
							display: true,
							dash: [12, 12]
						},
						grid: {
							display: true,
							drawOnChartArea: true,
							drawTicks: true,
							color: 'rgba(255, 255, 255, 0.07)'
						},
						ticks: {
							color: '#A295F6',
							font: {
								family: 'Montserrat',
								size: 14
							}
						}
					}
				}
			}
		})

		const optionsMobile = computed(() => {
			return {
				layout: {
					padding: {
						top: 20,
						bottom: 0,
						left: 0,
						right: 10
					}
				},
				plugins:{
					legend: {
						display: false
					},
					tooltip: {
						displayColors: false,
						caretPadding: 12,
						callbacks: {
							title: () => {
								return ''
							},
							label: function(tooltipItem) { 
								return  `${props.graphObj.graphData[tooltipItem.dataIndex].robuxAmount} R$ / ${props.graphObj.graphData[tooltipItem.dataIndex].ordersCount} Orders`
							}
						},
						xAlign: 'center',
						yAlign: 'bottom',
						backgroundColor: '#090909',
						bodyAlign: 'center',
						bodyColor: 'rgba(255, 255, 255, 0.7)',
						bodyFont: {
							family: 'Montserrat',
							weight: 400,
							size: 12
						},
						borderColor: 'rgba(42, 41, 40, 0.35)',
						borderWidth: 1,
						caretSize: 0,
						cornerRadius: 13,
						padding: {
							top: 4,
							bottom: 4,
							left: 8,
							right: 8
						}					
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						title: {
							display: false,
							text: 'Period of time [GMT±0]',
							color: 'rgba(255, 255, 255, 0.30)',
							font: {
								family: 'Montserrat',
								size: 18
							}
						},
						border: {
							display: true,
							dash: [6, 6],
						},
						grid: {
							display: true,
							drawOnChartArea: true,
							drawTicks: false,
							color: 'rgba(255, 255, 255, 0.05)'
						},
						ticks: {
							color: '#A295F6',
							font: {
								family: 'Montserrat',
								size: 10
							}
						}
					},
					y: {
						title: {
							display: true,
							text: 'Robux amount',
							color: 'rgba(255, 255, 255, 0.20)',
							font: {
								family: 'Montserrat',
								size: 10
							}
						},
						afterDataLimits: (scale) => {
							scale.min = -scale.max / 40
						},
						grace: '20%',
						min: 0,
						border: {
							display: true,
							dash: [6, 6]
						},
						grid: {
							display: true,
							drawOnChartArea: true,
							drawTicks: false,
							color: 'rgba(255, 255, 255, 0.05)'
						},
						ticks: {
							color: '#A295F6',
							font: {
								family: 'Montserrat',
								size: 10
							}
						}
					}
				}
			}
		})



		return{
			isMobile,
			data,
			dataMobile,
			options,
			optionsMobile
		}
	}
}
</script>