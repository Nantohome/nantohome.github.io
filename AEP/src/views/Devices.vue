<template>
	<div class="devices">
		<div class="devices__header">
			<span class="devices__title">Устройства</span>
		</div>
		<div
			v-if="deviceList !== null"
			class="devices__body"
		>
			<Device
				v-for="device in deviceList"
				:key="device.id"
				:deviceId="device.id"
				:deviceObjectId="device.objectId"
				:deviceDesc="device.desc"
				:deviceOnline="device.online"
				:deviceAlerts="device.alerts"
				:deviceHistory="device.history"
				:deviceLocation="device.location"
			></Device>
		</div>
	</div>
</template>

<script>
	import Device from "../components/Device";
	
	export default{
		components: {
			Device
		},
		props: {
			auth: String,
			objectId: Number
		},
		data() {
			return{
				deviceList: null
			}
		},
		created() {
			this.getDeviceList();
		},
		watch: {
			objectId: function(){
				this.getDeviceList();
			}
		},
		methods: {
			getDeviceList() {	
				this.$api
					.post('', 
						{
							"jsonrpc": "2.0",
							"method": "device.list",
							"id": 1,
							"params": {
								"auth": this.auth,
								"objectId":this.objectId
							}
						}
					)
					.then(response => {
						this.deviceList = response.data.result;
					})
					.catch(error => {console.log(error)});
				
				return this.deviceList;
			}
		}
	}
</script>