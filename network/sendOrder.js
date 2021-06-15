import request from "./config.js"

export function getSendOrder(params)
{
		return request({
			url:"/getMySendOrder?token="+params.token+"&page_id="+params.page_id+"&pub_state="+params.pub_state,
			method:"get"
		})
}
export function backSendOrder(params)
{
	return request({
		url:'/pullBack?token='+params.token+'&oid='+params.oid,
		method:'post'
	})
}
export function rating(params,data)
{
	return request({
		url:"/pushDiscuss?token="+params.token+"&oid="+params.oid,
		data:{
			detail:data.detail,
			count:data.count
		},
		method:'post'
	})
}
export function sureSuccess(params)
{
	return request({
		url:"/sureSuccess?token="+params.token+"&oid="+params.oid,
		method:'post'
	})
}