<template>
	<div class="history-itemwrap">
		<div
			class="history-item"
			:class="'history-item_' + historyState" 
		>
			<div class="history-item__img-wrap">
				<div class="history-item__img"></div>
			</div>
			<div class="history-item__box">
				<div class="history-item__title-wrap">
					<div class="history-item__title">{{historyDeviceId}}</div>
				</div>
				<div class="history-item__place-wrap">
					<div class="history-item__place">{{historyDevice.location}}</div>
					<div class="history-item__place">{{historyDevice.desc}}</div>
				</div>
				<div class="history-item__date-wrap">
					<div class="history-item__date">{{historyFullDate}}</div>
					<div class="history-item__date">{{historyFullTime}}</div>
				</div>
			</div>
			<span
				v-if="showFullHistoryItem == historyId"
				class="history-item__link icon_cross"
				@click="hideFullHistory"
			></span>
			<span
				v-else
				class="history-item__link icon_arrow-big-right"
				@click="showFullHistory"
			></span>
		</div>
		<div
			v-if="showFullHistoryItem == historyId && fullHistory !== null"
			class="fullhistory__body"
		>
			<div class="fullhistory-box">
				<div class="fullhistory-box-colleft">
					<Info
						:alarmCreated="fullHistory.created"
						:alarmType="fullHistory.type"
					></Info>
					<Calls
						:alarmAlerts="fullHistory.alerts"
					></Calls>
				</div>
				<Actions
					:alarmComments="fullHistory.comments"
				></Actions>
			</div>
		</div>
	</div>
</template>

<script>
	import Info from "../components/Info";
	import Calls from "../components/Calls";
	import Actions from "../components/Actions";

	export default{
		components: {
			Info,
			Calls,
			Actions
		},
		props: [
			'auth',
			'historyId',
			'historyDeviceId',
			'historyDevice',
			'historyClosed',
			'historyState',
			'historyCreated',
			'showFullHistoryItem'
		],
		data() {
			return{
				fullHistory: null
			}
		},
		computed: {
			historyFullDate: function() {
				let historyFullCreated = new Date(this.historyCreated * 1000);
				return ('0' + historyFullCreated.getDate()).slice(-2) + '.' + ('0' + (historyFullCreated.getMonth() + 1)).slice(-2) + '.' + historyFullCreated.getFullYear();
			},
			historyFullTime: function() {
				let historyFullCreated = new Date(this.historyCreated * 1000);
				return ('0' + historyFullCreated.getHours()).slice(-2) + ':' + ('0' + historyFullCreated.getMinutes()).slice(-2) + ':' + ('0' + historyFullCreated.getSeconds()).slice(-2);
			}
		},
		methods: {
			showFullHistory: function() {
				this.$api
					.post('', 
						{
							"jsonrpc": "2.0",
							"method": "incident.get",
							"id": 1,
							"params": {
								"auth": this.auth,
								"id": this.historyId
							}
						}
					)
					.then(response => {
						this.fullHistory = response.data.result;
						this.$emit('showFullHistory', this.historyId);
					})
					.catch(error => {console.log(error)});
			},
			hideFullHistory: function() {
				this.$emit('showFullHistory', null);
				this.fullHistory = null;
			}
		}
	}
</script>