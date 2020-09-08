/*
 * @Date: 2019-12-25 10:43:15
 * @Author: 情雨随风
 * @LastEditors  : 情雨随风
 * @LastEditTime : 2019-12-28 10:59:12
 * @Description: 公共函数
 */

import CryptoJS from 'crypto-js'

//播放次数转换
export const playCount = value => {
	if (value > 99999999) {
		return (value / 100000000).toFixed(1) + '亿'
	} else if (value > 99999) {
		return (value / 10000).toFixed(1) + '万'
	}
	return value
}

//http资源重新成https
export const https = url => {
	if (/(https):\/\/([\w.]+\/?)\S*/.test(url)) {
		return url
	}
	return url.replace(/^http/, 'https')
}

//加密
export const encrypt = data => {
	return CryptoJS.AES.encrypt(JSON.stringify(data), 'lisfes').toString()
}

//解密
export const decrypt = data => {
	const value = CryptoJS.AES.decrypt(data, 'lisfes').toString(CryptoJS.enc.Utf8)
	try {
		return JSON.parse(value)
	} catch (error) {
		return value
	}
}

//判断是否是小程序环境
export const ready = () => {
	console.log(window.__wxjs_environment)
	return window.__wxjs_environment === 'miniprogram'
}
