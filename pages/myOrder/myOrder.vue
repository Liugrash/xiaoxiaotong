<template>
	<view>
		<u-grid :col="3">
			<u-grid-item @click="currentOrderType=1" :bg-color="currentOrderType == 1 ? '#74b9ff' : '' ">
				<u-icon name="lock-open" :size="46"></u-icon>
				<view class="grid-text">待完成</view>
			</u-grid-item>
			<u-grid-item @click="currentOrderType=2" :bg-color="currentOrderType == 2 ? '#74b9ff' : '' ">
				<u-icon name="chat" :size="46"></u-icon>
				<view class="grid-text">待评价</view>
			</u-grid-item>
			<u-grid-item @click="currentOrderType=3" :bg-color="currentOrderType == 3 ? '#74b9ff' : '' ">
				<u-icon name="lock" :size="46"></u-icon>
				<view class="grid-text">已完成</view>
			</u-grid-item>
		</u-grid>
		<view class="orderList" v-show="currentOrderType==1">
			<order :isOngoing="true" v-for="item in onGoingList" :key="item.id" :orderItem="item" 
			@backClick="backOrder" @confirmClick="sureSuccessOrder"></order>
			<view v-if="firstDivider">
				<u-divider  half-width="200" fontSize="20rpx" v-if="">我是有底线的</u-divider>
				<view style="height:100rpx"></view>
			</view>
		</view>
		<view  class="orderList" v-show="currentOrderType==2">
			<order :isComment="true"  v-for="item in onCommentList" :key="item.id" :orderItem="item" @sendCommit="postRating"></order>
			<view v-if="secondDivider">
				<u-divider  half-width="200" fontSize="20rpx" >我是有底线的</u-divider>
				<view style="height:100rpx"></view>
			</view>
		</view>
		<view class="orderList" v-show="currentOrderType==3">
			<order :isComplete="true" v-for="item in onCompletedList" :key="item.id" :orderItem="item"></order>
			<view v-if="thirdDivider">
				<u-divider  half-width="200" fontSize="20rpx">我是有底线的</u-divider>
				<view style="height: 100rpx;"></view>
			</view>
		</view>
		<u-modal v-model="confirmShow" :content="confirmContent" :show-cancel-button="true" @confirm="sureFinish"></u-modal>
		<u-modal v-model="backShow" :content="backContent" :show-cancel-button="true" @confirm="sureBack"></u-modal>
		<u-back-top :scroll-top="scrollTop" top="600" icon="arrow-up" tips="返回" right="0" bottom="300"></u-back-top>
	</view>
</template>

<script>
	import order from "../../component/order/order.vue"
	import {getSendOrder} from "../../network/sendOrder.js"
	import {backSendOrder} from "@/network/sendOrder.js"
	import {rating} from "@/network/sendOrder.js"
	import {sureSuccess} from "@/network/sendOrder.js"
	export default {
		data() {
			return {
				currentOrderType:1,
				scrollTop:0,
				onGoingList:[],
				onCommentList:[],
				onCompletedList:[],
				
				onGoingPage:1,
				onCommentPage:1,
				onCompletedPage:1,
				firstDivider:false,
				secondDivider:false,
				thirdDivider:false,
				//2个模态框
				confirmContent:"确认完成接单后通币将会立即返回接单同学账户，如有疑问咨询客服",
				confirmShow:false,
				backContent:"目前单子还未被接单，若撤回单子，单子会永久销毁",
				backShow:false,
				//被点击的物品的oid
				clickedOid:-1
				
			}
		},
		//出现页面就要刷新
		onShow()
		{
			this.refresh()
		},
		onReachBottom(){
			this.addList();
		},
		onPageScroll(e)
		{
			this.scrollTop = e.scrollTop
		},
		components:{
			order
		},
		methods:{
			refresh(){
				this.onGoingList=[]
				this.onCommentList=[]
				this.onCompletedList=[]
				this.onGoingPage=1
				this.onCommentPage=1
				this.onCompletedPage=1
				this.getOnGoing()
				this.getOnComment()
				this.getOnComplete()
			},
			getOnGoing(){
				let params={
					token:this.$store.state.token,
					page_id:this.onGoingPage,
					pub_state:1
				}
				getSendOrder(params).then(res=>{
					console.log(res.data.code)
					if(res.data.code==1001)
					{
						this.onGoingList=[...this.onGoingList,...res.data.orderList]
					}
					else if(res.data.code==1007){
						console.log('已经没数据了')
						this.firstDivider=true;
						//页号是停留在有信息的最后一页
						this.onGoingPage--;
						console.log(this.onGoingPage)
					}
				})
			},
			getOnComment(){
				let params={
					token:this.$store.state.token,
					page_id:this.onCommentPage,
					pub_state:2
				}
				getSendOrder(params).then(res=>{
					console.log(res)
					if(res.data.code==1001)
					{
						this.onCommentList=[...this.onCommentList,...res.data.orderList]
					}
					else if(res.data.code==1007){
						console.log('已经没数据了')
						this.secondDivider=true;
						this.onCommentPage--;
						console.log(this.onCommentPage)
					}
					
				})
			},
			getOnComplete(){
				let params={
					token:this.$store.state.token,
					page_id:this.onCompletedPage,
					pub_state:3
				}
				getSendOrder(params).then(res=>{
					console.log(res)
				
					if(res.data.code==1001)
					{
						this.onCompletedList=[...this.onCompletedList,...res.data.orderList]
					}
					else if(res.data.code==1007){
						console.log('已经没数据了')
						this.thirdDivider=true
						this.onCompletedPage--
						console.log(this.onCompletedPage)
					}
				
					
				})
			},
			postRating(rateValue,commentValue,oid){
				let params={
					token:this.$store.state.token,
					oid:oid
				}
				let data={
					detail:commentValue,
					count:rateValue
				}
				rating(params,data).then(res=>{
					console.log(res)
					this.refresh();
				})
			},
			
			backOrder(oid){
				// console.log(oid)
				this.clickedOid=oid;
				this.backShow=true;
			},
			//模态框的确认撤回
			sureBack(){
				let params={
					token:this.$store.state.token,
					oid:this.clickedOid
				}
				backSendOrder(params).then(res=>{
					console.log(res)
					if(res.data.code==1001)
					{
						this.refresh();
					}
					if(res.data.code==1009)
					{
						console.log('订单已经被接受，不可以撤回')
					}
					
					
				})
			},
			//弹出模态框
			sureSuccessOrder(oid){
				this.confirmShow=true
				this.clickedOid=oid
			},
			//模态框确认键按下后刷新
			sureFinish(){
				let params={
					token:this.$store.state.token,
					oid:this.clickedOid
				}
				sureSuccess(params).then(res=>{
					console.log(res)
					if(res.data.code==1001)
					{
						this.refresh()
					}
				})
			},
			addList()
			{
				if(this.currentOrderType==1)
				{
					this.addOnGoingList()
				}
				if(this.currentOrderType==2)
				{
					this.addOnCommentList()
				}
				if(this.currentOrderType==3)
				{
					this.addOnComplete()
				}
			},
			addOnGoingList(){
				this.onGoingPage++;
				this.getOnGoing()
			},
			addOnCommentList(){
				this.onCommentPage++;
				this.getOnComment()
			},
			addOnComplete(){
				this.onGoingPage++
				this.getOnComplete()
			}
		}
	}
</script>

<style lang="scss">

.orderList{
	padding:0 50rpx;
	margin-top: 20rpx;
}
</style>
