<template>
	<view class="root">
		<view class="img">
			<img src="../../static/img/sucess.png" alt="" style="height:100%,width:100%">
		</view>
		<view class="message">您已成功接单，请查看订单详情</view>
		<view class="messge_two">尽快与单主沟通!</view>
		<view class="button">
			<u-button type="mini" class="back" @click="backSquare" :plain="true">
				回到广场</u-button>
			<u-button type="mini" class="check" @click="check" :plain="true">
				查看订单详情</u-button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				oid:0
			}
		},
		methods:{
			backSquare(){
				uni.navigateBack({
					
				})
			},
			check(){
				
				uni.navigateTo({
					url:"../detail/detail?oid="+this.oid
					
				})
				console.log(' success de oid',this.oid)
			}
		},
		onLoad(options)
		{
			this.oid=options.oid;
		},
		props:{
			
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
			margin-bottom: 20rpx;
			text-align: center;
			font-weight: 600;
		}
		.messge_two{
			font-size: 30rpx;
			margin-bottom: 200rpx;
			text-align: center;
			font-weight: 600;
		}
		.button{
			position: relative;
			.back{
				position: absolute;
				left:0rpx;
			}
			.check{
				position: absolute;
				right:0rpx;
			}
		}
	}
</style>
