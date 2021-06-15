<template>
	<view class="parent">
		<u-icon name="arrow-left" @click="backClick" style="position: absolute; left: 10rpx; top: 60rpx;" size="40"></u-icon>
		<view class="top">
			<view class="title">个人信息修改</view>
			<view class="message" v-if="isActive==2">请准确准确填写您的信息,每周修改信息次数有限制</view>
			<view class="message" v-if="isActive==0">请上传学生卡信息页并完善个人信息</view>
			<view class="message" v-if="isActive==1">系统正在审核中，禁止修改任何信息</view>
			<view></vieww>
		</view>
		<view class="info">
			<view class="basemessage">
				<view class="decoration"></view>
				<view class="text">
					基本信息：
				</view>
			</view>
			<view class="name">
				<view class="text">昵称：</view>
				<view class="content">{{getUsername}}</view>
			</view>
			<view class="head">
				<view class="text">头像：</view>
				<view class="pic">
						<img class="img" :src="getAvatar" alt=""></img>
				</view>
			</view>
		</view>
		<view class="modifyInfo">
			<view class="title">
				<view class="decoration"></view>
				<view class="text">信息修改：</view>
			</view>
			<view class="addresss">
				<u-form v-model="form"  ref="uform" >
					<u-form-item label="联系方式:" label-width="150rpx" labelPosition="left" 
					prop="phone" :required="true">
						<u-input  v-model="form.phone" type="number"  placeholder="请输入手机号" :disabled="isActive==1?true:false"></u-input>
					</u-form-item>
					<u-form-item label="地址:" label-width="150rpx" labelPosition="left" 
					:required="true">
						<u-input  v-model="form.address" type="select"  placeholder="请输入地址" @click="selectShow"></u-input>
						
					</u-form-item>
					<u-form-item label="房号:" label-width="150rpx" labelPosition="left" 
					:required="true" prop="room">
						<u-input  v-model="form.room" type="number"  placeholder="请输入房号"
						:disabled="isActive==1?true:false"></u-input>
					</u-form-item>
					<u-form-item label="学生卡图片:" label-width="180rpx" label-position="left" :required="true"  v-if="isActive==0">
						<u-upload :action="action" :max-count="1" :max-size="1*1024*1024" @on-success="onSuccess"></u-upload>
					</u-form-item>
				</u-form>
			</view>
		</view>
		<u-select v-model="pickerShow" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
	</view>
	<view style="height: 1100rpx;"></view>
		<view class="summit-btn">
			<u-button shape="circle" :custom-style="customStyle" @click="submit" :disabled="isActive==1">确认提交</u-button>
		</view>
	<view style="height: 40rpx;"></view>
	</view>
</template>

<script>
	import {list} from "./list.js"
	import {modifyInfo} from "../../network/modifyInfo.js"
	export default {
		data() {
			return {
				//昵称和头像从vuex中获取
				name:'软院liu指导',
				action: "https://scut.chenct.top/api/v1/upload",
				form:{
					phone:'',
					address:'',
					room:'',
				},
				link_img:"",
				fid:0,
				sid:0,
				//拼接形成地址
				campus:'',
				department:'',
				pickerShow:false,
				list:list,
				customStyle:{
					backgroundColor:'#74b9ff',
					fontSize:"35rpx",
					fontWeight:"500"
				},
				rules:{
					phone:[{
						type:'number',
						message:"联系方式必须是数字",
						trigger:"change"
					}]
				},
				action:"https://scut.chenct.top/api/v1/upload",
				isActive:this.$store.state.isLogin
			}
		},
		//要获取图片和昵称的信息
		onload(){
			
		},
		methods:{
			showPick(){
				this.pickerShow=true;
			},
			confirm(res){
				this.campus=res[0].label;
				this.department=res[1].label;
				this.fid=res[0].value;
				this.sid=res[1].value;
				this.form.address=this.campus+" "+this.department;
				console.log(this.fid,this.sid)
			},
			submit(){
				if(this.$store.state.isLogin==1)
				{
					console.log('系统正在审核中，禁止修改信息')
				}
				else{
				let params={
					token:this.$store.state.token
				}
				let info={
					phone:this.form.phone,
					fid:this.fid,
					sid:this.sid,
					address:this.form.room,
					link_img:this.link_img
				}
				console.log(params)
				console.log(info);
				modifyInfo(params,info).then(res=>{
					uni.showToast({
						title: "修改成功",
						duration: 2000,
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					}, 2000)
				})
				}
			},
			onSuccess(data){
				console.log(data)
				this.link_img = data.url
			},
			selectShow(){
				if(this.isActive==1)
				{
					this.pickerShow=false
				}
				else{
					this.pickerShow=true
				}
			},
			backClick(){
				uni.navigateBack({
					delta: 1,
				})
			}
			
		},
		onReady(){
			this.$refs.uform.setRules(this.rules);
		},
		computed:{
			getUsername(){
				return this.$store.state.username
			},
			getAvatar(){
				return this.$store.state.avatar
			}
		}
		
	}
</script>

<style lang="scss">
	
	.top{
		height:350rpx;
		width:100%;
		padding: 120rpx 80rpx 100rpx 80rpx;
		background-color: $uni-green;
	
		.title{
			font-size: 60rpx;
			font-weight: 700;
			margin-bottom: 30rpx;
		}
		.mesagae{
			font-size: 50rpx;
			
		}
	}
	.info{
		height: 380rpx;
		border-radius: 20rpx;
		background-color: white;
		padding:20rpx 60rpx;
		box-shadow: 0rpx 20rpx 40rpx 8rpx #c1c6cf;
		margin-bottom: 40rpx;
		.basemessage{
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			.decoration{
				width:10rpx;
				height: 30rpx;
				background:#74b9ff;
				border-radius: 2rpx;
				margin-right: 10rpx;
			}
			.text{
				font-size: 45rpx;
				font-weight: 500;
			}
		}
		.name{
			display: flex;
			align-items: center;
			height:60rpx;
		
			.text{
				font-size: 30rpx;
				margin-right: 60rpx;
			}
			.content{
				font-size: 30rpx;
			}
			margin-bottom: 10rpx;
		}
		.head{
			display: flex;
			height:60rpx;
			.text{
				font-size: 30rpx;
				margin-right: 60rpx;
			}
			.pic{
				width:200rpx;
				height:200rpx;
				border-radius: 50rpx;
				.img{
					width: 100%;
					height: 100%;
				}
			}
		}
}
.modifyInfo{
	height: 700rpx;
	border-radius: 20rpx;
	background-color: white;
	padding:20rpx 60rpx;
	box-shadow: 0rpx 20rpx 40rpx 8rpx #c1c6cf;
	.title{
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		.decoration{
			width:10rpx;
			height: 30rpx;
			background:#74b9ff;
			border-radius: 2rpx;
			margin-right: 10rpx;
		}
		.text{
			font-size: 45rpx;
			font-weight: 500;
		}
	}
	.address{
		height: 200rpx;
	}
}
.summit-btn{
	margin: 0 50rpx;
	height:100rpx;
}

</style>
