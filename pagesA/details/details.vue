<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<view class="top_box">
				<swiper class="swiper" :indicator-dots="indicatorDots"
					indicator-color="rgba(255,255,255,.9)" indicator-active-color="#F54248"  
				 :autoplay="autoplay" :interval="interval" :duration="duration" circular='true' >
						<swiper-item v-for="(item,idx) in bannerData">
								
								<image  class="swi_img" :src="getimg(item)" lazy-load="true" mode="aspectFill"></image>
								<!-- <image v-else class="swi_img" :src="getimg(item.body)" mode="aspectFill"
								 @tap="jump" data-url="../ad_zz/ad_zz"></image> -->
						</swiper-item>
						
				</swiper>
				<view class="fq_user dis_flex aic">
					<image class="fq_user_tx" :src="getimg('/static/images/tx_m2.jpg')" mode="aspectFill"></image>
				</view>
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
				htmlReset:-1,
				data_last:false,
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				bannerData:[
					'/static/images/xqimg_03.jpg',
					'/static/images/xqimg_03.jpg',
					'/static/images/xqimg_03.jpg',
				],
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
			that.onRetry()
		},
		methods: {
			...mapMutations(['login','logindata','logout','setplatform']),
			onRetry(){
				that.htmlReset=0
				// that.getdata()
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
	.top_box{
		width: 100%;
		padding: 20upx 30upx;
	}
	.swiper{
		
		width: 100%;
		height: 360upx;
		position: relative;
		z-index: 100!important;
	}
	.swi_img{
		width: 100%;
		height: 360upx;
	}
	.fq_user{
		padding-top: 40upx;
		padding-bottom: 25upx;
	}
</style>
