import request from "./config.js"

export function getDetail(params)
{
	return request({
		url:"/getSuccess?token="+params.token+"&oid="+params.oid,
		method:'get'
	})
}