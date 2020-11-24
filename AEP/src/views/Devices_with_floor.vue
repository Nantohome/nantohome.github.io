<template>
	<div
		v-if="deviceList !== null"
		class="devices"
	>
		<div class="devices__header">
			<span class="devices__title">Устройства</span>
			<div class="devices__select">
				<Select
					:devices="devices"
					@changeFloor="changeFloor"
				></Select>
			</div>
		</div>
		<div class="devices__body">
			<Device
				v-for="device in showingDevices"
				:key="device.id"
				:deviceStatus="device"
			></Device>
		</div>
	</div>
</template>

<script>
	import Select from "../components/Select";
	import Device from "../components/Device";
	
	export default{
		components: {
			Select,
			Device
		},
		props: {
			auth: String,
			objectId: Number
		},
		data() {
			return{
				deviceList: null,
				devices:[
					{
						id: 0,
						floor: "Первый этаж",
						status: [
							[false, false, true, false, false, false, false],
							[false, false, false, false, false, false, false],
							[false, true, true, false, false, false, false],
							[true, false, false, false, false, false, false]
						]
					},
					{
						id: 1,
						floor: "Второй этаж",
						status: [
							[false, false, true, false, false, false, true],
							[false, false, false, false, false, false, true],
							[false, true, true, false, false, false, true],
							[true, false, false, false, false, false, true]
						]
					},
					{
						id: 2,
						floor: "Третий этаж",
						status: [
							[false, false, true, false, false, true, true],
							[false, false, false, false, false, true, true],
							[false, true, true, false, false, true, true],
							[true, false, false, false, false, true, true]
						]
					}
				],
				showingDevices:[]
			}
		},
		beforeMount: function() {
			this.showAllFloors();
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
						console.log(this.objectId);
						console.log(this.deviceList);
					})
					.catch(error => {console.log(error)});
				
				return this.deviceList;
			},
			changeFloor(item) {
				if (item == "all") {
					this.showingDevices = [];
					this.showAllFloors();
				} else {
					this.showingDevices = this.devices[item].status;
				}
			},
			showAllFloors(){
				for(let i= 0; i < this.devices.length; i++){
					for (let j= 0; j < this.devices[i].status.length; j++){
						this.showingDevices.push(this.devices[i].status[j]);
					}
				}
				return this.showingDevices;
			}
		}
	}
</script>