<template>
	<view class="container">
		<view class="words">
			请选择您要下单的类型
		</view>
		<view class="box">
			<navigator url="/pages/placeOrder/fillOrder/express/express">
				<span class="icon">&#xe600;</span>
				<button>快递代取</button>
			</navigator>
		</view>
		<view class="box">
			<navigator url="/pages/placeOrder/fillOrder/carry-out/carry-out">
				<span class="icon">&#xe7ae;</span>
				<button>外卖代拿</button>
			</navigator>
		</view>
		<view class="box">
			<navigator url="/pages/placeOrder/fillOrder/studyGuidance/studyGuidance">
				<span class="icon">&#xe610;</span>
				<button>学习辅导</button>
			</navigator>
		</view>
		<view class="box">
			<navigator url="/pages/placeOrder/fillOrder/organizeTeam/organizeTeam">
				<span class="icon">&#xe773;</span>
				<button>组队</button>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("../../iconfont.css");
	.words{
		font-size: 40rpx;
	}
	
	.container{
		padding-top: 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.container .box{
		width: 100%;
		display: table;
		border-collapse: separate;
		border-spacing: 80rpx 20rpx;
		padding-top: 20rpx;
	}
	span{
		display: table-cell;
		vertical-align: middle;
		margin-right: 40rpx;
		color: #00b894;
	}
	button{
		display: table-cell;
		vertical-align: middle;
		height: 30rpx;
		width: 300rpx;  
        background-color: #00cec9;  
        border-color: #0984e3;  
        color: #fff;  
        -moz-border-radius: 10rpx;  
        -webkit-border-radius: 10rpx;  
        border-radius: 20rpx; 
        -khtml-border-radius: 10rpx; 
        text-align: center;  
        vertical-align: middle;  
        border: 1rpx solid transparent;  
        font-weight: 900;  
        font-size:125%  
	}
</style>
