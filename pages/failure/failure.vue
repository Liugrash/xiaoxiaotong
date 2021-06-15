<template>
	<view class="root">
		<view class="img">
			<img src="../../static/img/wrong.png" alt="" style="height:100%,width:100%">
		</view>
		<view class="message">很遗憾，接单失败，下次加油</view>
		
		<view class="button">
			<u-button type="mini" class="back" @click="toSquare" :plain="true">
			继续接单</u-button>
				<!-- 去轮播图那一页 -->
			<u-button type="mini" class="check" @click="backMain" :plain="true">
				返回首页</u-button>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			toSquare(){
				uni.navigateTo({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss">
.root{
		display:flex;
		flex-direction: column;
		padding:50rpx 80rpx;
		
		.img{
			height:600rpx;
			width:600rpx;
			padding:0 20px;
			margin-bottom: 100rpx;
			img{
				width: 100%;
				height: 100%;
				margin:0rpx 30rpx;
			}
		}
	
		.message{
			font-size: 30rpx;
			text-align: center;
			font-weight: 600;
			margin-bottom: 200rpx;
		}
	
		.button{
			display: flex;
			justify-content: space-around;
		}
	}
</style>
