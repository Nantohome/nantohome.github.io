<template>
	<div class="history">
		<div class="history__header">
			<span class="history__title">История</span>
		</div>
		<div
			v-if="historyList !== null && historyList.length > 0"
			class="history__body"
		>
			<div class="history__desc">
				<div class="history__desc-title history__desc-text">Название</div>
				<div class="history__desc-place history__desc-text">Местонахождение</div>
				<div class="history__desc-date history__desc-text">Дата</div>
			</div>
			<HistoryItem
				v-for="history in historyList"
				:key="history.id"
				:auth="auth"
				:historyId="history.id"
				:historyDeviceId="history.deviceId"
				:historyDevice="history.device"
				:historyClosed="history.closed"
				:historyState="history.state"
				:historyCreated="history.created"
				:showFullHistoryItem="showFullHistoryItem"
				@showFullHistory="showFullHistory"
			></HistoryItem>
		</div>
		<div
			v-else
			class="history__none"
		>Для данного объекта нет истории</div>
	</div>
</template>

<script>
	import HistoryItem from "../components/HistoryItem";
	
	export default{
		components: {
			HistoryItem
		},
		props: {
			auth: String,
			objectId: Number
		},
		data() {
			return{
				historyList: null,
				showFullHistoryItem: null
			}
		},
		created() {
			this.getHistoryList();
		},
		watch: {
			objectId: function(){
				this.getHistoryList();
			}
		},
		methods: {
			getHistoryList() {	
				this.$api
					.post('', 
						{
							"jsonrpc": "2.0",
							"method": "incident.list",
							"id": 1,
							"params": {
								"auth": this.auth,
								"objectId":this.objectId
							}
						}
					)
					.then(response => {
						this.historyList = response.data.result.filter(function(item) {
							return "device" in item;
						})
					})
					.catch(error => {console.log(error)});
				
				return this.historyList;
			},
			showFullHistory(value) {
				this.showFullHistoryItem = value;
			}
		}
	}
</script>