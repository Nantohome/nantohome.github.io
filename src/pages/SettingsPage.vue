<template>
	<div
		v-if="settingsStore.settings"
		class="ml-right ml-right-graph ml-right-graph_settings"
	>
		<div class="admin-settings-general ml-block">
			<div class="ml-block__title">General settings</div>
			<form
				@submit.prevent="settingsStore.saveSettings('generalSettingsBtn')"
				class="admin-settings-general-grid"
			>
				<div class="admin-settings-field">
					<label class="ml-ui__label settings-icon settings-basket-icon">Min buying rate for merchant</label>
					<EditableInputReactive
						:modelValue="settingsStore.settings.minBuyingMerchantRate"
						:placeholder="''"
						@update:modelValue="(val) => settingsStore.settings.minBuyingMerchantRate = val"
					></EditableInputReactive>
				</div>
				<div class="admin-settings-field">
					<label class="ml-ui__label settings-icon settings-basket-icon">Max buying rate for merchant</label>
					<EditableInputReactive
						:modelValue="settingsStore.settings.maxBuyingMerchantRate"
						:placeholder="''"
						@update:modelValue="(val) => settingsStore.settings.maxBuyingMerchantRate = val"
					></EditableInputReactive>
				</div>
				<div class="admin-settings-field admin-settings-field_large">
					<label class="ml-ui__label settings-icon settings-percent-icon">Affiliate percent</label>
					<EditableInputReactiveFormatted
						:modelValue="settingsStore.settings.referrerGlobalPercent"
						:formatEndValue="'%'"
						:placeholder="''"
						@update:modelValue="(val) => settingsStore.settings.referrerGlobalPercent = val"
					></EditableInputReactiveFormatted>
				</div>
				<div class="admin-settings-field admin-settings-field_large">
					<label class="ml-ui__label settings-icon settings-fixed-icon">Crypto fixed comission</label>
					<EditableInputReactiveFormatted
						:modelValue="settingsStore.settings.cryptoTopupFeeFixed"
						:formatBeginValue="'$ '"
						:placeholder="''"
						@update:modelValue="(val) => settingsStore.settings.cryptoTopupFeeFixed = val"
					></EditableInputReactiveFormatted>
				</div>
				<div class="admin-settings-field admin-settings-field_large">
					<label class="ml-ui__label settings-icon settings-percent-icon">Crypto percent comission</label>
					<EditableInputReactiveFormatted
						:modelValue="settingsStore.settings.cryptoTopupFeePercent"
						:formatEndValue="'%'"
						:placeholder="''"
						@update:modelValue="(val) => settingsStore.settings.cryptoTopupFeePercent = val"
					></EditableInputReactiveFormatted>
				</div>
				<SelectBoxRates
					:label="'Suppliers Rates'"
					:list="settingsStore.settings.vendorRates"
					@update-rate="settingsStore.updateRate"
					@delete-rates="settingsStore.toggleShowDeleteRates(true)"
					@add-rate="settingsStore.toggleShowAddRate(true)"
					class="admin-settings-field admin-settings-field_large"
				></SelectBoxRates>
			</form>
			<div class="admin-settings-general-btnwrap">
				<BtnLoader
					@click="settingsStore.saveSettings('generalSettingsBtn')"
					:btnId="'generalSettingsBtn'"
					class="ml-btn ml-btn_violet"
				>
					<span>Save</span>
				</BtnLoader>
			</div>
		</div>
		<div class="admin-settings-other ml-block">
			<div class="ml-block__title">Other settings</div>
			<form
				@submit.prevent="settingsStore.saveSettings('otherSettingsBtn')"
				class="admin-settings-general-grid"
			>
				<div class="admin-settings-field">
					<label class="ml-ui__label settings-icon settings-fixed-icon">Fixed</label>
					<EditableInputReactiveFormatted
						:modelValue="settingsStore.settings[settingsStore.method + 'FixedPayoutFee']"
						:formatBeginValue="'$ '"
						:placeholder="''"
						@update:modelValue="(val) => settingsStore.settings[settingsStore.method + 'FixedPayoutFee'] = val"
					></EditableInputReactiveFormatted>
				</div>
				<div class="admin-settings-field">
					<label class="ml-ui__label settings-icon settings-percent-icon">Percent</label>
					<EditableInputReactiveFormatted
						:modelValue="settingsStore.settings[settingsStore.method + 'PayoutFeePercent']"
						:formatEndValue="'%'"
						:placeholder="''"
						@update:modelValue="(val) => settingsStore.settings[settingsStore.method + 'PayoutFeePercent'] = val"
					></EditableInputReactiveFormatted>
				</div>
				<div class="admin-settings-field">
					<label class="ml-ui__label settings-icon settings-card-icon">Min amount to withdraw</label>
					<EditableInputReactiveFormatted
						:modelValue="settingsStore.settings.minWithdrawalAmount"
						:formatBeginValue="'$ '"
						:placeholder="''"
						@update:modelValue="(val) => settingsStore.settings.minWithdrawalAmount = val"
					></EditableInputReactiveFormatted>
				</div>
				<div class="admin-settings-field">
					<label class="ml-ui__label settings-icon settings-card-icon">Auto withdraw max amount</label>
					<EditableInputReactiveFormatted
						:modelValue="settingsStore.settings.autoWithdrawMaxAmount"
						:formatBeginValue="'$ '"
						:placeholder="''"
						@update:modelValue="(val) => settingsStore.settings.autoWithdrawMaxAmount = val"
					></EditableInputReactiveFormatted>
				</div>
				<div class="admin-settings-field">
					<label class="ml-ui__label settings-icon settings-fixed-icon">Cis fixed comission</label>
					<EditableInputReactiveFormatted
						:modelValue="settingsStore.settings.cisCountryTopupFeeFixed"
						:formatBeginValue="'$ '"
						:placeholder="''"
						@update:modelValue="(val) => settingsStore.settings.cisCountryTopupFeeFixed = val"
					></EditableInputReactiveFormatted>
				</div>
				<div class="admin-settings-field">
					<label class="ml-ui__label settings-icon settings-percent-icon">Cis percent comission</label>
					<EditableInputReactiveFormatted
						:modelValue="settingsStore.settings.cisCountryTopupFeePercent"
						:formatEndValue="'%'"
						:placeholder="''"
						@update:modelValue="(val) => settingsStore.settings.cisCountryTopupFeePercent = val"
					></EditableInputReactiveFormatted>
				</div>
				<label class="admin-settings-field">
					<input
						v-model="settingsStore.settings.autoSuppliersVerify"
						type="checkbox"
						class="rounded"
					>
					<span>Auto verify suppliers</span>
				</label>
				<label class="admin-settings-field">
					<input
						v-model="settingsStore.settings.autoCustomersVefify"
						type="checkbox"
						class="rounded"
					>
					<span>Auto verify customers</span>
				</label>
				<label class="admin-settings-field admin-settings-field_large">
					<input
						v-model="settingsStore.settings.autoWithdraws"
						type="checkbox"
						class="rounded"
					>
					<span>Auto withdraws</span>
				</label>
				<SelectBoxMultiple
					:label="'Method'"
					:list="settingsStore.settings.paymentMethods"
					@change-val="settingsStore.changeMethod"
					class="admin-settings-field admin-settings-field_large"
				></SelectBoxMultiple>
				<div class="admin-settings-field admin-settings-field_large">
					<BtnLoader
						:btnId="'otherSettingsBtn'"
						class="ml-btn ml-btn_violet"
					>
						<span>Save</span>
					</BtnLoader>
				</div>
			</form>
		</div>
		<div class="admin-settings-notification ml-block">
			<div class="ml-block__title">Create notification</div>
			<div class="admin-settings-notification-wrap">
				<div class="admin-settings-notification__textarea">
					<label
						for="settingsNotification"
						class="ml-ui__label"
					>Message</label>
					<textarea
						v-model="settingsStore.notification.text"
						id="settingsNotification"
						class="ml-ui__input ml-ui__input_textarea-notification"
						type="text"
						placeholder="Type your text here..."
						required
					></textarea>
				</div>
				<div class="admin-settings-notification-panel">
					<div class="admin-settings-notification-field">
						<SelectBox
							:selectObj="settingsStore.notification.typeSelect"
							@change-val="(val) => settingsStore.notification.type = val"
						></SelectBox>
					</div>
					<div class="admin-settings-notification-field">
						<SelectBox
							:selectObj="settingsStore.notification.sendToSelect"
							@change-val="(val) => settingsStore.notification.sendTo = val"
						></SelectBox>
					</div>
					<BtnLoader
						@click="settingsStore.toggleShowMessagePreview(true)"
						:btnId="'settingsNotificationBtn'"
						:disabled="settingsStore.notification.text.length <= 0"
						:class="{ 'ml-btn_violet': settingsStore.notification.text.length > 0 }"
						class="ml-btn ml-btn_send-notification settings-send-btn-icon"
					>
						<span>Send</span>
					</BtnLoader>
				</div>
			</div>
		</div>
		<FooterMobile></FooterMobile>
		<transition name="fade" appear>
			<div
				v-if="settingsStore.isDeleteRatesShow"
				@click.self="settingsStore.toggleShowDeleteRates(false)"
				class="ml-blur-bg"
			>
				<DeleteRates></DeleteRates>
			</div>
		</transition>
		<transition name="fade" appear>
			<div
				v-if="settingsStore.isAddRateShow"
				@click.self="settingsStore.toggleShowAddRate(false)"
				class="ml-blur-bg"
			>
				<AddRate></AddRate>
			</div>
		</transition>
		<transition name="fade" appear>
			<div
				v-if="settingsStore.notification.isMessagePreviewShow && settingsStore.notification.text"
				@click.self="settingsStore.toggleShowMessagePreview(false)"
				class="ml-blur-bg"
			>
				<MessagePreview
					@close-modal="settingsStore.toggleShowMessagePreview(false)"
				></MessagePreview>
			</div>
		</transition>
	</div>
</template>

<script>
import { useHead } from '@unhead/vue'
import { useSettingsStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import FooterMobile from '@/components/FooterMobile.vue'
import EditableInputReactive from '@/components/ui/EditableInputReactive.vue'
import EditableInputReactiveFormatted from '@/components/ui/EditableInputReactiveFormatted.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'
import SelectBox from '@/components/ui/SelectBox.vue'
import SelectBoxMultiple from '@/components/ui/SelectBoxMultiple.vue'
import SelectBoxRates from '@/components/ui/SelectBoxRates.vue'
import DeleteRates from '@/components/settings/DeleteRates.vue'
import AddRate from '@/components/settings/AddRate.vue'
import MessagePreview from '@/components/settings/MessagePreview.vue'


export default {
	name: 'SettingsPage',
	components: {
		FooterMobile,
		EditableInputReactive,
		EditableInputReactiveFormatted,
		BtnLoader,
		SelectBox,
		SelectBoxMultiple,
		SelectBoxRates,
		DeleteRates,
		AddRate,
		MessagePreview
	},
	setup() {
		useHead({
			title: 'RBXCRATE | Settings',
			meta: [
				{
					name: 'description',
					content: 'Website description',
				}
			]
		})

		const settingsStore = useSettingsStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		settingsStore.getSettings()

		return {
			settingsStore,
			isMobile
		}

	}
}
</script>