<template>
	<div class="calls">
		<div class="calls-header">
			<span class="calls__title">Вызовы X{{alarmAlerts.length}}</span>
		</div>
		<div class="calls-body" v-bar>
			<div>
				<div class="calls-body__row calls-body__row_desc">
					<span class="calls-body__date">Дата</span>
					<span class="calls-body__time">Время</span>
					<span class="calls-body__msg">Информация</span>
				</div>
				<div
					class="calls-body__row"
					v-for="alert in alarmAlerts"
				>
					<span class="calls-body__date">{{alertDate(alert.created)}}</span>
					<span class="calls-body__time">{{alertTime(alert.created)}}</span>
					<span class="calls-body__msg">{{alertInfo(alert.message)}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
		props: ['alarmAlerts'],
		methods: {
			alertDate(alertCreated) {
				let alertFullCreated = new Date(alertCreated * 1000);
				return ('0' + alertFullCreated.getDate()).slice(-2) + '.' + ('0' + (alertFullCreated.getMonth() + 1)).slice(-2) + '.' + alertFullCreated.getFullYear();
			},
			alertTime(alertCreated) {
				let alertFullCreated = new Date(alertCreated * 1000);
				return ('0' + alertFullCreated.getHours()).slice(-2) + ':' + ('0' + alertFullCreated.getMinutes()).slice(-2) + ':' + ('0' + alertFullCreated.getSeconds()).slice(-2);
			},
			alertInfo(alertStr) {

				String.prototype.replaceAll = function(search, replacement) {
					var target = this;
					return target.replace(new RegExp(search, 'g'), replacement);
				};

				alertStr = alertStr.replaceAll(':', '":"');
				alertStr = alertStr.replaceAll(',', '","');
				alertStr = '{"' + alertStr + '"}'
				
				let alertObj = JSON.parse(alertStr),
					str = '';
				
				if("lat" in alertObj) {
					str = "GPS: " + alertObj.lat + ', ' + alertObj.long;
				} else if ("nearby_count" in alertObj) {
					str = "Рядом " + alertObj.nearby_count + " чел.";
				} else {
					str = "Вызов";
				}

				return str;
			}
		}
	}
</script>