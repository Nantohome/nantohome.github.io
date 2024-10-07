import LandingPage from 				'@/pages/LandingPage.vue'

import LoginPage from 					'@/pages/LoginPage.vue'

import RecoveryPage from 				'@/pages/recovery/RecoveryPage.vue'
import RecoveryVerifyPage from 			'@/pages/recovery/RecoveryVerifyPage.vue'
import RecoveryEndPage from 			'@/pages/recovery/RecoveryEndPage.vue'

import RegisterSelectPage from 			'@/pages/register/RegisterSelectPage.vue'
import RegisterCustomerFirstPage from 	'@/pages/register/RegisterCustomerFirstPage.vue'
import RegisterVendorFirstPage from 	'@/pages/register/RegisterVendorFirstPage.vue'
import RegisterCustomerSecondPage from 	'@/pages/register/RegisterCustomerSecondPage.vue'
import RegisterVendorSecondPage from 	'@/pages/register/RegisterVendorSecondPage.vue'
import RegisterDiscordLinkingPage from	'@/pages/register/RegisterDiscordLinkingPage.vue'
import RegisterDiscordConfirmPage from	'@/pages/register/RegisterDiscordConfirmPage.vue'
import RegisterInfoPage from 			'@/pages/register/RegisterInfoPage.vue'
import RegisterVerifyPage from 			'@/pages/register/RegisterVerifyPage.vue'
import RegisterEndPage from 			'@/pages/register/RegisterEndPage.vue'

import PolicyPage from 					'@/pages/terms/PolicyPage.vue'
import AgreementPage from 				'@/pages/terms/AgreementPage.vue'
import ApiPage from 					'@/pages/terms/ApiPage.vue'

import MainLayout from 					'@/layouts/MainLayout.vue'

import DashboardPage from 				'@/pages/DashboardPage.vue'
import ProfilePage from 				'@/pages/ProfilePage.vue'
import MerchantsPage from 				'@/pages/MerchantsPage.vue'
import MarketPage from 					'@/pages/MarketPage.vue'
import AffiliatePage from 				'@/pages/AffiliatePage.vue'
import UsersPage from 					'@/pages/UsersPage.vue'
import SettingsPage from 				'@/pages/SettingsPage.vue'
import FinancesPage from 				'@/pages/FinancesPage.vue'
import AccountsPage from 				'@/pages/AccountsPage.vue'
import ProxiesPage from 				'@/pages/ProxiesPage.vue'
import WithdrawPage from 				'@/pages/WithdrawPage.vue'



export const router = [
	{
		path: '/',
		name: 'landing',
		component: LandingPage
	},
	{
		path: '/panel',
		name: 'panel',
		component: MainLayout,
		children: [
			{
				path: '/panel',
				name: 'dashboard',
				component: DashboardPage
			},
			{
				path: '/panel',
				name: 'merchants',
				component: MerchantsPage
			},
			{
				path: '/panel',
				name: 'market',
				component: MarketPage
			},
			{
				path: '/panel',
				name: 'profile',
				component: ProfilePage
			},
			{
				path: '/panel',
				name: 'affiliate',
				component: AffiliatePage
			},
			{
				path: '/panel',
				name: 'users',
				component: UsersPage
			},
			{
				path: '/panel',
				name: 'settings',
				component: SettingsPage
			},
			{
				path: '/panel',
				name: 'finances',
				component: FinancesPage
			},
			{
				path: '/panel',
				name: 'accounts',
				component: AccountsPage
			},
			{
				path: '/panel',
				name: 'proxies',
				component: ProxiesPage
			},
			{
				path: '/panel',
				name: 'withdraw',
				component: WithdrawPage
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: LoginPage
	},
	{
		path: '/recovery',
		name: 'recovery',
		component: RecoveryPage
	},
	{
		path: '/recovery-verify',
		name: 'recovery-verify',
		component: RecoveryVerifyPage
	},
	{
		path: '/recovery-end',
		name: 'recovery-end',
		component: RecoveryEndPage
	},
	{
		path: '/register',
		name: 'register',
		component: RegisterSelectPage
	},
	{
		path: '/robux-methods',
		name: 'customer-question1',
		component: RegisterCustomerFirstPage
	},
	{
		path: '/selling-methods',
		name: 'vendor-question1',
		component: RegisterVendorFirstPage
	},
	{
		path: '/robux-weekly',
		name: 'customer-question2',
		component: RegisterCustomerSecondPage
	},
	{
		path: '/stock-daily',
		name: 'vendor-question2',
		component: RegisterVendorSecondPage
	},
	{
		path: '/linking-discord',
		name: 'linking-discord',
		component: RegisterDiscordLinkingPage
	},
	{
		path: '/confirm-discord',
		name: 'confirm-discord',
		component: RegisterDiscordConfirmPage
	},
	{
		path: '/register-info',
		name: 'register-info',
		component: RegisterInfoPage
	},
	{
		path: '/verify',
		name: 'verify',
		component: RegisterVerifyPage
	},
	{
		path: '/registration-end',
		name: 'registration-end',
		component: RegisterEndPage
	},
	{
		path: '/policy',
		name: 'policy',
		component: PolicyPage
	},
	{
		path: '/agreement',
		name: 'agreement',
		component: AgreementPage
	},
	{
		path: '/api/external-docs',
		name: 'api-docs',
		component: ApiPage
	},
	{
		path: '/r/:code',
		name: 'invite',
		component: RegisterSelectPage
	}
]