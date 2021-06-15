<template>

	<view class="root" :class="{recComplete:isRecComplete,recOngoing:isRecOngoing}">
		<view class="left">
			<view class="row top">
				<view class="icon">
					<!-- 通过传进来的数据的stateid决定渲染哪种图片 -->
					<img src="../../static/img/shop.png" v-if="recOrderItem.state_id==1">
					<img src="../../static/img/express.png" v-if="recOrderItem.state_id==2">
					<img src="../../static/img/learn.png" v-if="recOrderItem.state_id==3">
					<img src="../../static/img/team.png" v-if="recOrderItem.state_id==4">
				</view>
				<view class="title">
					<view class="text" v-if="recOrderItem.state_id==1">代购</view>
					<view class="text" v-if="recOrderItem.state_id==2">快递代取</view>
					<view class="text" v-if="recOrderItem.state_id==3">学习辅导</view>
					<view class="text" v-if="recOrderItem.state_id==4">组队出游</view>
				</view>
			</view>
			<view class="info">
				<view  class="row">
					<view class="text">地点:</view>
					<view>{{recOrderItem.address}}</view>
				</view>				
				<view  class="row" >
					<view class="text">接单时间:</view>
					<view>{{recOrderItem.pub_date}}</view>
				</view>
				<view>
					<view class="text">概述:</view>
					<view>{{recOrderItem.note}}</view>
				</view>
				

			</view>
		
		</view>
		<view class="right">
			<view class="salary" style="display: flex;">
				<view class="text">通币：</view>
				<view>{{recOrderItem.pay}}枚</view>	
			</view>			
			<view class="detail" v-if="isRecOngoing">
				<u-button type="mini" :custom-style="customStyle" @click="checkDetail">查看订单详情</u-button>
			</view>
		</view>

	</view>
	

</template>

<script>
	export default {
		data(){
			return{
					address:"图书馆",
					detail:"我是概述我是概述我是概述，我是概述我是概述，我是",
					pay:100,
					arrive_date:"2021-06-05",
					oid:"1",
					state_id:1,
					customStyle:{
						width:"200rpx",
						height:"100rpx",
						fontSize:"30rpx"
					}
			}		
		},
		methods:{
			checkDetail()
			{
				this.$emit('detailCheck',this.recOrderItem.oid)
			}
		},
		props:{
			
			recOrderItem:{
				type:Object
			},
			//区分不同单子的内容
			isRecOngoing:{
				type:Boolean,
				defalt:false
			},
			isRecComplete:{
				type:Boolean,
				default:false
			}
		}
		
	}
</script>

<style lang="scss">

	.recOngoing{
		border:6rpx solid #55efc4;
		box-shadow:8rpx 16rpx 10rpx #c1c6cf;
	}
	.recComplete{
		border:6rpx solid #00b894;
		box-shadow:8rpx 16rpx 10rpx #c1c6cf;
	}

	.root{
		display:flex;
		flex-direction: row;
		border-radius: 20rpx;
		padding:20rpx 20rpx;
		padding-top: 30rpx;
		margin-bottom: 40rpx;
		.left{
			display:flex;
			flex-direction: column;
			flex:1.8;
			.top{
				display:flex;
				//垂直居中
				align-items: center;
				height:60rpx;
				line-height: 60rpx;
				margin-bottom: 10rpx;
				.icon{
					width:40rpx;
					height:40rpx;
					margin-right:10rpx;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.title{
					font-size: 50rpx;
					font-weight:700;
				}
			}
		}
		.right{
			flex:1;
		}
		
		.info{
			display:flex;
			flex-direction: column;
			margin-top:30rpx;
			.row{
				margin-bottom: 20rpx;
				height:30rpx;
				line-height:30rpx;
				.text{
					font-size: 30rpx;
					margin-right: 10rpx;
				}
			}
			.general{
				display:flex;
				flex-direction: row;
				.abstract{
					font-size: 40rpx;
					font-weight: 700;
				}
				
				.detail{
					font-size: 30rpx;
					width:375rpx;
					
				}
			}
		
		}
		
		
	}
	.row{
		display: flex;
		text-align: center;
	}
	
	.right{
		display:fixed;
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
		.detail{
			position: absolute;
			bottom: 0rpx;
			right:0rpx;
		}

	}
</style>
