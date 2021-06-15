<template>
	<view class="root">
		<u-icon name="arrow-left" @click="backClick" style="position: absolute; left: 10rpx; top: 60rpx;" size="40"></u-icon>
		<view class="top">
			<view class="title">查看订单详情</view>
		</view>
		<view class="message-detail">
			<view class="text">订单详情：</view>
			<view class="content">
				{{message}}
			</view>
		</view>
		
		<view class="phonenumber-pic">
			<view class="phonenumber">
				<view class="text">单主联系方式：</view>
				<view class="number">{{phonenumber}}</view>
			</view>
			<view class="pic">
				<view class="text">图片备注：</view>
				<view class="img">
					<u-image :src="imgUrl" width="100%" height="100%"></u-image>
				</view>
			
			</view>
		</view> 
	</view>
</template>

<script>
	import {getDetail} from "@/network/detail.js"
	export default {
		data() {
			return {
				imgUrl:'',
				detail:'',
				phonenumber:"111",
				oid:-1,
				message:""
				
			};
		},
		onLoad(options){
			console.log(options.oid)
			console.log("详情页拿到的oid",this.oid)
			this.getDetailInfo(options.oid);
		},
		methods:{
			getDetailInfo(oid)
			{
				let params={
					token:this.$store.state.token,
					oid:oid
				}
				getDetail(params).then(res=>{
					console.log(res)
					this.message=res.data.data.note;
					this.phonenumber=res.data.data.phone
					this.imgUrl=res.data.data.pub_img
				})
			},
			backClick(){
				uni.navigateBack({
					delta: 1,
				})
			}
		}
	}
</script>

<style lang="scss">
	.root{
		display: flex;
		flex-direction: column;
		
		.top{
			height:350rpx;
			width:100%;
			padding: 120rpx 80rpx 100rpx 80rpx;
			background-color: #00cec9;
		
			.title{
				font-size: 60rpx;
				font-weight: 700;
				margin-bottom: 30rpx;
			}
			.mesagae{
				font-size: 50rpx;
				
			}
		}
		.message-detail{
			position: fixed;
			top:320rpx;
			left:40rpx;
			right:40rpx;
			height: 380rpx;
			border-radius: 20rpx;
			background-color: white;
			padding:20rpx 60rpx;
			box-shadow: 0rpx 20rpx 40rpx 8rpx #c1c6cf;
			margin-bottom: 40rpx;
			
			.text{
					font-size: 40rpx;
					font-weight: 700;
					margin-bottom: 20rpx;
			}
			.content{
				font-size: 30rpx;
			}
			
			
		}
		.phonenumber-pic{
		position: fixed;
		top:730rpx;
		left:40rpx;
		right:40rpx;
		height: 600rpx;
		border-radius: 20rpx;
		background-color: white;
		padding:20rpx 60rpx;
		box-shadow: 0rpx 20rpx 40rpx 8rpx #c1c6cf;
		.phonenumber{
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			.text{
				font-size: 40rpx;
				font-weight: 700;
			}
			.number{
				font-size: 30rpx;
			}
		}
		.pic{
			.text{
				font-size: 40rpx;
				font-weight: 700;
				margin-bottom: 20rpx;
			}
			.img{
				width:400rpx;
				height: 400rpx;
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
			
		}
	}
</style>
