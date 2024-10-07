<template>
	<div class="ml-right merch-settings">
		<div class="merch-settings-buy ml-block">
			<span
				v-if="isMobile"
				@click="merchStore.hideMerchSettings()"
				class="merch-settings__goback_mob"
			>Go Back</span>
			<div class="ml-block__title">Buy settings</div>
			<div class="merch-settings-buy-selects">
				<div class="merch-settings-buy-field">
					<label
						for="merchMinRate"
						class="ml-ui__label"
					>Min rate</label>
					<input
						:value="merchStore.settingsMerch.minRate"
						id="merchMinRate"
						class="ml-ui__input"
						type="text"
						disabled
					>
				</div>
				<SelectBoxDefault
					:selectObj="selectMaxRateObj"
					@change="changeSelectMaxRate"
					class="merch-settings-buy-field"
				></SelectBoxDefault>
				<div class="merch-settings-buy-field merch-settings-banfield">
					<label
						for="merchBan"
						class="ml-ui__label"
					>Block R$ from Specific Sellers</label>
					<div class="ml-ui-inputbtn">
						<input
							v-model="banId"
							id="merchBan"
							class="ml-ui__input"
							type="text"
							placeholder="Supplier ID"
						>
						<button
							@click="addExcludedVendor"
							class="ml-ui-inputbtn__btn"
						>Ban</button>
					</div>
				</div>
				<div
					class="merch-settings-buy-field merch-settings-banlist"
				>
					<div
						v-for="(item, index) in merchStore.bannedSellers"
						:key="index"
						class="merch-settings-banlist__item"
					>
						<span class="merch-settings-banlist__item-name">{{ item }}</span>
						<span
							@click="merchStore.removeExcludedVendor(item)"
							class="merch-settings-banlist__item-remove icon-remove"
						></span>
					</div>
				</div>
			</div>
		</div>
		<div class="merch-settings-help ml-block">
			<div class="ml-block__title">Help</div>
			<a :href="LINKS.api_documentation" class="ml-btn">API Documentation</a>
			<a :href="LINKS.swagger_link" class="ml-btn">Swagger Link</a>
			<div class="merch-settings-help__desc ml-desc">Is there a problem? Find the answer in our <a :href="LINKS.discord" class="underline">Discord</a></div>
		</div>
		<div class="merch-settings-integration ml-block">
			<div class="ml-block__title">API Integration</div>
			<SelectBox
				:selectObj="selectStatusObj"
				@change-val="changeSelectStatusObj"
			>
				<template v-slot:begin="slotProps">
					<span
						:class="slotProps.value"
						class="merch-settings-status-color"
					></span>
				</template>
			</SelectBox>
			<div class="merch-settings-integration-field">
				<label
					for="merchProjectUrl"
					class="ml-ui__label"
				>Project URL</label>
				<input
					:value="merchStore.settingsMerch.projectUrl"
					id="merchProjectUrl"
					class="ml-ui__input"
					type="text"
					placeholder="No Data"
					disabled
				>
			</div>
			<div class="merch-settings-integration-field">
				<label
					for="merchProjectName"
					class="ml-ui__label"
				>Project Name</label>
				<input
					:value="merchStore.settingsMerch.projectName"
					id="merchProjectName"
					class="ml-ui__input"
					type="text"
					placeholder="No Data"
					disabled
				>
			</div>
			<div class="merch-settings-integration-field">
				<label
					for="merchId"
					class="ml-ui__label"
				>Merchant ID</label>
				<input
					:value="merchStore.settingsMerch.id"
					id="merchId"
					class="ml-ui__input"
					type="text"
					placeholder="No Data"
					disabled
				>
			</div>
		</div>
		<div class="merch-settings-key ml-block">
			<div class="ml-block__title">API key & Hook</div>
			<div class="ml-ui-inputbtn">
				<input
					:value="merchStore.settingsMerch.APIKey"
					class="merch-block__apikey ml-ui__input"
					type="text"
					readonly
				>
				<button
					@click="merchStore.copyApi(merchStore.settingsMerch.APIKey)"
					class="ml-ui-inputbtn__btn icon-copypaste"
				></button>
			</div>
			<button
				@click="merchStore.toggleShowRegenerate(true)"
				class="merch-settings__btn ml-btn"
			>Regenerate API Key</button>
			<form
				@submit.prevent="merchStore.saveData(callbackUrl, whitelist)"
				class="merch-settings-key-form"
			>
				<div class="merch-settings-key-field">
					<label class="ml-ui__label">Notification URL</label>
					<EditableInputReactive
						v-model="callbackUrl"
						:placeholder="'No Data'"
					></EditableInputReactive>
				</div>
				<button
					@click.prevent="merchStore.checkCallback(callbackUrl)"
					class="merch-settings__btn ml-btn"
				>Check Callback</button>
				<div class="merch-settings-key-field">
					<label class="ml-ui__label">Whitelisted IPS / Domain</label>
					<EditableInputReactive
						v-model="whitelist"
						:placeholder="'No Data'"
					></EditableInputReactive>
				</div>
				<div class="merch-settings-key-field">
					<label class="merch-settings-notify ml-ui__label">
						<input
							v-model="merchStore.notifyBalance.isLimit"
							type="checkbox"
						>
						<span>Notify when balance is under ($)</span>
					</label>
					<transition name="scalex">
						<div
							v-if="merchStore.notifyBalance.isLimit"
							class="merch-setting-notify-inputwrap"
						>
							<input
								v-model="merchStore.notifyBalance.value"
								class="ml-ui__input"
								type="text"
								placeholder="0 $"
							>
						</div>
					</transition>
				</div>
				<BtnLoader
					@click.stop
					:btnId="'merchSettingsBtn'"
					class="merch-settings__btn ml-btn"
				>
					<span>Save</span>
				</BtnLoader>
			</form>
			<span
				v-if="!isMobile"
				@click="merchStore.hideMerchSettings()"
				class="merch-settings__goback"
			>Go Back</span>
		</div>
		<FooterMobile></FooterMobile>
		<transition name="fade" appear>
			<div
				v-if="merchStore.isRegenerateConfirmShow"
				@click.self="merchStore.cancelRegenerate"
				class="ml-blur-bg"
			>
				<ModalRegenerate
					@close-modal="merchStore.cancelRegenerate"
					@confirm-regenerate="merchStore.confirmRegenerate"
				>
					<div class="ml-modal-delete-desc"><span class="violet">Are you sure</span> you want to regenerate API key?</div>
				</ModalRegenerate>
			</div>
		</transition>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useMerchStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'
import { LINKS } from '@/enums'

import FooterMobile from '@/components/FooterMobile.vue'
import SelectBoxDefault from '@/components/ui/SelectBoxDefault.vue'
import SelectBox from '@/components/ui/SelectBox.vue'
import EditableInputReactive from '@/components/ui/EditableInputReactive.vue'
import ModalRegenerate from '@/components/merchants/blocks/ModalRegenerate.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'

export default {
	name: 'MerchSettings',
	components: {
		FooterMobile,
		SelectBoxDefault,
		SelectBox,
		EditableInputReactive,
		ModalRegenerate,
		BtnLoader
	},
	setup() {
		const merchStore = useMerchStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const banId = ref('')

		const selectMaxRateObj = ref({
			label: 'Max rate',
			list: []
		})
		const selectStatusObj = ref({
			label: 'Status',
			list: [
				{
					beginTitle: 'green',
					title: 'Active',
					value: 'Active'
				},
				{
					beginTitle: 'red',
					title: 'Disabled',
					value: 'Disabled'
				}
			]
		})

		const	callbackUrl = ref(merchStore.settingsMerch.callbackURL),
				whitelist = ref(merchStore.settingsMerch.whitelistedIpsAndDomains)


		const updateMaxRateObj = () => {
			let maxRate = Number(merchStore.settingsMerch.maxRate)

			merchStore.maxRates.forEach((item) => {
				let el = {}
				el.title = item.rate
				el.value = item.rate
				if(item.rate === maxRate) {
					el.default = true
				}

				selectMaxRateObj.value.list.push(el)
			})
		}

		const changeSelectMaxRate = async(val) => {
			await merchStore.changeMaxRate(merchStore.settingsMerch.id, val)
		}

		const updateStatusObj = () => {
			const status = merchStore.settingsMerch.status

			if(status !== 'Active') {
				[selectStatusObj.value.list[0], selectStatusObj.value.list[1]] = [selectStatusObj.value.list[1], selectStatusObj.value.list[0]]
			}
		}

		const changeSelectStatusObj = async(val) => {
			await merchStore.changeStatus(val)
		}

		const addExcludedVendor = async() => {
			await merchStore.addExcludedVendor(banId.value)
			banId.value = ''
		}


		updateMaxRateObj()
		updateStatusObj()
				

		return {
			merchStore,
			isMobile,
			LINKS,

			selectMaxRateObj,
			changeSelectMaxRate,
			
			banId,
			addExcludedVendor,

			selectStatusObj,
			changeSelectStatusObj,

			callbackUrl,
			whitelist
		}
	}
}
</script>