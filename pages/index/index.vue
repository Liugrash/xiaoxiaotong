<template>
	<view>
		<view class="wrap">
			<view>
				<u-tabs-swiper ref="utabs" :list="list" :isScroll="false" :current="current" @change="tabChange" class="u-tabs-swiper">
				</u-tabs-swiper>
			</view>
			<view class="location"></view>
		
			<swiper :current="swipercurrent" 
			@transition="transition" 
			@animationfinish="animationfinish" 
			class="swiper">
			<swiper-item class="swiper-item" >
				<scroll-view ref="firstscroll"scroll-y="true" style="height:100%;width:100%;" :show-scrollbar="false"
				 @scrolltolower="addBuy" :lower-threshold="300">
					<!-- <u-button type="mini" @click="loginclick">申请token</u-button> -->
					<messagelist class="list" :messageType="1" @messageListClick="popUpModal" :messageItemList="buyItems"></messagelist>
					<u-divider half-width="200" fontSize="20rpx">我是有底线的</u-divider>
					<view style="height: 100rpx;"></view>
				</scroll-view>
				
			</swiper-item>
			
			<swiper-item>
				<scroll-view scroll-y="true" style="height:100%;width:100%;" @scrolltolower="addExpress" 
				:lower-threshold="300" :refresher-enbaled="expressRefresh">
					<messagelist class="list" :messageType="2" @messageListClick="popUpModal" 
					:messageItemList="expressItems">
					</messagelist>
					<u-divider  half-width="200" fontSize="20rpx">我是有底线的</u-divider>
					<view style="height: 100rpx;"></view>
					
				</scroll-view>
			</swiper-item>
			
			<swiper-item>
				<scroll-view scroll-y="true" style="height:100%;width:100%;" @scrolltolower="addLearn" :lower-threshold="300">
					<messagelist class="list" :messageType="3" @messageListClick="popUpModal" :messageItemList="learnItems"></messagelist>
					<u-divider   half-width="200" fontSize="20rpx">我是有底线的</u-divider>
					<view style="height: 100rpx;"></view>
					
				</scroll-view>
			</swiper-item>
			
			<swiper-item>
				<scroll-view scroll-y="true" style="height:100%;width:100%;" @scrolltolower="addTeam" :lower-threshold="300">
					
					<messagelist class="list" :messageType="4" @messageListClick="popUpModal" :messageItemList="teamItems"></messagelist>
					<u-divider  half-width="200" fontSize="20rpx">我是有底线的</u-divider>
					<view style="height: 100rpx;"></view>
				</scroll-view>
			</swiper-item>
			</swiper>
		
			<u-modal ref="modal"  v-model="modalState" :content="modaltip" title="温馨提示" cancel-text="我再想想" confirm-text="确认接单" @confirm="check"
			:show-cancel-button="true"></u-modal>
			</view>
			
	</view>
</template>

<script>	
	import messagelist from "../../component/messageList/messageList.vue"
	import {getToken} from "@/network/pick.js"
	import {getItems} from "@/network/pick.js"
	import {checkQulification} from "@/network/pick.js"

	export default {
		data() {
			return { 
				background:{
					backgroundcolor:'#001f3f'
				},
				list:[{
					name:"代购"
				},{
					name:"代取快递"
				},{
					name:"学习辅导"
				},{
					name:"组队出游"
				}
				],
				//2个current用来记录滑块和轮播图的对应位置
				current:0,
				swipercurrent:0,
				//请求过来的单子数据
				expressItems:[],
				learnItems:[],
				buyItems:[],
				teamItems:[],
				//这里是关于模态框的设定,文本和默认状态
				modaltip:'',
				modalState:false,
				//这里是每一类的当前页号
				express_page_id:1,
				buy_page_id:1,
				team_page_id:1,
				learn_page_id:1,
				//单子被单击时，传入到该页面的type和oid
				oid:-1,
				type:-1
			}
		},
		components:{
			messagelist
			
		},
		onPullDownRefresh(){
			this.refresh()
		},
		onShow(){
			console.log("已经离开主页")
			this.current=0
			this.swipercurrent=0
			this.refresh()
		},
		
		methods: {
		
			tabChange(index){
				this.swipercurrent=index;
			},
			transition(e){
				let dx=e.detail.dx;
				this.$refs.utabs.setDx(dx)
			},
			animationfinish(e){
				let current=e.detail.current;
				this.$refs.utabs.setFinishCurrent(current)
				this.swipercurrent=current;
				this.current=current;
			},
			//这里要根据type设置modaltip
			changeModalContent(t)
			{
				switch(t)
				{	
						case 2:
						this.modaltip="请注意运送过程中注意快递质量不被破坏，如出现丢件，快递损坏等情况，经发单者举报和平台审核，您的接单资格会被限制"
						break;
						case 3:
						this.modaltip="请注意约定时间和约定地点会面，如出现失约和违约等情况，您的接单资格会被限制"
						break;
						case 4:
						this.modaltip="接单后请和单主密切联系出游的具体详情，若对出游情况不甚了解接单后频繁退单，会被系统限制接单资格"
						break;
						case 1:
						this.modaltip="代购途中出现的对商品的损坏等情况，需要接单者承担经济损失，通币报酬会被扣除且限制接单资格"
						break
				}
				
			},
			//参数m为单子种类，number类型，2快递， 3学习，4组队出游，1代购
			//oid为单子的唯一标识   
			popUpModal(m,oid){
				this.changeModalContent(m);
				this.oid=oid;
				this.type=m;
				this.modalState=true;
				console.log(this.type);
				console.log(this.oid)
			},
			
			//  loginclick(){
			// 	 uni.getUserProfile({
			// 		desc:"授权登录，获取用户信息",
			// 		success:(res)=>{
						
			// 			uni.login({
			// 				success:(res)=>{
			// 					let params={
			// 						code:res.code
			// 					}
			// 					getToken(params).then(res=>{
			// 						console.log(res.data.token)
			// 						this.$store.state.token=res.data.token;
			// 					})
			// 				}
			// 			})
			// 		}
			// 	})
				
			// }
			// ,
			getExpress(){
				let params={
					page_id:this.express_page_id,
					state_id:2,
					token:this.$store.state.token
				}
				getItems(params).then(res=>{
					if(res.data.code==1007)
					{
						console.log("快递已经没有数据了")
						
					}
					else if(res.data.code==1001){
						this.expressItems=[...this.expressItems,...res.data.orderList]
						
					}
				})
			},
			//获取代购、外卖单子
			getBuy(){
				let params={
					page_id:this.buy_page_id,
					state_id:1,
					token:this.$store.state.token
				}
				getItems(params).then(res=>{
					if(res.data.code==1007)
					{
						console.log("代购已经没有数据了")
					
					}
					else if(res.data.code==1001){
						this.buyItems=[...this.buyItems,...res.data.orderList]
						
				
					}
				})
			},
			//获取组队单子
			getTeam(){
				let params={
					page_id:this.team_page_id,
					state_id:4,
					token:this.$store.state.token
				}
				getItems(params).then(res=>{
					if(res.data.code==1007)
					{
						console.log("组队单子已经没有数据了")
					}
					else if(res.data.code==1001){
						this.teamItems=[...this.teamItems,...res.data.orderList]
					
					}
				
			
				})
			},
			//获取学习辅导单子
			getLearn(){
				let params={
					page_id:this.learn_page_id,
					state_id:3,
					token:this.$store.state.token
				}
				getItems(params).then(res=>{
					if(res.data.code==1007)
					{
						console.log("辅导单子已经没有数据了")
					}
					else if(res.data.code==1001){
						this.learnItems=[...this.learnItems,...res.data.orderList];
					}
				})
			},
			addBuy(){
				console.log("add buy items")
				this.buy_page_id++;
				this.getBuy();
			},
			addTeam(){
				console.log('add team items')
				this.team_page_id++;
				this.getTeam();
			},
			addExpress(){
				console.log('add express items')
				this.express_page_id++;
				this.getExpress();
			},
			addLearn(){
				console.log('add learn items')
				this.learn_page_id++;
				this.getLearn();
			},
			navigateSuccess(oid){
				uni.navigateTo({
					url:"/pages/success/success?oid="+oid
				})
				
			},
			//用户不具有接单权限，跳转到失败界面
			navigateFailure(){
				uni.navigateTo({
					url:"/pages/failure/failure"
				})
			},
			//点击了确认接单如果成功要强制刷新一次页面
			emptyPage(){
				this.buy_page_id=1
				this.learn_page_id=1
				this.team_page_id=1
				this.express_page_id=1
			},
			emptyItems(){
				this.expressItems=[]
				this.learnItems=[]
				this.buyItems=[]
				this.teamItems=[]
			},
			getAllPages(){
				this.getExpress()
				this.getBuy()
				this.getLearn()
				this.getTeam()
			},
			refresh(){
				this.emptyPage()
				this.emptyItems()
				this.getAllPages()
				console.log('页面刷新了')
			},
			check(){
				if(this.$store.state.loginFlag == true){
					let params={
						token:this.$store.state.token
					}
					let oid=this.oid;
					checkQulification(params,oid).then(res=>{
						console.log(res);
						if(res.data.code==1002)
						{
							console.log('禁止接单')
							this.navigatfaliure();
						}
						else if(res.data.code==1001)
						{
							console.log('接单成功')
							this.navigateSuccess(oid)
							this.refresh()
						}
					})
				}else{
					uni.showToast({
						title: "请先登录!",
						icon:'none',
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	img{
		width: 100%;
		height: 100%;
	}
	.warp{
		display:flex;
		flex-direction: column;
	
		width:100%;
		
	}
	//注意swiper的高度一定要是可以动态变化的，至少是包括所有的代取快递
	.swiper{
		padding:0 20px;
		height:calc(100vh - 45px)
	}
	.location{
		height:80rpx;
		top: 0rpx;
		margin-bottom: 30rpx;
	}
	.u-tabs-swiper{
		position: fixed;
		top:0rpx;
		left:10rpx;
		right:10rpx;
		z-index: 3;
	}

</style>
