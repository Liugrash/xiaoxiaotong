<template>
	<view class="root">
		<view class="left">
			<view class="type row">
				<view class="text">订单类型:</view>
				<view>代取快递</view>
			</view>
			<view class="number row">
				<view class="text">订单编号:</view>
				<view>1</view>
			</view>
			<view class="time row" v-if="picked">
				<view class="time">接单时间:</view>
				<view>20210610</view>
			</view>
			<view class="time row" v-if="sended">
				<view class="time">发单时间：</view>
				<view>20210610</view>
			</view>
		</view>
		<view class="right">
			<view class="salary">
				<view class="text">通币:</view>
				<view>100枚</view>
			</view>
		
			<u-button type="mini" @click="confirm" class="btn" v-if="!success">查看详情</u-button>
			
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				oid:-1
			}
		},
		methods:{
			confirm(){
				this.$emit('checkDetail',this.oid)
			}
		},
		props:{
			orderitem:{
				type:Object
			},
			picked:{
				type:Boolean
			},
			sended:{
				type:Boolean
			},
			success:{
				type:Boolean
			}
		}
	}
</script>

<style lang="scss">
	.root{
		display: flex;
		border: 5rpx solid black;
		box-shadow: 4rpx 10rpx 10rpx 6rpx #c1c6cf;
		border-radius: 20rpx;
		padding:40rpx 20rpx;
		padding-top: 30rpx;
		margin-bottom: 30rpx;
		.left{
			display: flex;
			flex-direction: column;
			flex:2;
			
			.row{
				display: flex;
				align-items: center;
			}
			.type{
				
				margin-bottom: 25rpx;
				.text{
					font-size: 40rpx;
					font-weight: 600;
					margin-right: 10rpx;
				}
			}
			.number{
				margin-bottom: 25rpx;
				.text{
					font-weight: 500;
					margin-right: 10rpx;
				}
			}
			.time{
				.text{
					font-weight: 500;
					margin-right: 10rpx;
				}
			}
		}
		.right{
			display: flex;
			flex-direction: column;
			
			position: relative;
			flex:1;
			.salary{
				display: flex;
				flex:2;
				position: absolute;
				top:0rpx;
				height: 52rpx;
				line-height: 52rpx;
				.text{
					font-size:30rpx;
					font-weight: 700;
					margin-right: 10rpx;
				}
			}
			.btn{
				position: absolute;
				bottom: 0rpx;
			}
			
		}
	}
</style>
