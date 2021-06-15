<template>
	<view>
		<view class="avatar-container">
			<u-avatar :src="getAvatar" alt="" class="avatar-img"></u-avatar>
			<view class="user-info">
				<view  v-show="getLoginFlag1">昵称：{{getUsername}}</view>
				<view v-show="getLoginFlag" @click="loginClick">请点击登陆</view>
				<view v-show="getLoginFlag1">
					<text>信用星级：</text>
					<u-rate :count="5" :current="4.7" :disabled="true"></u-rate>
					<text style="color:#a1a1a1;margin-left: 10rpx;">{{current}}分</text>
				</view>
			</view>
		</view>
		
		<!-- 我的余额 -->
		<view class="money-container">
			<view>余额：<text style="color:#d63031;">{{getUserMoney}}</text> 通币</view>
			<view class="button-container">
				<u-button size="mini" class="operate-button" type="primary" @click="rechargeClick">管理余额</u-button>
			</view>
		</view>
		
		<!-- 个人信息 -->
		<view class="my-info">
			<view v-if="show">您的信息还在审核中哦～</view>
			<view style="font-size: 36rpx;margin-bottom:10rpx;">个人信息</view>
			<view>手机号码：{{getPhone}}</view>
			<view>默认地址：{{getAddress}}</view>
			<view style="display: flex; flex-direction: row; justify-content: flex-end;">
				<u-button size="mini" style="margin:0 10rpx 0;" @click="modifyClick">修改</u-button>
			</view>
		</view>
		<!-- 我的订单和我的接单选择栏 -->
		<view class="order-container">
			<img src="@/static/plane.jpeg" alt="" class="order-img">
			<view class="order-button">
				<u-button style="margin: 0;" type="primary" @click="myOrderClick">我的订单</u-button>
				<u-button style="margin: 0;" @click="toMyPicker">我的接单</u-button>
			</view>
		</view>
		
		<loading
			ref="loading"
			:custom="false"
			:shadeClick="true"
			:type="1">
			<!-- <view class="test">自定义</view> -->
		</loading>
	</view>
</template>

<script>
	import loading from "@/component/xuan-loading/xuan-loading.vue"
	import {getToken, getInfo} from "@/network/user.js"
	import {usualLogin} from "@/utils/login.js"
	
	export default {
		data() {
			return {
				"username": "chenct",
				"current": 4.7,
				"money": 40,
				"phone": "15889233064",
				"address": "华南理工大学C10-556",
				"show": false,
			};
		},
		onShow(){
			if(this.$store.state.loginFlag == true){
				let params = {
					"token": this.$store.state.token
				}
				getInfo(params).then(res=>{
					console.log(res)
					if(res.data.code == 1001){
						this.$store.state.isLogin = res.data.infoObj.isLogin,
						this.$store.state.count = res.data.infoObj.count,
						this.$store.state.address = res.data.infoObj.address,
						this.$store.state.phone = res.data.infoObj.phone,
						this.$store.state.money = res.data.infoObj.money
						this.show = false
					}else {
						this.show = true
					}
				})
			}
		},
		methods:{
			rechargeClick(){
				uni.navigateTo({
					url: "/pages/recharge/recharge"
				})
			},
			toMyPicker(){
				uni.navigateTo({
					url: "/pages/pickOrder/pickOrder"
				})
			},
			modifyClick(){
				uni.navigateTo({
					url: "/pages/modifyInformation/modifyInformation"
				})
			},
			myOrderClick(){
				uni.navigateTo({
					url: "/pages/myOrder/myOrder"
				})
			},
			loginClick(){
				usualLogin(this.$store, this.$refs.loading)
			}
		},
		components:{
			loading
		},
		computed:{
			getUsername(){
				return this.$store.state.username
			},
			getLoginFlag(){
				return this.$store.state.loginFlag == false
			},
			getLoginFlag1(){
				return !this.$store.state.loginFlag == false
			},
			getAvatar(){
				return this.$store.state.avatar
			},
			getUserMoney(){
				return this.$store.state.money
			},
			getAddress(){
				return this.$store.state.address
			},
			getPhone(){
				return this.$store.state.phone
			}
		}
	}
</script>

<style lang="scss">
	.avatar-container{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		padding: 30rpx 40rpx;
		background-color: #fff;
		border-bottom: 2rpx solid #eee;
		.avatar-img{
			width: 100rpx;
			height: 100rpx;
		}
		.user-info{
			font-size: 30rpx;
			margin-left: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
	
	.money-container{
		padding: 20rpx 20rpx;
		font-size: 36rpx;
		border: 2rpx solid #8fb6f4;
		border-radius: 40rpx;
		margin: 30rpx 20rpx;
		box-shadow: 4rpx 4rpx 6rpx gray;
		.button-container{
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
		}
		.operate-button{
			margin: 0 10rpx;
		}
	}
	
	.my-info{
		border: 2rpx solid #8fb6f4;
		box-shadow: 4rpx 4rpx 6rpx gray;
		margin: 40rpx 20rpx;
		border-radius: 40rpx;
		padding: 20rpx 20rpx;
	}
	
	.order-container{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		box-shadow: 4rpx 4rpx 6rpx gray;
		padding: 20rpx 0;
		border-radius: 40rpx;
		border: 2rpx solid #8fb6f4;
		margin: 20rpx 20rpx;
		.order-img{
			width: 340rpx;
			height: 200rpx;
		}
		.order-button{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
</style>
