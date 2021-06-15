<template>
	<view class="container">
		<span class="icon">&#xe631;</span>
		<view class="words">
			您已成功下单！请您耐心等待！
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
	@import url("../../../iconfont.css");
	.container{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.icon{
		display: block;
		margin: 40rpx 0;
		font-size: 250rpx;
		 color:#00b894;
	}
	.button{
		position: relative;
		top: 100rpx;
	}
</style>
