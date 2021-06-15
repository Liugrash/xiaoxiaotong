<template>
	<view>
		<u-grid :col="2">
			<u-grid-item @click="change" :bg-color="show == true ? '#74b9ff' : '' ">
				<u-icon name="lock-open" :size="46"></u-icon>
				<view class="grid-text">待完成</view>
			</u-grid-item>
			<u-grid-item @click="change" :bg-color="show == false ? '#74b9ff' : '' ">
				<u-icon name="lock" :size="46"></u-icon>
				<view class="grid-text">已完成</view>
			</u-grid-item>
		</u-grid>
		<view v-if="show" class="basic">
			<rec-order :isRecOngoing="true" v-for="item in unCompletedList" :key="item.id" :recOrderItem="item" @detailCheck="toDetail"></rec-order>
			<u-divider half-width="200rpx" >我是有底线的</u-divider>
		</view>
		<view v-if="!show" class="basic">
			<rec-order :isRecComplete="true" v-for="item in completedList" :key="item.id" :recOrderItem="item"></rec-order>
			<u-divider half-width="200rpx" >我是有底线的</u-divider>
		</view>
		
	</view>
</template>

<script>
	import recOrder from "@/component/order/recOrder.vue"
	import {getRecvOrder} from "@/network/recvOrder.js"
	export default {
		data() {
			return {
				list:[{
					name:"未完成"
				},{
					name:"已完成"
				}],
				show:true,
				unCompletedID:1,
				completedID:1,
				unCompletedList:[],
				completedList:[]
			};
		},
		components:{
			recOrder
		},
		onLoad(){
			this.getUncompletedOrder()
			this.getCompletedOrder()
		},
		methods:{
			getUncompletedOrder(){
				let params={
					token:this.$store.state.token,
					page_id:this.unCompletedID,
					recv_state:1
				}
				getRecvOrder(params).then(res=>{
					this.unCompletedList=res.data.orderList;
					console.log(res)
				})
			},
			getCompletedOrder(){
				let params={
					token:this.$store.state.token,
					page_id:this.completedID,
					recv_state:2
				}
				getRecvOrder(params).then(res=>{
					this.completedList=res.data.orderList;
					console.log(res)
				})
			},
			change(){
				this.show=!this.show
			},
			toDetail(oid){
				uni.navigateTo({
					url:"/pages/detail/detail?oid="+oid
				})
			}
			
			
		}
	}
</script>

<style lang="scss">
	.basic{
		margin-top: 20rpx;
		padding:0 40rpx;
	}
</style>
