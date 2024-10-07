/***

Public API
https://dev.rbxcave.com/api/developers/docs#/

***/
import request from '@/utils/request'


export function createGamepassOrderApi(apiKey, robloxUsername, orderId, robuxAmount, placeId, isPreOrder) {
	return request({
		url: '/api/orders/gamepass',
		method: 'post',
		headers: {
			'api-key': apiKey
		},
		data: {
			'robloxUsername': robloxUsername,
			'orderId': orderId,
			'robuxAmount': robuxAmount,
			'placeId': placeId,
			'isPreOrder': isPreOrder
		}
	})
}

export function createVipserverOrderApi(apiKey, robloxUsername, orderId, robuxAmount, placeId, isPreOrder) {
	return request({
		url: '/api/orders/vip-server',
		method: 'post',
		headers: {
			'api-key': apiKey
		},
		data: {
			'robloxUsername': robloxUsername,
			'orderId': orderId,
			'robuxAmount': robuxAmount,
			'placeId': placeId,
			'isPreOrder': isPreOrder
		}
	})
}