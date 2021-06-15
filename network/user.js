import request from "./config.js"

export function getToken(code){
	return request({
		url: "/getToken?code=" + code,
	})
}

export function pushOrder(params, data){
	return request({
		url: "/pushOrder?token=" + params.token + "&state_id=" + params.state_id,
		data: data,
		method: 'post'
	})
}

export function getInfo(params){
	return request({
		url: "/getInfo?token=" + params.token,
	})
}