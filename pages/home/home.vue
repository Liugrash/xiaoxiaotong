<template>
	<view>
		<view class="wrap">
			<u-swiper :list="list" effect3d="true" mode="dot" height="440" autoplay @click="swiperClick"></u-swiper>
		</view>
		<view class="nav-container">
			<img src="@/static/recvGround.png" alt="" class="nav-img" @click="recvClick">
			<img src="@/static/placeGround.png" alt="" class="nav-img" @click="placeClick">
		</view>
		<view class="my-info">
			<view style="height: 20rpx;"></view>
			<view class="info-text">校小通 </view>
			<view class="info-desc">———— 通一人，通一校，通一城</view>
			<view class="user-container">
				<img :src="getUserAvater" alt="" class="user-img">
				<view style="margin-left: 30rpx;">{{getUsername}}</view>
			</view>
			<view class="to-user" @click="toUserClick">个人中心</view>
		</view>
	</view>
</template>

<script>
	import {getSwiper} from "@/network/recvOrder.js"
	
	export default {
		onLoad(){
			getSwiper().then(res=>{
				this.list = res.data.swiperList
			})
		},
		data() {
			return {
				list: [],
			};
		},
		methods:{
			placeClick(){
				uni.switchTab({
					url: "/pages/placeOrder/placeOrder"
				})
			},
			recvClick(){
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			toUserClick(){
				uni.switchTab({
					url: "/pages/user/user"
				})
			},
			swiperClick(index){
				uni.navigateTo({
					url: "/pages/webLink/webLink?src=" + this.list[index].link_url
				})
			}
		},
		computed:{
			getUsername(){
				return this.$store.state.username
			},
			getUserAvater(){
				return this.$store.state.avatar
			}
		}
	}
</script>

<style lang="scss">
	.wrap{
		padding: 20rpx;
	}
	
	.nav-container{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx;
		.nav-img{
			width: 340rpx;
			height: 240rpx;
		}
	}
	
	.my-info{
		height: 400rpx;
		background-color: #e5f1fc;
		margin: 0 20rpx;
		border-radius: 40rpx;
		box-shadow: 5rpx 5rpx 10rpx gray;
		position: relative;
		.info-text{
			color: #a2c6f9;
			margin-left: 20rpx;
			font-size: 40rpx;
		}
		.info-desc{
			color: #a2c6f9;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			margin-right: 10rpx;
			font-size: 30rpx;
		}
		.to-user{
			position: absolute;
			right: 40rpx;
			bottom: 60rpx;
			background-color: #fdf7e0;
			padding: 10rpx 30rpx;
			border-radius: 40rpx;
		}
	}
	
	.user-container{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		font-size: 30rpx;
		color: $uni-mint-color;
		margin-left: 20rpx;
		line-height: 100rpx;
		.user-img{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50rpx;
		}
	}
</style>
