<template>
	<div
		v-if="deviceAlerts !== null"
		class="device"
		:class="{'device_more': showMore}"
	>
		<div class="device-header">
			<div class="device-header__content">
				<div class="device-header__content-top">
					<div class="device-header__icon icon_device"></div>
					<div class="device-header__content-top-name">Устройство  № {{deviceId}}</div>
					<div class="device-header__content-top-desc">{{deviceDesc}}, {{deviceLocation}}</div>
					<span
						class="device-header__fav icon_fav"
						:class="{'icon_fav-on': changeFav}"
						@click="changeFav = !changeFav"
					></span>
				</div>
				<div class="device-header__content-separator"></div>
				<div class="device-header__content-bottom">
					<div class="device-header__statuswrap">
						<span
							class="device-header__status"
							v-for="status in deviceHistory"
							:class="getDeviceStatus(status.state)"
						></span>
					</div>
					<div class="device-header__content-bottom-box device-header__content-bottom-box_status">
						<span class="device-header__content-bottom-title">Cостояние</span>
						<span
							v-if="deviceOnline"
							class="device-header__content-bottom-data"
						>На связи</span>
						<span
							v-else
							class="device-header__content-bottom-data"
						>Недоступно</span>
					</div>
					<div class="device-header__content-bottom-box device-header__content-bottom-box_battery">
						<span class="device-header__content-bottom-title">Заряд</span>
						<span class="device-header__content-bottom-data">{{getBattery()}}</span>
					</div>
					<div class="device-header__content-bottom-box device-header__content-bottom-box_last">
						<span class="device-header__content-bottom-title">Последняя авария</span>
						<span class="device-header__content-bottom-data">{{lastIncident()}}</span>
					</div>
					<div class="device-header__content-bottom-box device-header__content-bottom-box_update">
						<span class="device-header__content-bottom-title">Обновлено</span>
						<span class="device-header__content-bottom-data">{{lastAlert()}}</span>
					</div>
					<span
						v-if="deviceAlerts.length > 0"
						class="device__else icon_arrow-big"
						@click="showMore = !showMore"
					></span>
				</div>
			</div>
		</div>
		<div class="device-body">
			<div class="device-body__title">Подробная информация</div>
			<div class="device-body__separator"></div>
			<div class="device-body__content">
				<div
					v-for="alert in deviceAlerts"
					class="device-body__row"
				>
					<div class="device-body__row-date">{{getAlertDate(alert.created)}}</div>
					<div class="device-body__row-time">{{getAlertTime(alert.created)}}</div>
					<div class="device-body__row-status">{{alertInfo(alert.message)}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props: [
			'deviceId',
			'deviceObjectId',
			'deviceDesc',
			'deviceOnline',
			'deviceAlerts',
			'deviceHistory',
			'deviceLocation'
		],
		data() {
			return{
				showMore: false,
				changeFav: false
			}
		},
		created() {
			
			if(this.deviceAlerts.length > 0) {
				for(let i = 0; i < this.deviceAlerts.length; i++) {
					let msg = this.deviceAlerts[i].message;

					msg = this.replaceAll(msg, ':', '":"');
				 	msg = this.replaceAll(msg, ',', '","');
				 	msg = '{"' + msg + '"}';

					this.deviceAlerts[i].message = JSON.parse(msg);
				}
			}
		},
		methods: {
			lastIncident: function() {
				let msg = "n/a";

				for(let i = this.deviceHistory.length - 1; i >= 0; i--) {
					if(this.deviceHistory[i].state === "incident") {
						msg = this.alarmFullDate(this.deviceHistory[i].time);
						break;
					} 
				}
				return msg;
			},
			lastAlert: function() {
				if(this.deviceAlerts.length > 0) {
					return this.alarmFullDate(this.deviceAlerts[0].created);
				} else {
					return "-";
				}
			},
			getDeviceStatus: function(status) {
				switch(status) {
					case "incident":
						return "device-header__status_incident"
  					case "online":
						return "device-header__status_online"
					default:
						return ""
				}
			},
			getBattery: function() {
				let str = "n/a";

				if(this.deviceAlerts.length > 0) {
					for(let i = 0; i < this.deviceAlerts.length; i++) {
						
						if("batteryPercent" in this.deviceAlerts[i].message) {
							str = this.deviceAlerts[i].message.batteryPercent + '%';
							break;
						}
					}
				}
				return str;
			},
			alertInfo(msg) {
				let str;

				if("lat" in msg) {
				 	str = "GPS: " + msg.lat + ', ' + msg.long;
				} else if("nearby_count" in msg) {
					str = "Рядом " + msg.nearby_count + " чел.";
				} else if("batteryPercent" in msg) {
					str = "Заряд: " + msg.batteryPercent + "%";
				} else {
					str = "Проверка связи";
				}

				return str;
			},
			getAlertDate: function(alertCreated) {
				return this.alarmFullDate(alertCreated);
			},
			getAlertTime: function(alertCreated) {
				return this.alarmFullTime(alertCreated);
			},
			alarmFullDate: function(timestamp) {
				let formattedTimestamp = new Date(timestamp * 1000);
				return ('0' + formattedTimestamp.getDate()).slice(-2) + '.' + ('0' + (formattedTimestamp.getMonth() + 1)).slice(-2) + '.' + formattedTimestamp.getFullYear();
			},
			alarmFullTime: function(timestamp) {
				let formattedTimestamp = new Date(timestamp * 1000);
				return ('0' + formattedTimestamp.getHours()).slice(-2) + ':' + ('0' + formattedTimestamp.getMinutes()).slice(-2) + ':' + ('0' + formattedTimestamp.getSeconds()).slice(-2);
			},
			replaceAll: function(str, search, replacement){
				let newStr = str.replace(new RegExp(search, 'g'), replacement);
				return newStr;
			}
		}
	}
</script>