import request from "./config.js"

export function getRecvOrder(params)
{
		return request({
			url:"/getMyRecvOrder?token="+params.token+"&page_id="+params.page_id+"&recv_state="+params.recv_state,
			method:"get"
		})
}


export function getSwiper(){
	return request({
		url: "/getSwiper",
	})
}