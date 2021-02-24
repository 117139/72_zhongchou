<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		// setTimeout(() => {
		// 	uni.setTabBarBadge({
		// 		index: 1,
		// 		text: '31'
		// 	});
		// 	uni.showTabBarRedDot({
		// 		index: 3
		// 	});
		// }, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods:function(){
		//点击中间按钮
		centerBtn() {
			uni.onTabBarMidButtonTap(function() {
				if (isTapCenter) {
					return;
				}
				isTapCenter = true;
				if (!that.userInfo || !that.token) {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				} else {
					uni.navigateTo({
						url: "/pages/add/add"
					})
		
				}
				isTapCenter = false;
			})
		},
	}
};
</script>

<style>
/*每个页面公共css */ 
</style>
