import {getToken, getInfo} from "@/network/user.js"

export function usualLogin(vuex, loading){
	loading.open();
	uni.getUserProfile({
		desc: "授权登陆，获取用户信息",
		success: (res) => {
			vuex.state.username = res.userInfo.nickName;
			vuex.state.avatar = res.userInfo.avatarUrl;
			vuex.state.loginFlag = true;
			uni.login({
				success:(res) => {
					getToken(res.code).then(res=>{
						vuex.state.token = res.data.token
						let params = {
							"token": vuex.state.token
						}
						getInfo(params).then(res=>{
							console.log(res)
							if(res.data.code == 1001){
								vuex.state.isLogin = res.data.infoObj.isLogin,
								vuex.state.count = res.data.infoObj.count,
								vuex.state.address = res.data.infoObj.address,
								vuex.state.phone = res.data.infoObj.phone,
								vuex.state.money = res.data.infoObj.money
							}else if(res.data.code == 1005){
								vuex.state.isLogin = 1
							}
							
						})
						loading.close();
					})
				}
			})
		}
	})
}