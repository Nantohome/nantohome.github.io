<template>
	<div
		v-if="objectItem !== null"
		class="information"
	>
		<InformationItem
			:objectName="objectItem.name"
			:objectAddress="objectItem.address"
			:objectLocation="objectItem.location"
			:objectContacts="objectItem.contacts"
		>
			<div class="information__header">Информация</div>
		</InformationItem>
	</div>
</template>

<script>
	import InformationItem from "../components/InformationItem";
		
	export default{
		components: {
			InformationItem
		},
		props: {
			auth: String,
			objectId: Number
		},
		data() {
			return{
				objectItem: null
			}
		},
		created() {
			this.getObject();
		},
		watch: {
			objectId: function(){
				this.getObject();
			}
		},
		methods: {
			getObject() {	
				this.$api
					.post('', 
						{
							"jsonrpc": "2.0",
							"method": "object.get",
							"id": 1,
							"params": {
								"auth": this.auth,
								"id":this.objectId
							}
						}
					)
					.then(response => {
						this.objectItem = response.data.result;
					})
					.catch(error => {console.log(error)});
				
				return this.objectItem;
			}
		}
	}
</script>