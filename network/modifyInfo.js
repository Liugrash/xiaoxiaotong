import request from "./config.js"

export function modifyInfo(params,info)
{
	return request({
		url:"/modifyInfo?token="+params.token,
		data:{
			phone:info.phone,
			link_img:info.link_img,
			fid:info.fid,
			sid:info.sid,
			address:info.address
		},
		method:'post'
	})
}