<template>
	<div class="ml-right">
		<div class="affiliate ml-block">
			<div
				v-if="isMobile"
				class="mobile-title"
			>
				<div class="mobile-title__text">Statistics</div>
			</div>
			<div class="affiliate-header ml-grid-row">
				<div class="ml-box">
					<div class="ml-box-header">
						<span class="ml-box-header__icon icon-ml-users-small"></span>
						<div class="ml-box-header__title">Affiliated Users</div>
					</div>
					<div class="ml-box-body">
						<span
							v-if="affiliateStore.stats.referralsCount"
							class="ml-box-body__text"
						>{{ affiliateStore.stats.referralsCount }}</span>
						<span
							v-else
							class="ml-box-body__text"
						>-</span>
						<span class="ml-box-body__icon icon-ml-users"></span>
					</div>
				</div>
				<div class="ml-box">
					<div class="ml-box-header">
						<span class="ml-box-header__icon icon-ml-total-small"></span>
						<div class="ml-box-header__title">Total Earned</div>
					</div>
					<div class="ml-box-body">
						<span
							v-if="affiliateStore.stats.referralsTotalEarned"
							class="ml-box-body__text"
						>${{ affiliateStore.stats.referralsTotalEarned }}</span>
						<span
							v-else
							class="ml-box-body__text"
						>-</span>
						<span class="ml-box-body__icon icon-ml-total"></span>
					</div>
				</div>
				<div class="ml-box">
					<div class="ml-box-header">
						<span class="ml-box-header__icon icon-ml-percent-small"></span>
						<div class="ml-box-header__title">Your Percent</div>
					</div>
					<div class="ml-box-body">
						<span
							v-if="affiliateStore.stats.referrerPercent"
							class="ml-box-body__text"
						>{{ (Number(affiliateStore.stats.referrerPercent) * 100).toFixed(2) }}%</span>
						<span
							v-else
							class="ml-box-body__text"
						>-</span>
						<span class="ml-box-body__icon icon-ml-percent"></span>
					</div>
				</div>
			</div>
			<div
				v-if="isMobile"
				class="mobile-title"
			>
				<div class="mobile-title__text">Your invite code</div>
			</div>


			<div class="affiliate-invite ml-grid-row">
				<div
					v-if="affiliateStore.isCodeEditable"
					class="affiliate-invite-field"
				>
					<label
						for="inviteCodeEdit"
						class="ml-ui__label"
					>Your invite code</label>
					<input
						v-model="code"
						id="inviteCodeEdit"
						class="affiliate-invite__input ml-ui__input"
						type="text"
						placeholder="Type here your code..."
						autofocus="0"
					>
				</div>
				<div
					v-else
					class="affiliate-invite-field"
				>
					<label
						for="inviteCode"
						class="ml-ui__label"
					>Your invite code</label>
					<input
						v-model="affiliateStore.stats.inviteCode"
						id="inviteCode"
						class="affiliate-invite__input ml-ui__input"
						type="text"
						readonly
					>
				</div>
				<BtnLoader
					v-if="affiliateStore.isCodeEditable"
					@click.stop="affiliateStore.changeCode(code)"
					:btnId="'affiliateStoreEditCodeBtn'"
					class="affiliate-invite__btn ml-btn ml-btn_violet"
				>
					<span>Save</span>
				</BtnLoader>
				<button
					v-else
					@click="affiliateStore.isCodeEditable = true"
					class="affiliate-invite__btn ml-btn"
				>
					<span>Edit</span>
				</button>
				<button
					v-if="isMobile && affiliateStore.isCodeEditable"
					@click="affiliateStore.isCodeEditable = false"
					class="affiliate-invite__cancel-btn ml-btn"
				>
					<span>Cancel</span>
				</button>
				<div class="affiliate-invite-field">
					<label
						for="inviteLink"
						class="ml-ui__label"
					>Your invite link</label>
					<input
						v-model="affiliateStore.inviteLink"
						id="inviteLink"
						class="affiliate-invite__input ml-ui__input"
						type="text"
						readonly
					>
				</div>
				<button
					@click="affiliateStore.copyLink()"
					class="affiliate-invite__btn ml-btn"
				>
					<span>Copy</span>
				</button>
			</div>
			<div class="affiliate-table-wrap">
				<div
					v-if="affiliateStore.list.data?.length > 0"
					class="table table-affiliate"
				>
					<div class="table-head">
						<div
							@click="clickSort('login')"
							:class="{ 'js-active': affiliateStore.list.sortBy === 'login', 'js-decrease': affiliateStore.list.sortOrder && affiliateStore.list.sortBy === 'login' }"
							class="table-head-cell table-head-cell_name"
						>Name</div>
						<div
							@click="clickSort('referrerEarned')"
							:class="{ 'js-active': affiliateStore.list.sortBy === 'referrerEarned', 'js-decrease': affiliateStore.list.sortOrder && affiliateStore.list.sortBy === 'referrerEarned' }"
							class="table-head-cell table-head-cell_amount"
						>Earned $</div>
					</div>
					<div
						v-for="(item, index) in affiliateStore.list.data"
						:key="index"
						class="table-row"
					>
						<div class="table-cell table-cell_name">{{ item.login }}</div>
						<div class="table-cell table-cell_amount">{{ item.referrerEarned }}</div>
					</div>
				</div>
				<div
					v-else
					class="affiliate-table-empty"
				>The data will appear after the first referral is invited. Use the invitation code to add a referral.</div>
				<div class="affiliate-table-footer-wrap">
					<PagenatorBlock
						:total-pages="affiliateStore.list.meta.totalPages"
						:per-page="affiliateStore.list.meta.limit"
						:current-page="affiliateStore.list.meta.page"
						:maxVisibleButtons="isMobile ? 3 : 4"
						@pagechanged="(val) => affiliateStore.onPageChange(val)"
					></PagenatorBlock>
					<div class="affiliate-total">Total Earned: <span class="affiliate-total__val">${{ affiliateStore.stats.referralsTotalEarned }}</span></div>
				</div>
			</div>
			<div class="affiliate-footer">All users who registered through your Invite Code, go to the list of your referrals. From each transaction, our service will share the profit from your referral, deducted the amount according to your rate and falls on your referral balance.</div>
		</div>
		<FooterMobile></FooterMobile>
	</div>
</template>

<script>
import { useHead } from '@unhead/vue'
import { useAffiliateStore } from '@/stores'
import { mobileMatchMedia } from '@/utils/helpers'

import FooterMobile from '@/components/FooterMobile.vue'
import BtnLoader from '@/components/ui/BtnLoader.vue'
import PagenatorBlock from '@/components/ui/PagenatorBlock.vue'

export default {
	name: 'MerchantsPage',
	components: {
		FooterMobile,
		PagenatorBlock,
		BtnLoader
	},
	setup() {
		useHead({
			title: 'RBXCRATE | Affiliate',
			meta: [
				{
					name: 'description',
					content: 'Website description',
				}
			]
		})

		const affiliateStore = useAffiliateStore()
		const isMobile = mobileMatchMedia().isMediaQueryMatch

		const code = ''

		const clickSort = (el) => {
			if(affiliateStore.list.sortBy === el) {
				affiliateStore.list.sortOrder = !affiliateStore.list.sortOrder
			} else {
				affiliateStore.list.sortOrder = false
				affiliateStore.list.sortBy = el
			}
			affiliateStore.getUsers()
		}
		

		affiliateStore.getData()
		

		return {
			affiliateStore,
			isMobile,

			code,

			clickSort,
		}
	}
}
</script>