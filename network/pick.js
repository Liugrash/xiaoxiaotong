import request from "./config.js"

export function getToken(params){
	return request({
		url:"/getToken?code="+params.code
	})
	
}
export function getItems(params){
	return request({
		url:"/getOrder?page_id="+params.page_id+"&token="+params.token+"&state_id="+params.state_id
	})
}
export function checkQulification(params,oid){
	return request({
		url:"/sureOrder?token="+params.token,
		data:{
			oid:oid
		},
		method:'post'
		})
		
}