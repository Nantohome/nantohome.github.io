<template>
	<div class="information-item">
		<slot></slot>
		<div class="information__body">
			<div class="information__desc">Полное название учреждения</div>
			<div class="information__data">{{objectName}}</div>
			<div class="information__desc">Адрес</div>
			<div class="information__data">{{objectAddress}}</div>
			<div
				v-if="objectLocation.split(',').length > 1"
			>
				<div class="information__desc">Местоположение устройства</div>
				<div class="information__btnwrap">
					<a :href="getMapLink" target="_blank" class="small-btn information__btn" >На карте</a>
				</div>
			</div>
			<div class="information__desc">Контакты</div>
			<div class="information__contacts">
				<div
				v-for="contact in objectContacts"
				class="information__contacts-row">
					<div class="information__contacts-col">
						<div class="information__data">{{contact.name + ", " + contact.title}}</div>
					</div>
					<div class="information__contacts-col">
						<div class="information__data">{{contact.contact}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	
	export default{
		props: [
			'objectName',
			'objectAddress',
			'objectLocation',
			'objectContacts'
		],
		methods: {
			getMapLink() {
				let formattedLocation = this.objectLocation.split(',');
				return "https://maps.yandex.ru/?text=" + formattedLocation[1] + "," + formattedLocation[0];
			}
		}
	}
</script>