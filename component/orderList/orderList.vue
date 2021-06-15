<template>
	<view>
		<view>
			<view v-if="orderType==1">
				<order 
				:orderType="orderType" 
				:isOngoing="true"
				 :orderItem="item"
				>
				<!-- @confirmClick="orderConfirmClick" -->
					<img src="../../static/img/ongoing.png" slot="img" alt="">
					<h3 slot="title">待完成</h3>
				</order>
			</view>
			<view v-if="orderType==2">
				<order 
				:orderType="orderType" 
				:isComment="true"
				 :orderItem="item"
				>
				<!-- @commentClick="orderCommentClick" -->
					<img src="../../static/img/comment.png" slot="img" alt="">
					<h3 slot="title">待评价</h3>
				</order>
			</view>
			<view v-if="orderType==3">
				<order
				:orderType="orderType"
				:isComplete="true"
				 :orderItem="item"
				>
					<img src="../../static/img/complete.png" slot="img" alt="">
					<h3 slot="title">已完成</h3>
				</order>
			</view>
		</view>
	</view>
	
	
	
</template>

<script>
	import order from "../order/order.vue"
	export default {
		data(){
			return{
				type:1,
				
			}
		},
		methods:{

		},
		components:{
			order
		},
		props:{
			orderType:{
				type:Number,
				
			},

			orderItemList:{
				type:Array,
			}
		}
	}
</script>

<style lang="scss">
	img{
		width: 100%;
		height: 100%;
	}
	.confirm-btn{
		position: absolute;
		bottom:0px;
	}
</style>
