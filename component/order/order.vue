<template>
	<view class="parent" :class="{ongoing:isOngoing,comment:isComment,complete:isComplete}" v-if="display">
		<view class="root">
			<view class="left">
				<view class="row top">
					<view class="icon">
						<!-- 通过传进来的数据的stateid决定渲染哪种图片 -->
						<img src="../../static/img/shop.png" v-if="orderItem.state_id==1">
						<img src="../../static/img/express.png" v-if="orderItem.state_id==2">
						<img src="../../static/img/learn.png" v-if="orderItem.state_id==3">
						<img src="../../static/img/team.png" v-if="orderItem.state_id==4">
					</view>
					<view class="title">
						<view class="text" v-if="orderItem.state_id==1">代购</view>
						<view class="text" v-if="orderItem.state_id==2">快递代取</view>
						<view class="text" v-if="orderItem.state_id==3">学习辅导</view>
						<view class="text" v-if="orderItem.state_id==4">组队出游</view>
					</view>
				</view>
				<view class="info">
					<view  class="row">
						<view class="text">地点：</view>
						<view>{{orderItem.address}}</view>
					</view>				
					<view  class="row" >
						<view class="text">发单时间：</view>
						<view>{{orderItem.arrive_date}}</view>
					</view>
					<view >
						<view class="text">概述：</view>
						<view>{{orderItem.note}}</view>
					</view>
				</view>
			</view>
			<view class="right">
				<view class="salary" style="display: flex;">
					<view class="text">通币：</view>
					<view>{{orderItem.pay}}枚</view>	
				</view>			
				<!-- <view>
					<u-button v-if="isOngoing" type="mini" @click="backOrder">撤回</u-button>
					<u-button  v-if="isOngoing" class="confirm-btn" type="mini" @click="confirmClick" :plain="true" :ripple="true">确认完成</u-button>
				</view> -->
				<view v-if="isComment">
						<u-button  class="comment-btn" type="mini" @click="judgeShow=true" >评价</u-button>
				</view>	
			</view>
		</view>
		<view class="bottom" v-if="isOngoing" >
			<u-button  class="back-btn" type="mini" @click="backOrder">撤回</u-button>
			<u-button  class="confirm-btn" type="mini" @click="confirmClick" >确认完成</u-button>
		</view>
		<u-modal v-model="judgeShow" @confirm="sendComment" confirm-text="确认评论" title="评价" :show-cancel-button="true">
			<view class="content-slot">
				<view class="tip">快对跑腿小哥给点建议和打个服务星级吧！</view>
				<view class="critic">
					<view style="font-weight: 600;margin-bottom: 10rpx;">评价：</view>
					<u-input v-model="commentValue" type="textarea" :border="border" :auto-height="true" height="200rpx">
						
					</u-input>
				</view>
				<view class="rateBox">
					<view style="font-weight: 600;">服务水平：</view>
					<u-rate :count="count" v-model="rateValue"></u-rate>
				</view>

			</view>
		
		</u-modal>
	</view>

</template>

<script>
	export default {
		data(){
			return{
				//输入框属性
				commentValue: '',
				border: true,
				
				//评分的属性
				count: 5,
				rateValue: 4,
				
				comment:"牛",
				judgeShow:false,
				
				// oid:"1",
				// address:"图书馆",
				// detail:"我想要去拿一本书我想要去拿一本书，要去我想要去拿一本书",
				// pay:100,
				// arrive_date:"2021-06-05",
				
				// state_id:1,
				display:true
			}		
		},
		methods:{
			//确认完成未完成的订单
			confirmClick(){
				//发网络请求，也要单子消失
				
				this.$emit('confirmClick',this.orderItem.oid)
			},
			backOrder(){
				//要撤回这条数据要有网络请求的,判断撤回是否成功
				this.$emit('backClick',this.orderItem.oid)
			
			},
		
			sendComment(){
				//网络请求 post
				this.$emit('sendCommit',this.rateValue,this.commentValue,this.orderItem.oid)
				this.judgeShow=false
			}
			
		},
		props:{
			//遍历渲染的对象
			orderItem:{
				type:Object
			},
			isOngoing:{
				type:Boolean,
				defalt:false
			},
			isComplete:{
				type:Boolean,
				default:false
			},
			isComment:{
				type:Boolean,
				default:false
			}
		}
		
	}
</script>

<style lang="scss">
	.rateBox{
		margin-top: 20rpx;
		height:80rpx;
	}
	.popTitle{
		font-size:40rpx;
		font-weight:40rpx;
		text-align: center;
		margin-bottom: 20rpx;
	}

	.ongoing{
		border:6rpx solid #55efc4;
		box-shadow:8rpx 16rpx 10rpx #c1c6cf;
	}
	.complete{
		border:6rpx solid #0984e3 ;
		box-shadow:8rpx 16rpx 10rpx #c1c6cf;
	}
	.comment{
		border:6rpx solid #74b9ff;
		box-shadow:8rpx 16rpx 10rpx #c1c6cf;
	}
	.parent{
		display: flex;
		flex-direction: column;
		padding:50rpx 30rpx;
		padding-top: 30rpx;
		border-radius: 40rpx;
		margin-bottom: 30rpx;
	}
	.root{
		display:flex;
		flex-direction: row;
		margin-bottom: 10rpx;
		.left{
			display:flex;
			flex-direction: column;
			flex:2;
			margin-right: 0rpx;
			.top{
				display:flex;
				//垂直居中
				align-items: center;
				height:60rpx;
				line-height: 60rpx;
				margin-bottom: 20rpx;
				.icon{
					width:60rpx;
					height:60rpx;
					margin-right:10rpx;
					img{
						width:100%;
						height:100%;
					}
				}
				.title{
					font-size: 40rpx;
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
	
		.comment-btn{
			position:absolute;
			bottom:5rpx;
			right:0px;
		}
	}
	.bottom{
		display: flex;
		height: 40rpx;
		position: relative;
		.back-btn{
			position: absolute;
			left:0rpx;
		}
		.confirm-btn{
			position: absolute;
			right:0rpx;
		}
	}
	.content-slot{
		padding:30rpx;
		width: 100%;
		.tip{
			font-size: 20rpx;
			color: 	#A9A9A9;
			margin-bottom: 15rpx;
		}
		.critic{
			display: flex;
			flex-direction: column;
	
		}
		.rataBox{
			display: flex;
		}
	}
</style>
