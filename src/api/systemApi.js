/***

Dev API
https://dev.rbxcave.com/api/system-docs#/

***/
import request from '@/utils/request'


/*************
	Login
*************/
export function authApi(login, password) {

	return request({
		url: '/api/auth/signin',
		method: 'post',
		data: {
			'login': login,
			'password': password
		}
	})
}




/**************************
	Registration
**************************/
export function regApi(login, email, password, invite, role, firstQuestion, secondQuestion, discordToken) {
	
	return request({
		url: '/api/auth/signup',
		method: 'post',
		data: {
			'username': login,
			'email': email,
			'password': password,
			'inviteCode': invite,
			'accountType': role,
			'firstQuestion': firstQuestion,
			'secondQuestion': secondQuestion,
			'discordToken': discordToken
		}
	})
}

export function regEmailConfirmApi(email, code, role) {

	return request({
		url: '/api/auth/register/validate-email',
		method: 'post',
		data: {
			'email': email,
			'code': code,
			'accountType': role
		}
	})
}

export function regEmailSendCodeApi(email, role) {

	return request({
		url: '/api/auth/register/send-code',
		method: 'post',
		data: {
			'email': email,
			'accountType': role
		}
	})
}

export function recoverySendCodeApi(email) {

	return request({
		url: '/api/auth/recovery/send-code',
		method: 'post',
		data: {
			'email': email
		}
	})
}

export function recoveryCheckCodeApi(email, code) {

	return request({
		url: '/api/auth/recovery/validate-code',
		method: 'post',
		data: {
			'email': email,
			'code': code
		}
	})
}

export function recoveryResetPasswordApi(email, code, pass) {
	return request({
		url: '/api/auth/recovery/reset-password',
		method: 'post',
		data: {
			'email': email,
			'code': code,
			'newPassword': pass
		}
	})
}

export function updateAvatarApi(discordId, avatarHash) {
	return request({
		url: '/api/users/avatar/update',
		method: 'post',
		data: {
			'discordId': discordId,
			'avatarHash': avatarHash
		}
	})
}











export function getCurrentUserApi() {
	return request({
		url: '/api/users/current',
		method: 'post'
	})
}

export function deleteAccountApi(confirmMessage) {
	return request({
		url: '/api/users/current/delete',
		method: 'delete',
		data: {
			'confirmMessage': confirmMessage
		}
	})
}

export function createCustomerAccessApi(firstQuestion, secondQuestion) {
	return request({
		url: '/api/customers/create-for-user',
		method: 'post',
		data: {
			'firstQuestion': firstQuestion,
			'secondQuestion': secondQuestion
		}
	})
}

export function createVendorAccessApi(firstQuestion, secondQuestion) {
	return request({
		url: '/api/vendors/create-for-user',
		method: 'post',
		data: {
			'firstQuestion': firstQuestion,
			'secondQuestion': secondQuestion
		}
	})
}



export function getCustomerMerchantOrdersApi(merchant, type, period) {
	return request({
		url: '/api/customers-stats/merchant/orders',
		method: 'post',
		data: {
			'merchant': merchant,
			'type': type,
			'period': period
		}
	})
}

export function getCustomerMerchantFinancialApi(merchant, type, period) {
	return request({
		url: '/api/customers-stats/merchant/financial-summary',
		method: 'post',
		data: {
			'merchant': merchant,
			'type': type,
			'period': period
		}
	})
}

export function getCustomerMerchantPurchasesApi(merchant, type, period) {
	return request({
		url: '/api/customers-stats/merchant/purchases-stats',
		method: 'post',
		data: {
			'merchant': merchant,
			'type': type,
			'period': period
		}
	})
}





























/*************
	Customer
*************/

/*** Dashboard ***/
export function getCustomerDashboardOrdersStatsApi(merchantId, type, literalPeriod, period) {
	let dataObj = {}

	if(merchantId !== 'all') {
		dataObj.merchantId = merchantId
	}

	if(type !== 'all') {
		dataObj.type = type
	}

	if(period) {
		dataObj.period = period
	} else if(literalPeriod) {
		dataObj.literalPeriod = literalPeriod
	}
	
	return request({
		url: '/api/customers/dashboard/orders/stats',
		method: 'post',
		data: dataObj
	})
}

export function getCustomerDashboardGraphApi(merchantId, type, literalPeriod, period) {
	let dataObj = {}

	if(merchantId !== 'all') {
		dataObj.merchantId = merchantId
	}
	
	if(type !== 'all') {
		dataObj.type = type
	}

	if(period) {
		dataObj.period = period
	} else if(literalPeriod) {
		dataObj.literalPeriod = literalPeriod
	}
	
	return request({
		url: '/api/customers/dashboard/graph/buyed',
		method: 'get',
		params: dataObj
	})
}

export function getCustomerDashboardAvailableRobuxApi(limit, page, sortBy, sortOrder) {
	return request({
		url: '/api/vendor/dashboard/queue/accounts/p',
		method: 'get',
		params: {
			limit: limit,
			page: page,
			sortBy: sortBy,
			sortOrder: sortOrder
		}
	})
}

export function getCustomerDashboardTotalRobuxApi() {
	return request({
		url: '/api/vendor/dashboard/queue/robux',
		method: 'get'
	})
}





/*** Merchants ***/
export function getCustomerAllMerchantsApi() {
	return request({
		url: '/api/customers/merchants',
		method: 'get'
	})
}

export function getMerchantsMaxRatesApi() {
	return request({
		url: '/api/merchants/max-rates/available',
		method: 'get'
	})
}

export function getCustomerExcludedVendorsApi(id) {
	return request({
		url: `/api/merchants/m/${id}/excluded-vendors`,
		method: 'get'
	})
}

export function createMerchantApi(name, url, whitelist) {
	return request({
		url: '/api/merchants/create',
		method: 'post',
		data: {
			'projectName': name,
			'projectUrl': url,
			'whitelistedAddressesStr': whitelist
		}
	})
}

export function getMerchantApi(id) {
	return request({
		url: `/api/merchants/m/${id}`,
		method: 'get'
	})
}

export function renameMerchantApi(id, val) {
	return request({
		url: `/api/merchants/m/${id}/rename`,
		method: 'post',
		data: {
			'projectName': val
		}
	})
}

export function changeMaxRateMerchantApi(id, maxRate) {
	return request({
		url: `/api/merchants/m/${id}/max-rate/edit`,
		method: 'post',
		data: {
			'maxRate': maxRate
		}
	})
}

export function deleteMerchantApi(id) {
	return request({
		url: `/api/merchants/m/${id}/delete`,
		method: 'delete'
	})
}

export function regenerateMerchantApiKeyApi(id) {
	return request({
		url: `/api/merchants/m/${id}/regenerate-api-key`,
		method: 'post'
	})
}

export function changeMerchantStatusApi(id, status) {
	return request({
		url: `/api/merchants/m/${id}/status/edit`,
		method: 'post',
		data: {
			'status': status
		}
	})
}

export function changeNotificationUrlMerchantApi(id, callbackUrl) {
	return request({
		url: `/api/merchants/m/${id}/notification-url/edit`,
		method: 'post',
		data: {
			'callbackURL': callbackUrl
		}
	})
}

export function changeWhitelistMerchantApi(id, whitelist) {
	return request({
		url: `/api/merchants/m/${id}/whitelisted-addresses/edit`,
		method: 'post',
		data: {
			'whitelistedAddresses': whitelist
		}
	})
}

export function checkNotificationUrlMerchantApi(callbackUrl) {
	return request({
		url: '/api/webhooks/callback/check',
		method: 'put',
		params: {
			'callbackUrl': callbackUrl
		}
	})
}

export function addExcludedVendorApi(id, vendorId) {
	return request({
		url: `/api/merchants/m/${id}/excluded-vendors/manage`,
		method: 'put',
		data: {
			'excludedVendorId': vendorId,
			'action': 'add'
		}
	})
}

export function removeExcludedVendorApi(id, vendorId) {
	return request({
		url: `/api/merchants/m/${id}/excluded-vendors/manage`,
		method: 'put',
		data: {
			'excludedVendorId': vendorId,
			'action': 'remove'
		}
	})
}

export function getNotificationBalanceLimitApi() {
	return request({
		url: '/api/customers/low-balance-notification-threshold',
		method: 'get'
	})
}

export function setNotificationBalanceLimitApi(threshold) {
	return request({
		url: '/api/customers/low-balance-notification-threshold/update',
		method: 'patch',
		data: {
			'threshold': threshold
		}
	})
}





/*** Topup ***/
export function getTopupFeeApi() {
	return request({
		url: '/api/payments/fee',
		method: 'get'
	})
}

export function getTopupLinkApi(amount) {
	return request({
		url: '/api/users/topup',
		method: 'post',
		data: {
			'amount': amount
		}
	})
}






/*** Profile ***/
export function getUserPaymentsTotalDepositApi() {
	return request({
		url: '/api/users/topup/total-deposit',
		method: 'get'
	})
}

export function getCustomerOrdersApi(limit, page, sortBy, sortOrder) {
	return request({
		url: '/api/customers/orders/p',
		method: 'post',
		params: {
			limit: limit,
			page: page,
			sortBy: sortBy,
			sortOrder: sortOrder
		}
	})
}

export function cancelCustomerOrdersApi(orderId) {
	return request({
		url: '/api/customers/orders/cancel',
		method: 'post',
		data: {
			'orderId': orderId
		}
	})
}

export function searchCustomerOrdersApi(limit, page, sortBy, sortOrder, nickname) {
	return request({
		url: '/api/customers/orders/p',
		method: 'post',
		params: {
			limit,
			page,
			sortBy,
			sortOrder,
			nickname
		}
	})
}

export function getUserPaymentsApi(limit, page, sortBy, sortOrder) {
	return request({
		url: '/api/users/topup/p',
		method: 'post',
		params: {
			limit: limit,
			page: page,
			sortBy: sortBy,
			sortOrder: sortOrder
		}
	})
}

export function searchUserPaymentsApi(limit, page, sortBy, sortOrder, id) {
	return request({
		url: '/api/users/topup/p',
		method: 'post',
		params: {
			limit,
			page,
			sortBy,
			sortOrder,
			id
		}
	})
}










/*************
	Vendor
*************/
/*** Navbar ***/
export function getVendorRatesApi() {
	return request({
		url: '/api/vendors/accounts/rates',
		method: 'get'
	})
}

export function changeVendorRatesApi(rateId) {
	return request({
		url: '/api/vendors/accounts/change/rates',
		method: 'put',
		data: {
			'rateId': rateId
		}
	})
}






/*** Dashboard ***/
export function getVendorDashboardOrdersStatsApi(literalPeriod, period) {
	let dataObj = {}

	if(period) {
		dataObj.period = period
	} else if(literalPeriod) {
		dataObj.literalPeriod = literalPeriod
	}
	
	return request({
		url: '/api/vendor/dashboard/orders/stats',
		method: 'post',
		data: dataObj
	})
}

export function getVendorDashboardGraphApi(literalPeriod, period) {
	let dataObj = {}

	if(period) {
		dataObj.period = period
	} else if(literalPeriod) {
		dataObj.literalPeriod = literalPeriod
	}
	
	return request({
		url: '/api/vendor/dashboard/graph/sold',
		method: 'get',
		params: dataObj
	})
}

export function getVendorDashboardAccountsApi(limit, page, sortBy, sortOrder) {
	return request({
		url: '/api/vendor/dashboard/queue/accounts/p',
		method: 'get',
		params: {
			limit: limit,
			page: page,
			sortBy: sortBy,
			sortOrder: sortOrder
		}
	})
}

export function getVendorDashboardTotalRobuxApi() {
	return request({
		url: '/api/vendor/dashboard/queue/robux',
		method: 'get'
	})
}

export function getVendorDashboardPendingOrdersApi(literalPeriod, period, limit, page) {
	let dataObj = {}

	if(period) {
		dataObj.period = period
	} else if(literalPeriod) {
		dataObj.literalPeriod = literalPeriod
	}

	return request({
		url: '/api/vendor/dashboard/pending-orders/p',
		method: 'get',
		params: {
			limit: limit,
			page: page
		},
		data: dataObj
	})
}






/*** Proxies ***/
export function getVendorProxiesApi(limit, page, sortBy, sortOrder) {
	return request({
		url: '/api/vendors/proxies/p',
		method: 'get',
		params: {
			limit: limit,
			page: page,
			sortBy: sortBy,
			sortOrder: sortOrder
		}
	})
}

export function searchVendorProxiesApi(host) {
	return request({
		url: '/api/vendors/proxies/hosts',
		method: 'get',
		params: {
			host: host
		}
	})
}

export function addVendorProxyApi(host, port, username, password) {
	return request({
		url: '/api/vendors/proxies/add',
		method: 'post',
		data: {
			'host': host,
			'port': port,
			'username': username,
			'password': password
		}
	})
}

export function addVendorProxiesApi(proxies) {
	return request({
		url: '/api/vendors/proxies/add-many',
		method: 'post',
		data: {
			'proxies': proxies
		}
	})
}

export function updateVendorProxiesStatusApi(proxies, checkAll) {
	if(checkAll) {
		proxies = []
	}

	return request({
		url: '/api/vendors/proxies/update',
		method: 'patch',
		data: {
			'proxyIds': proxies,
			'updateAll': checkAll
		}
	})
}

export function deleteVendorProxiesApi(proxies, checkAll) {
	if(checkAll) {
		proxies = []
	}

	return request({
		url: '/api/vendors/proxies/delete',
		method: 'delete',
		data: {
			'proxyIds': proxies,
			'deleteAll': checkAll
		}
	})
}




/*** Accounts ***/
export function getVendorAccountsApi(limit, page, sortBy, sortOrder) {
	return request({
		url: '/api/vendors/accounts/p',
		method: 'get',
		params: {
			limit: limit,
			page: page,
			sortBy: sortBy,
			sortOrder: sortOrder
		}
	})
}

export function searchVendorAccountsApi(username) {
	return request({
		url: '/api/vendors/accounts/usernames',
		method: 'get',
		params: {
			username: username
		}
	})
}

export function getVendorAccountsPricesApi() {
	return request({
		url: '/api/vendors/accounts/grouped-by-rate',
		method: 'get'
	})
}

export function getVendorAccountsProxiesApi() {
	return request({
		url: '/api/vendors/proxies',
		method: 'get'
	})
}

export function addVendorAccountApi(cookie, rateId) {
	return request({
		url: '/api/vendors/accounts/add',
		method: 'post',
		data: {
			'cookie': cookie,
			'rateId': rateId
		}
	})
}

export function addVendorAccountsApi(cookies, rateId, proxyId) {
	return request({
		url: '/api/vendors/accounts/add-many',
		method: 'post',
		data: {
			'cookies': cookies,
			'rateId': rateId,
			'proxyId': proxyId
		}
	})
}

export function getVendorAccountsSummaryApi() {
	return request({
		url: '/api/vendors/accounts/active-total-info',
		method: 'get'
	})
}

export function enableVendorAccountsApi(accounts, checkAll) {
	if(checkAll) {
		accounts = []
	}

	return request({
		url: '/api/vendors/accounts/enable',
		method: 'put',
		data: {
			'accountIds': accounts,
			'updateAll': checkAll
		}
	})
}

export function disableVendorAccountsApi(accounts, checkAll) {
	if(checkAll) {
		accounts = []
	}

	return request({
		url: '/api/vendors/accounts/disable',
		method: 'put',
		data: {
			'accountIds': accounts,
			'updateAll': checkAll
		}
	})
}

export function deleteVendorAccountsApi(accounts, checkAll) {
	if(checkAll) {
		accounts = []
	}

	return request({
		url: '/api/vendors/accounts/delete',
		method: 'delete',
		data: {
			'accountIds': accounts,
			'deleteAll': checkAll
		}
	})
}

export function updateVendorAccountsApi(accounts, checkAll) {
	if(checkAll) {
		accounts = []
	}
	
	return request({
		url: '/api/vendors/accounts/refresh',
		method: 'put',
		data: {
			'accountIds': accounts,
			'updateAll': checkAll
		}
	})
}

export function changeVendorAccountsRateApi(accounts, rateId) {
	return request({
		url: '/api/vendors/accounts/change/rate',
		method: 'put',
		data: {
			'accountIds': accounts,
			'rateId': rateId
		}
	})
}





/*** Withdraw ***/
export function getVendorWithdrawApi(limit, page, sortBy, sortOrder) {
	return request({
		url: '/api/vendors/payouts/p',
		method: 'get',
		params: {
			limit,
			page,
			sortBy,
			sortOrder
		}
	})
}

export function searchVendorWithdrawApi(limit, page, sortBy, sortOrder, wallet) {
	return request({
		url: '/api/vendors/payouts/p',
		method: 'get',
		params: {
			limit,
			page,
			sortBy,
			sortOrder,
			wallet
		}
	})
}

export function getVendorWithdrawFeeApi() {
	return request({
		url: '/api/vendors/payouts/fees',
		method: 'get'
	})
}

export function createVendorWithdrawApi(address, currency, amount) {
	return request({
		url: '/api/vendors/payouts/create',
		method: 'post',
		data: {
			address,
			amount,
			currency
		}
	})
}





/*** Affiliate ***/
export function getAffiliateStatsApi() {
	return request({
		url: '/api/users/affiliate/referrer-stats',
		method: 'get'
	})
}

export function getAffiliateUsersApi(limit, page, sortBy, sortOrder) {
	return request({
		url: '/api/users/affiliate/referrals',
		method: 'get',
		params: {
			limit: limit,
			page: page,
			sortBy: sortBy,
			sortOrder: sortOrder
		}
	})
}

export function changeInviteCodeApi(inviteCode) {
	return request({
		url: '/api/users/current/update',
		method: 'patch',
		data: {
			inviteCode: inviteCode
		}
	})
}









/*************
	Admin
*************/

/*** Dashboard ***/

export function getUsersByLoginApi(login, limit) {
	return request({
		url: '/api/users/matches',
		method: 'get',
		params: {
			searchField: 'login',
			keyword: login,
			limit: limit
		}
	})
}

export function getAdminDashboardStatsApi(merchantId, customerId, type, literalPeriod, period) {
	let dataObj = {}

	if(merchantId) {
		dataObj.merchantId = merchantId
	} else if(customerId) {
		dataObj.customerId = customerId
	}

	if(type !== 'all') {
		dataObj.type = type
	}

	if(period) {
		dataObj.period = period
	} else if(literalPeriod) {
		dataObj.literalPeriod = literalPeriod
	}
	
	return request({
		url: '/api/admin/dashboard/stats',
		method: 'post',
		data: dataObj
	})
}

export function getAdminDashboardGraphApi(merchantId, customerId, type, literalPeriod, period) {
	let dataObj = {}

	if(merchantId) {
		dataObj.merchantId = merchantId
	} else if(customerId) {
		dataObj.customerId = customerId
	}
	
	if(type !== 'all') {
		dataObj.type = type
	}

	if(period) {
		dataObj.period = period
	} else if(literalPeriod) {
		dataObj.literalPeriod = literalPeriod
	}
	
	return request({
		url: '/api/admin/dashboard/graph',
		method: 'get',
		params: dataObj
	})
}

export function getAdminDashboardAllMerchantsApi(limit, page, literalPeriod, period) {
	return request({
		url: '/api/merchants/p',
		method: 'get',
		params: {
			limit: limit,
			page: page,
			literalPeriod: literalPeriod,
			period: period
		}
	})
}





/*** Settings ***/
export function getAdminSettingsApi() {
	return request({
		url: '/api/admin/settings',
		method: 'get'
	})
}

export function setAdminSettingsApi(settings) {
	return request({
		url: '/api/admin/settings',
		method: 'put',
		data: settings
	})
}

export function updateRateApi(id, rate, isEnabled) {
	return request({
		url: `/api/admin/vendor-rate/${id}`,
		method: 'put',
		data: {
			'rate': rate,
			'isEnabled': isEnabled
		}
	})
}

export function deleteRatesApi(arr) {
	return request({
		url: '/api/admin/vendor-rate',
		method: 'delete',
		data: {
			'ids': arr
		}
	})
}

export function addRateApi(rate) {
	return request({
		url: '/api/admin/vendor-rate',
		method: 'post',
		data: {
			'rate': rate
		}
	})
}







/*** Users ***/
/*** Customers ***/
export function getAdminAllUsersApi() {
	return request({
		url: '/api/admin/users/stats',
		method: 'get'
	})
}

export function getAdminCustomersRequestApi(limit, page, sortBy, sortOrder, keyword) {
	return request({
		url: '/api/admin/customers-requests',
		method: 'get',
		params: {
			limit,
			page,
			sortBy,
			sortOrder,
			keyword
		}
	})
}

export function getAdminCustomersManagmentApi(limit, page, sortBy, sortOrder, keyword) {
	return request({
		url: '/api/admin/customers-managments',
		method: 'get',
		params: {
			limit,
			page,
			sortBy,
			sortOrder,
			keyword
		}
	})
}

export function setAdminCustomersVerifyApi(customerIds, isVerified) {
	return request({
		url: '/api/customers/update',
		method: 'patch',
		data: {
			'customerIds': customerIds,
			'isVerified': isVerified
		}
	})
}

export function setAdminUserFreezeApi(id) {
	return request({
		url: '/api/users/freeze',
		method: 'post',
		data: {
			'id': id
		}
	})
}

export function setAdminUserUnfreezeApi(id) {
	return request({
		url: '/api/users/unfreeze',
		method: 'post',
		data: {
			'id': id
		}
	})
}

export function deleteAdminCustomersApi(customerIds) {
	return request({
		url: '/api/customers/delete',
		method: 'delete',
		data: {
			'customerIds': customerIds
		}
	})
}

export function updateAdminCustomersApi(userId, isAdmin, isOwner) {
	return request({
		url: '/api/users/update',
		method: 'patch',
		data: {
			'userId': userId,
			'isAdmin': isAdmin,
			'isOwner': isOwner
		}
	})
}


export function createAdminCustomerFeeApi(customerId, cryptoTopupFeePercent, cryptoTopupFeeFixed) {
	return request({
		url: '/api/customers/personal-fees/upsert',
		method: 'post',
		data: {
			'customerId': customerId,
			'cryptoTopupFeePercent': cryptoTopupFeePercent,
			'cryptoTopupFeeFixed': cryptoTopupFeeFixed
		}
	})
}

export function deleteAdminCustomerFeeApi(customerId) {
	return request({
		url: '/api/customers/personal-fees/delete',
		method: 'delete',
		data: {
			'customerId': customerId
		}
	})
}

export function updateAdminCustomersBalanceApi(customerIds, balance) {
	return request({
		url: '/api/customers/update',
		method: 'patch',
		data: {
			'customerIds': customerIds,
			'balance': balance
		}
	})
}




/*** Vendors ***/
export function getAdminVendorsManagmentApi(limit, page, sortBy, sortOrder, keyword) {
	return request({
		url: '/api/admin/vendors-managments',
		method: 'get',
		params: {
			limit,
			page,
			sortBy,
			sortOrder,
			keyword
		}
	})
}

export function deleteAdminVendorsApi(vendorId) {
	return request({
		url: '/api/vendors/delete',
		method: 'delete',
		data: {
			'vendorId': vendorId
		}
	})
}

export function updateAdminVendorsBalanceApi(vendorIds, balance) {
	return request({
		url: '/api/vendors/update',
		method: 'patch',
		data: {
			'vendorIds': vendorIds,
			'balance': balance
		}
	})
}

export function getAdminVendorsAccountsApi(vendorId, sortBy, sortOrder) {
	return request({
		url: '/api/vendors/accounts',
		method: 'get',
		params: {
			'vendorId': vendorId,
			'sortBy': sortBy,
			'sortOrder': sortOrder
		}
	})
}

export function deleteAdminVendorsAccountApi(accountId) {
	return request({
		url: '/api/vendors/accounts/admin/delete',
		method: 'delete',
		data: {
			'accountId': accountId
		}
	})
}

export function getAdminVendorsRequestApi(limit, page, sortBy, sortOrder, keyword) {
	return request({
		url: '/api/admin/vendors-requests',
		method: 'get',
		params: {
			limit,
			page,
			sortBy,
			sortOrder,
			keyword
		}
	})
}

export function setAdminVendorsVerifyApi(vendorIds, isVerified) {
	return request({
		url: '/api/vendors/update',
		method: 'patch',
		data: {
			'vendorIds': vendorIds,
			'isVerified': isVerified
		}
	})
}




/*** Merchants ***/
export function getAdminMerchantsManagmentApi(limit, page, sortBy, sortOrder, keyword) {
	return request({
		url: '/api/admin/merchants',
		method: 'get',
		params: {
			limit,
			page,
			sortBy,
			sortOrder,
			keyword
		}
	})
}

export function deleteAdminMerchantsManagmentApi(merchantIds) {
	return request({
		url: '/api/merchants/delete',
		method: 'delete',
		data: {
			'merchantIds': merchantIds
		}
	})
}

export function updateAdminMerchantsManagmentApi(merchantIds, isFrozen, minRate, maxRate) {
	return request({
		url: '/api/merchants/update',
		method: 'patch',
		data: {
			'merchantIds': merchantIds,
			'isFrozen': isFrozen,
			'minRate': minRate,
			'maxRate': maxRate
		}
	})
}




/*** Blacklisted ***/
export function getAdminBlacklistManagmentApi(limit, page, sortBy, sortOrder, value) {
	return request({
		url: '/api/block/p',
		method: 'get',
		params: {
			limit,
			page,
			sortBy,
			sortOrder,
			value
		}
	})
}

export function addBlacklistVendorApi(type, value, freezeReason) {
	return request({
		url: '/api/block/create',
		method: 'post',
		data: {
			'type': type,
			'value': value,
			'freezeReason': freezeReason
		}
	})
}

export function removeBlacklistVendorApi(id) {
	return request({
		url: '/api/block/delete',
		method: 'delete',
		data: {
			'id': id
		}
	})
}







/*** Finances ***/
export function getAdminFinancesFeeApi(literalPeriod, period) {
	let dataObj = {}

	if(period) {
		dataObj.period = period
	} else if(literalPeriod) {
		dataObj.literalPeriod = literalPeriod
	}

	return request({
		url: '/api/admin/finances/fee-earnings/calculate',
		method: 'post',
		data: dataObj
	})
}