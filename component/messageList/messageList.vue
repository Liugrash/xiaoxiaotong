<template>
	<view>
			<view v-if="messageType==2" >
				<message 
				:messageType="messageType" 
				:isExPress="true"
				@messageItemClick="messageListClick" v-for="item in messageItemList" :messageitem="item" :oid="item.oid" :key="item.id">
					<img src="../../static/img/express.png" slot="img" alt="">
					<h2 slot="title">代取快递</h2>
				</message>
			</view>
			<view  v-if="messageType==3">
				<message  :messageType="messageType" 
				:isLearn="true"
				@messageItemClick="messageListClick" v-for="(item,index) in messageItemList" :messageitem="item" :oid="item.oid" :key="item.id">
					<img src="../../static/img/learn.png" alt="" slot="img">
					<h2 slot="title">学习辅导</h2>
				</message>
			</view>
			<view v-if="messageType==4">
				<message :messageType="messageType"
				:isTravel="true"
				@messageItemClick="messageListClick" v-for="(item,index) in messageItemList" :messageitem="item" :oid="item.oid" :key="item.id">
					<img src="../../static/img/shop.png" alt="" slot="img">			
					<h2 slot="title">组队出游</h2>
				</message>
			</view>
			<view v-if="messageType==1">
				<message  :messageType="messageType"
				:isBuy="true"
				@messageItemClick="messageListClick"  v-for="(item,index) in messageItemList" :messageitem="item" :oid="item.oid" :key="item.id">
					<img src="../../static/img/team.png" alt="" slot="img">
					<h2 slot="title">代购</h2>
				</message>
			</view>
	</view>
	
	
	
</template>

<script>
	import message from "../message/message.vue"
	export default {
		data(){
			return{
				type:0
			}
		},
		methods:{
			messageListClick(m,oid)
			{
				this.$emit("messageListClick",m,oid);
				console.log(m,oid)
				console.log("列表被点击了")
			}
		},
		components:{
			message
		},
		props:{
			messageType:{
				type:Number
			},
			//网络请求回来的数组
			messageItemList:{
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
</style>
