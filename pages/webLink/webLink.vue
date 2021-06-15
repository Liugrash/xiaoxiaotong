<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad(options){
			this.src = options.src
		},
		data() {
			return {
				src: ""
			};
		}
	}
</script>

<style lang="scss">

</style>
