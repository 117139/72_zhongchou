<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<scroll-view  scroll-x="true" class="scroll_x list_tit">
				<view class="list_tit_li" :class="fw_cur==index?' cur':''" @tap="fwcur_fuc(index)" v-for="(item,index) in tabs">{{item.name}}</view>
			</scroll-view>
			<scroll-view class="scroll_list1"   scroll-y="true" refresher-enabled='true' :refresher-triggered="triggered"
				 :refresher-threshold="100" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
				 @refresherabort="onAbort" @scrolltolower="getdata">
				 <view class="fl_list">
					 <view class="pthz_li" v-for="(item,index) in datas">
					 	<image class="pthz_li_img" :src="getimg(item.img)" mode="aspectFill"></image>
					 	<view class="pthz_box">
					 		<view class="pthz_li_tit oh2">{{item.title}}</view>
					 		<view class="pthz_znum">
					 			<view class="pthz_num"  :style="'width:' + (item.num/item.znum) * 100 + '%'"></view>
					 		</view>
					 		<view class="pthz_pri">还需:<text>250000</text>元</view>
					 		<view class="hz_btn hz_btn1" @tap="jump" :data-url="'/pages/index/index'">立即帮助</view>
					 	</view>
					 </view>
					 <view v-if="datas.length==0" class="zanwu">暂无数据</view>
					 <view v-if="data_last" class="data_last">我可是有底线的哟~</view>
				 </view>
			</scroll-view>
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
				tabs:[
					{
						name:'项目众筹',
						id:1,
					},
					{
						name:'爱心众筹',
						id:2,
					},
					{
						name:'疾病众筹',
						id:3,
					},
					{
						name:'公司众筹',
						id:4,
					},
				],
				fw_cur:0,
				
				
				
				datas:[
					{
						img:'/static/images/index_12.jpg',
						title:'助人为善，感恩有您，恳求大家帮帮我帮帮我帮帮我帮帮我',
						znum:'300000',
						num:'150000'
					},
					{
						img:'/static/images/index_14.jpg',
						title:'助人为善，感恩有您，恳求大家帮帮我帮帮我帮帮我帮帮我',
						znum:'400000',
						num:'250000'
					},
					{
						img:'/static/images/index_12.jpg',
						title:'助人为善，感恩有您，恳求大家帮帮我帮帮我帮帮我帮帮我',
						znum:'300000',
						num:'50000'
					},
					{
						img:'/static/images/index_14.jpg',
						title:'助人为善，感恩有您，恳求大家帮帮我帮帮我帮帮我帮帮我',
						znum:'400000',
						num:'150000'
					},
					{
						img:'/static/images/index_14.jpg',
						title:'助人为善，感恩有您，恳求大家帮帮我帮帮我帮帮我帮帮我',
						znum:'400000',
						num:'250000'
					},
					{
						img:'/static/images/index_12.jpg',
						title:'助人为善，感恩有您，恳求大家帮帮我帮帮我帮帮我帮帮我',
						znum:'300000',
						num:'50000'
					},
					{
						img:'/static/images/index_14.jpg',
						title:'助人为善，感恩有您，恳求大家帮帮我帮帮我帮帮我帮帮我',
						znum:'400000',
						num:'150000'
					},
					{
						img:'/static/images/index_14.jpg',
						title:'助人为善，感恩有您，恳求大家帮帮我帮帮我帮帮我帮帮我',
						znum:'400000',
						num:'250000'
					},
					{
						img:'/static/images/index_12.jpg',
						title:'助人为善，感恩有您，恳求大家帮帮我帮帮我帮帮我帮帮我',
						znum:'300000',
						num:'50000'
					},
					{
						img:'/static/images/index_14.jpg',
						title:'助人为善，感恩有您，恳求大家帮帮我帮帮我帮帮我帮帮我',
						znum:'400000',
						num:'150000'
					},
					{
						img:'/static/images/index_14.jpg',
						title:'助人为善，感恩有您，恳求大家帮帮我帮帮我帮帮我帮帮我',
						znum:'400000',
						num:'250000'
					},
					{
						img:'/static/images/index_12.jpg',
						title:'助人为善，感恩有您，恳求大家帮帮我帮帮我帮帮我帮帮我',
						znum:'300000',
						num:'50000'
					},
					{
						img:'/static/images/index_14.jpg',
						title:'助人为善，感恩有您，恳求大家帮帮我帮帮我帮帮我帮帮我',
						znum:'400000',
						num:'150000'
					},
				],
				
				page: 1,
				size: 15,
				triggered: true, //设置当前下拉刷新状态
				data_last:false,
			}
		},
		computed: {
			...mapState(['hasLogin',  'userName', 'loginDatas']),
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
				that.getdata()
			},
			fwcur_fuc(num){
				this.fw_cur=num
				
				this.onRetry()
			},
			onPulling(e) {
				console.log("onpulling", e);
			},
			onRefresh() {
				var that =this
				if (this._freshing) return;
				this._freshing = true;
				that.getdata()
				setTimeout(()=>{
					this.triggered=false
					this._freshing =false
				},1000)
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("onRestore");
			},
			onAbort() {
				console.log("onAbort");
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
				setTimeout(()=>{
					uni.hideLoading()
				},1000)
				return
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
		/*  #ifdef H5  */
		min-height: calc(100vh - 44px - env(safe-area-inset-top));
		display: flex;
		flex-direction: column;
		/*  #endif  */
	}
	.list_tit{
		width: 100%;
		padding: 0 25upx;
		height: 100upx;
		border-top: 1px solid #F1F1F1;
		border-bottom: 1px solid #F1F1F1;
		/* position: fixed;
		top: 0;
		z-index: 9999; */
	}
	.list_tit_li{
		display: inline-flex;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333;
		height: 100upx;
		align-items: center;
		justify-content: center;
		/* margin:0 15upx; */
		min-width: 175upx;
	}
	
	.list_tit_li.cur{
		color: #FB6036;
		position: relative;
	}
	.list_tit_li.cur::before{
		width: 78upx;
		height: 5upx;
		background: #FB6036;
		border-radius: 4px 4px 0px 0px;
		position: absolute;
		content: '';
		bottom: 5upx;
		left: 50%;
		margin-left: -39upx;
	}
	.scroll_list1{
		position: absolute;
		top: 100upx;
		left: 0;
		right: 0;
		bottom: 0;
		/* height: calc(100vh - 100upx); */
		flex: 1;
	}
	.fl_list{
		width: 100%;
		padding: 30upx;
		display: flex;
		flex-wrap: wrap;
	}
	.pthz_li{
		width: 335upx;
		height: 480upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.15);
		border-radius: 10upx;
		margin-bottom: 15upx;
	}
	.pthz_li:nth-child(odd){
		margin-right: 14upx;
	}
	.pthz_li_img{
		width: 100%;
		height: 211upx;
		border-radius: 10upx 10upx 0 0;
	}
	.pthz_box{
		width: 100%;
		padding: 15upx;
	}
	.pthz_li_tit{
		width: 100%;
		height: 90upx;
		line-height: 45upx;
		font-size: 32upx;
		font-family: PingFang SC;
		color: #333;
	}
	.pthz_znum{
		width: 100%;
		height: 5upx;
		background: #E5E5E5;
		border-radius: 3upx;
		margin: 15upx 0;
	}
	.pthz_num{
		max-width: 100%;
		height: 5upx;
		background: linear-gradient(-90deg, rgba(252, 85, 52, 0.89), rgba(255, 190, 51, 0.89));
		border-radius: 3upx;
	}
	.pthz_pri{
		font-size: 24upx;
		color: #333;
		margin-bottom: 30upx;
	}
	.pthz_pri text{
		color: #F92929;
		font-weight: bold;
	}
	
	.hz_btn{
		width: 278upx;
		height: 49upx;
		background: #F54248;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.21);
		border-radius: 25upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		color: #fff;
	}
	.hz_btn1{
		
		background: linear-gradient(-90deg, rgba(252, 85, 52, 0.89), rgba(255, 190, 51, 0.89));
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.21);
	}
</style>
