<template>
    <view class="content">
		<view class="box">
			<span class="icon" style="width: 40px; color:#00b894;">&#xe601;</span>
			<span class="words" style="width: 200px;">代取外卖信息填写</span>
		</view>
		<view style="padding-left: 40rpx;">		
       <u-form :model="form" ref="uForm">
       	<u-form-item label="联系方式" prop="phone">
       		<u-input v-model="form.phone" placeholder="请输入手机号"/>
       	</u-form-item>
       	<u-form-item label="地址" prop="address">
       		<u-input v-model="form.address" placeholder="请输入收货地址"/>
       	</u-form-item>
       	<u-form-item label="送达时间" prop="arrive_date">
       		<u-input v-model="form.arrive_date" placeholder="请输入送达时间"/>
       	</u-form-item>
       	<u-form-item label="提供报酬" prop="pay">
       		<u-input v-model="form.pay" placeholder="请输入报酬"/>
       	</u-form-item>
		<u-form-item label="上传图片" prop="pub_img">
			<u-upload v-model="form.pub_img" :action="action" :max-count="1" max-size="1*1024*1024" @on-success="onSuccess" ></u-upload>
		</u-form-item>
		<u-form-item label="备注" prop="note">
			<u-input v-model="form.note" placeholder="备注"/>
		</u-form-item>
       </u-form>
		</view>
	   <view class="add-btn">
			<u-button type="success" size="medium" shape="circle" ripple="true" @click="submit">提交</u-button>
	   </view>
    </view>
</template>

 <script>
	 import{pushOrder} from"@/network/user.js"
 
 export default {
 	data() {
 		return {
			action:'https://scut.chenct.top/api/v1/upload',
 			form: {
 				phone:'',
 				address: '',
 				arrive_date: '',
 				pay:'',
 				note:'',
				pub_img:'',
 			},
 			rules: {
 				phone: [
 					{ 
 						required: true, 
 						message: '请输入手机号',
 						trigger: ['change','blur'],
 					},
 					{
 						validator: (rule, value, callback) => {
 							return this.$u.test.mobile(value);
 						},
 						message: '手机号码不正确',
 						trigger: ['change','blur'],
 					}
 				],
 				address: [
 					{
 						required:true,
 						message: '请输入地址', 
 						trigger: ['change','blur']
 					},
 				],
 				arrive_date: [
 					{
 						required:true,
 						message: '请输入送达时间', 
 						trigger: ['change','blur']
 					},
 				],
 				pay: [
 					{
 						required:true,
 						message: '请输入报酬', 
 						trigger: ['change','blur']
 					},
 				]
 			}
 		};
 	},
	onLoad(option) {},
 	methods: {
		onSuccess(data){
			console.log(data);
			this.form.pub_img = data.url
		},
 		submit() {
			if(this.$store.state.loginFlag == true){
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						let data = {
							address:this.form.address,
							phone:this.form.phone,
							arrive_date:this.form.arrive_date,
							pay:this.form.pay,
							note:this.form.note,
							pub_img:this.form.pub_img
						}
						let params = {
							token:this.$store.state.token,
							state_id: 1
						}
						pushOrder(params, data).then(res=>{
							console.log(res)
							uni.redirectTo({
								url:'/pages/placeOrder/succeed/succeed'
							})
						})
					}else {
						console.log('验证失败');
					}
				});
			}else{
				uni.showToast({
					title: "请先登陆",
					icon: "none"
				})
			}
 		}
 	},
	
 	onReady() {
 		this.$refs.uForm.setRules(this.rules);
 	}
 };
 </script>

 
<style lang="scss">
	@import url("../../../../iconfont.css");
	.u-form-item--left{
		flex: 0 0 140rpx !important;
	}
    page {
        padding-top: 16px;
    }
	.box{
		width: 100%;
		display: table;
		border-collapse: separate;
		border-spacing: 18px 10px;
	}
	span{
		display: table-cell;
		vertical-align: middle;
		margin-right: 30px;
	}
    .row {
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 30upx;
        height: 110upx;
        background: #fff;
	}
        .tit {
            flex-shrink: 0;
            width: atuo;
            font-size: 30upx;
			padding: 5px;
        }
 
        .input {
            flex: 1;
            font-size: 30upx;
 
        }
 
        .icon-shouhuodizhi {
            font-size: 36upx;
        }
		.add-btn{
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 30px auto;
		}
</style>
 
