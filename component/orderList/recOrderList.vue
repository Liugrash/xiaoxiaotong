<template>
	<view>
		<view>
			<recOrder v-if="recOrderType==1" 
			:recOrderType="recOrderType" 
			:isRecOngoing="true"
			v-for="item in recOrderItemList" :recOrderItem="item">
				<img src="../../static/img/ongoing.png" slot="img" alt="">
				<h3 slot="title">待完成</h3>
			</recOrder>

			<recOrder v-if="recOrderType==2" 
			:recOrderType="recOrderType"  
			:isRecComplete="true"
			v-for="item in recOrderItemList" :recOrderItem="item">
				<img src="../../static/img/complete.png" slot="img" alt="">
				<h3 slot="title">已完成</h3>
			</recOrder>
			
		</view>
	</view>
	
	
	
</template>

<script>
	import recOrder from "../order/recOrder.vue"
	export default {
		data(){
			return{
				type:1,
				recOrderType:1
			}
		},
		methods:{

		},
		components:{
			recOrder
		},
		props:{
			recOrderType:{
				type:Number,
				
			},
			//网络请求回来的message列表
			recOrderItemList:{
				type:Array
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
