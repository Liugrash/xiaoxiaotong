<template>

	<view class="root" :class="{express:isExPress,learn:isLearn,travel:isTravel,buy:isBuy}">
		<view class="left">
			<view class="row top">
				<view class="icon">
					<slot name="img"></slot>
				</view>
				<view class="title">
					<slot name="title"></slot>
				</view>
			</view>
			<view class="info">
				<view  class="row">
					<view class="text"	v-if="isExPress||isBuy">收货地址：</view>
					<view class="text"	v-if="isLearn">辅导地址：</view>
					<view class="text"	v-if="isTravel">前往地址：</view>
					<view>{{messageitem.address}}</view>
				</view>
				
				<view  class="row" >
					<view class="text" v-if="isBuy||isExPress">送达时间：</view>
					<view class="text"  v-if="isTravel">前往时间：</view>
					<view class="text" v-if="isLearn">辅导时间：</view>
					<view>{{messageitem.arrive_date}}</view>
				</view>
				
				<view  class="general">  
					<view class="abstract">概述：</view>
					<view class="detail">
						{{messageitem.note}}
					
					</view>
					
				</view>
			</view>
		
		</view>
		<view class="right">
			<view class="salary" style="display: flex;">
				<view class="text">通币：</view>
				<view>{{messageitem.pay}}枚</view>	
			</view>
			<u-button  class="confirm-btn" type="mini" 
			@click="confirm" :plain="true" :ripple="true">确认接单</u-button>
		</view>
	</view>
	

</template>

<script>
	export default {
		data(){
			return{
					
					address:"图书馆",
					time:"10:00",
					detail:"我是一个测试用例",
					salary:100,
					deadline:"6.10",
					duration:"1h",
					targetAddress:"c10"
					
					
			}
		},
		methods:{
			//点击的时候传递单号的id，参数里应该有id，后台区分点击了接了哪一单
			confirm(){
				this.$emit("messageItemClick",this.messageType,this.oid)
				console.log("按钮被点击了")
			}
			
		},
		props:{
			//遍历渲染的对象
			messageitem:{
				type:Object
			},
			oid:{
				type:Number
			},
			messageType:{
				type:Number
			},
			expressItem:{
				type:Object
			},
			isExPress:{
				type:Boolean,
				default:false
			},
			isLearn:{
				type:Boolean,
				default:false
			},
			isTravel:{
				type:Boolean,
				default:false
			},
			isBuy:{
				type:Boolean,
				default:false
			}
		}
		
	}
</script>

<style lang="scss">
	.express{
		border:6rpx solid $uni-electron;
		box-shadow:8rpx 8rpx 10rpx 8rpx #c1c6cf;
	}
	.learn{
		border:6rpx solid $uni-green;
		box-shadow:8rpx 8rpx 10rpx  8rpx #c1c6cf;
	}
	.travel{
		
		border:6rpx solid $uni-faded;
		box-shadow:8rpx 8rpx 10rpx  8rpx #c1c6cf;
	}
	.buy{
		border: 6rpx solid $uni-light-greenish;
		box-shadow:8rpx 8rpx 10rpx 8rpx #c1c6cf;
	}
	.root{
		display:flex;
		flex-direction: row;
		border-radius: 40rpx;
		padding:40rpx 30rpx;
		padding-top: 30rpx;
		margin-bottom: 40rpx;
		.left{
			display:flex;
			flex-direction: column;
			margin-right: 10rpx;
			flex:2;
			.top{
				display:flex;
				//垂直居中
				align-items: center;
				height:60rpx;
				line-height: 60rpx;
				margin-bottom: 20rpx;
				.icon{
					width:40rpx;
					height:40rpx;
					margin-right:10rpx;
				}
				.title{
					font-size: 50rpx;
					font-weight:700;
				}
			}
			
		}
		
		
		.info{
			display:flex;
			flex-direction: column;
		
			.row{
				margin-bottom: 20rpx;
				height:30rpx;
				line-height:30rpx;
			.text{
					font-size: 30rpx;
				}
			}
			.gereral{
				display: flex;
				flex-direction: column;
				.abstract{
					font-size: 40rpx;
					font-weight: 700;
				}
				.detail{
					font-size: 30rpx;
					
				}
			
			}
		}
	}
	.row{
		display: flex;
		text-align: center;
	}
	
	.right{
		flex:1;
		position:relative;
		.salary{
			position:absolute;
			top:0px;
			height:60rpx;
			line-height: 60rpx;
			text-align: center;
			.text{
				font-size: 35rpx;
				font-weight: 600;
			}
		}
		.confirm-btn{
			position: absolute;
			bottom:0px;
		}
	}
</style>
