<template>
	<view class="minh100">
		<z_text></z_text>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<image class="jiazhan" :src="getimg(evolve_pic)" mode="widthFix"></image>
			<!-- <view class="tx_btn" @tap="jump"  :data-login="true" :data-haslogin="hasLogin" data-url="/pagesA/my_tx/my_tx">提现</view> -->
			<view class="tx_btn" @tap="open_tk" >提升排名</view>
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
				htmlReset:-1,
				data_last:false,
				evolve_pic:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'userName', 'loginDatas']),
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
		onPageScroll(e) {
			console.log(e)
			this.PageScroll = e.scrollTop
			// if(e.scrollTop>10){
			// 	uni.showToast({
			// 		title:e.scrollTop
			// 	})
			// }
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
		},
		onLoad() {
			that=this
			// uni.setStorageSync('evolve_pic',datas.evolve_pic)
			that.evolve_pic=uni.getStorageSync('evolve_pic')
			that.onRetry()
		},
		methods: {
			...mapMutations(['login','logindata','logout','setplatform']),
			open_tk(){
				var jkurl = '/randomZc'
				uni.showLoading({
					title: '正在获取数据'
				})
				var data={}
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
							
						uni.showModal({
						    title: '捐款提排名',
						    content: datas.title,
								// showCancel:false,
								confirmText:'进入',
								// confirmText:'关闭',
								
						    success: function (res) {
						        if (res.confirm) {
						            console.log('用户点击确定');
												uni.navigateTo({
													url:'/pagesA/details/details?id='+datas.id
												})
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
							
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
			onRetry(){
				that.htmlReset=0
				// that.getdata()
			},
			getdata() {
			
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
	.minh100{
		height: 1334upx;
		
		/* background: #FF9261; */
		overflow: hidden;
	}
	.jiazhan{
		width: 100%;
		height: 1334upx;
	}
	.tx_btn{
		/* width: 622upx; */
		height: 85upx;
		border-radius: 45upx;
		background: linear-gradient(-90deg, #FC5534, #FFBE33);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #fff;
		position: absolute;
		top: 1122upx;
		left: 63upx;
		right: 63upx;
	}
</style>
