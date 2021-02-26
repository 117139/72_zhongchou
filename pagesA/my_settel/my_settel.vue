<template>
	<view class="minh100">
		<view class="my_box ">
			
			<view class="login_box">
				<view class="login_li" style="border-bottom: 0;height: 50upx;">
					<view class="login_icon">
						<text class="iconfont icon-shouji1"></text>
					</view>
					<view style="font-size: 28upx;color: #444;">手机号码</view>
				</view>
				<view class="login_li">
					<input class="login_input" type="number" placeholder="请输入手机号" v-model="tel">
				</view>
				<view class="login_li" style="margin-top: 50upx;border-bottom: 0;height: 50upx;">
					<view class="login_icon">
						<text class="iconfont icon-mima"></text>
					</view>
					<view style="font-size: 28upx;color: #444;">验证码</view>
				</view>
				<view class="login_li">
					<input class="login_input" type="password" placeholder="请输入验证号" v-model="code">
					<view v-if="yzm_type==0" class="getyzm" @tap="getCode">获取验证码</view>
					<view v-if="yzm_type==1" class="getyzm getyzm1">{{yztime}}s</view>
				</view>
				<view class="login_btn" @tap="login_fuc">保   存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				PageScroll: 0,
				tel: '',
				code: '',
				yzm_type: 0,
				yztime: 60,
				pwd: '',
				pwd1: '',
				yhxy: true,
				datas: '爱心筹服务声明爱心筹服务声明爱心筹服务声明爱心筹服务声明爱心筹服务声明爱心筹服务声明爱心筹服务声明爱心筹服务声明',
				login_type: 1
			}
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas']),
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;

				return style
			},

			style1() {
				var StatusBar = this.StatusBar;
				var style = `top:${StatusBar}px;`;

				return style
			},
		},
		onLoad() {
			that = this
			var yhxy = uni.getStorageSync('yhxy')
			// this.getdata()
			if (yhxy) {
				this.yhxy = false
			}
		},
		onPageScroll(e) {
			console.log(e)
			this.PageScroll = e.scrollTop
			// if(e.scrollTop>10){
			// 	uni.showToast({
			// 		title:e.scrollTop
			// 	})
			// }
		},
		methods: {
			...mapMutations(['login', 'logindata']),
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			xy_on() {
				this.yhxy = false
				uni.setStorageSync('yhxy', 'true')
			},
			xy_off() {
				if (plus.os.name.toLowerCase() === 'android') {
					plus.runtime.quit() // Android
				} else {
					plus.ios.import("UIApplication").sharedApplication().performSelector("exit"); // IOS
				}
			},
			getCode() {
				let that = this

				if (that.tel == '' || !(/^1\d{10}$/.test(that.tel))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				uni.showToast({
					icon: 'none',
					title: '发送成功'
				})
				that.codetime()
				that.btnkg = 0
				return
				var jkurl = '/api/login/register'
				var data = {
					phone: that.account
				}
				service.post(jkurl, data,
					function(res) {
						that.btnkg = 0
						if (res.data.code == 1) {

							uni.showToast({
								icon: 'none',
								title: '发送成功'
							})
							console.log(res)
							that.verification_key = res.data.data.key
							that.codetime()

						} else {
							if (res.data.msg) {
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '操作失败'
								})
							}
						}
					},
					function(err) {
						that.btnkg = 0
						if (err.data.msg) {
							uni.showToast({
								icon: 'none',
								title: err.data.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				)

			},
			codetime() {
				let that = this
				let time = 60
				let st = setInterval(function() {
					if (time == 0) {
						that.yzm_type = 0
						clearInterval(st);
					} else {
						let news = time--;
						// console.log(news)
						that.yzm_type = 1
						that.yztime = news

					}
				}, 1000);
			},
			login_fuc() {
				if (that.tel == '' || !(/^1\d{10}$/.test(that.tel))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}

				if (!that.code) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证号'
					});
					return;
				}

				const data = {
					phone: that.tel,
					code: that.code
				}
				console.log(data)
				uni.showToast({
					icon: 'none',
					title: '登录成功'
				});

				that.logindata(data)
				that.login('问心')
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				},1000)
			},
			getbanner() {

				///api/info/list
				var that = this
				var data = {}

				//selectSaraylDetailByUserCard
				var jkurl = '/entrance'
				uni.showLoading({
					title: '正在获取数据'
				})
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}

						that.banner = datas
						console.log(datas)


					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			jump(e) {
				var that = this

				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
					setTimeout(function() {
						that.btn_kg = 0
					}, 1000)
				}

				service.jump(e)
			},
			getimg(img) {
				return service.getimg(img)
			},
		}
	}
</script>

<style scoped>
	.zt_jb{
		
		color: #0F8870;
		
		background: linear-gradient(-90deg, #FC5534 0%, #FFBE33 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.minh100 {
		/* #ifdef H5 */

		/* min-height: calc(100vh - 100upx); */
		/* #endif */
	}


	.login_box {
		width: 100%;
		padding:  40upx 40upx 40upx;
	}

	.login_li {
		width: 100%;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
		height: 90upx;
		margin-top: 10upx;
	}

	.login_icon {
		width: 50upx;
		margin-right: 30upx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.login_icon .iconfont{
		font-size: 40upx;
	}
	.login_input {
		flex: 1;
		font-size: 30upx;
	}

	.login_btn {
		width: 100%;
		height: 88upx;
		
		background: linear-gradient(-90deg, #FC5534, #FFBE33);
		border-radius: 44upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #fff;
		margin-top: 60upx;
		margin-bottom: 40upx;
	}

	.login_cz {
		width: 100%;
		font-size: 26upx;
		color: #777A89;
		margin-bottom: 200upx;
	}

	.login_yx {

		font-size: 26upx;
		color: #777A89;
		padding-bottom: 20upx;
		text-align: center;
		width: 100%;
	}












	.yhxy_box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .5);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.yhxy_box_xy {
		color: #007aff;
	}

	.dyxy_box {
		width: 80%;
		/* min-height: 80%; */
		background-color: #fff;
		border-radius: 18upx;
		padding: 30upx 44upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.dyxy_tit {
		text-align: center;
		font-size: 36upx;
		color: #000;
		padding-bottom: 20upx;
		border-bottom: 1px solid #ddd;
		margin-bottom: 26upx;
	}

	.dyxy_inr {
		font-size: 28upx;
		color: #666;
		min-height: 400upx;
		max-height: 800upx;
		overflow: scroll;
	}

	.next_btn {
		margin: 20px 10px 5px;
		font-size: 28upx;
		color: #fff;
		flex: 1;
		height: 80upx;
		background: #3C77F1;
		border-radius: 18upx;
		align-items: center;
		justify-content: center;
	}

	.next_btn_cal {
		background: #ddd;
	}

	.getyzm {
		width: 164upx;
		height: 47upx;
		
		background: linear-gradient(-90deg, #FC5534, #FFBE33);
		border-radius: 24upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 26upx;
	}
	.getyzm1{
		color: #999;
		background: #EFEFEF;
	}
</style>
