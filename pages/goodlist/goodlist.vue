<template>
	<view class="minh100">
		<z_text></z_text>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<scroll-view  scroll-x="true" class="scroll_x list_tit">
				<view class="list_tit_li" :class="fw_cur==item.id?' cur':''" @tap="fwcur_fuc(item.id)" v-for="(item,index) in tabs">{{item.title}}</view>
			</scroll-view>
			<!-- <scroll-view class="scroll_list1"   scroll-y="true" refresher-enabled='true' :refresher-triggered="triggered"
				 :refresher-threshold="100" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
				 @refresherabort="onAbort" @scrolltolower="getdata"> -->
				 <view class="fl_list">
					 <view class="pthz_li_padd" v-for="(item,index) in datas" @tap="jump" :data-url="'/pagesA/details/details?id='+item.id">
						 <view class="pthz_li">
						 	<image class="pthz_li_img" :src="getimg(item.pic[0])" mode="aspectFill"></image>
						 	<view class="pthz_box">
						 		<view class="pthz_li_tit oh2">{{item.title}}</view>
						 		<view class="pthz_znum">
						 			<view class="pthz_num"  :style="'width:' + (item.yet_raise_funds*1/item.total_raise_funds*1) * 100 + '%'"></view>
						 		</view>
						 		<view class="pthz_pri">还需:<text>{{item.residue_raise_funds}}</text>元</view>
						 		<!-- <view class="hz_btn hz_btn1" @tap="jump" :data-url="'/pagesA/details/details?id='+item.id">立即帮助</view> -->
						 		<view class="hz_btn hz_btn1">立即帮助</view>
						 	</view>
						 </view>
					 </view>
					
					 <view v-if="datas.length==0" class="zanwu">暂无数据</view>
					 <view v-if="data_last" class="data_last">我可是有底线的哟~</view>
				 </view>
			<!-- </scroll-view> -->
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
				tabs:[],
				fw_cur:0,
				
				
				
				datas:[],
				
				page: 1,
				size: 15,
				data_last:false,
				triggered: true, //设置当前下拉刷新状态
				show_num:0
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
			// console.log(e)
			this.PageScroll = e.scrollTop
			// if(e.scrollTop>10){
			// 	uni.showToast({
			// 		title:e.scrollTop
			// 	})
			// }
		},
		onPullDownRefresh() {
			that.getcate()
		},
		onReachBottom() {
			that.getdata()
		},
		onLoad() {
			that=this
			if(uni.getStorageSync('type_id')){
				that.fw_cur=uni.getStorageSync('type_id')
				that.getcate()
			}
			if(!uni.getStorageSync('cate_list')){
				
				that.getcate()
			}else{
				if(uni.getStorageSync('cate_list')){
					console.log(uni.getStorageSync('cate_list'))
					var cate_list=JSON.parse(uni.getStorageSync('cate_list'))
					that.tabs=cate_list
					that.fw_cur=cate_list[0].id
					that.getcate()
				}else{
					that.getcate()
				}
				
			}
			// that.onRetry()
		},
		onShow() {
			if(that.show_num>0){
				var type_id=uni.getStorageSync('type_id')
				console.log(that.fw_cur!=type_id)
				console.log(that.fw_cur,type_id)
				if(that.fw_cur!=type_id){
					that.fw_cur=type_id
					that.onRetry()
				}
			}
			that.show_num++
		},
		methods: {
			...mapMutations(['login','logindata','logout','setplatform']),
			
			onRetry(){
				
				that.datas=[]
				that.data_last=false
				that.page=1
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
				that.onRetry()
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
			getcate(){
				 var data = {
					 type:1
				 }
				 			
				 //selectSaraylDetailByUserCard
				 var jkurl = '/cate/list'
				
				service.P_get(jkurl, data).then(res => {
				 	that.btn_kg = 0
				 	console.log(res)
				 	if (res.code == 1) {
				 		var datas = res.data
				 		console.log(typeof datas)
				 			
				 		if (typeof datas == 'string') {
				 			datas = JSON.parse(datas)
				 		}
				 		that.tabs = datas
						if(that.fw_cur==0){
							that.fw_cur=datas[0].id
						}
						that.onRetry()
						if(datas.length>0){
							var cate_list=JSON.stringify(datas)
							uni.setStorageSync('cate_list',cate_list)
						}
						
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
				 				title: '获取失败'
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
			
			getdata() {
				
				///api/info/list
				// var that = this
				var data = {
					page:that.page,
					size:that.size,
					type:that.fw_cur
				}
				if(that.btn_kg==1){
					return
				}
				that.btn_kg=1
				//selectSaraylDetailByUserCard
				var jkurl = '/getCrowdfund'
				uni.showLoading({
					title: '正在获取数据'
				})
				// setTimeout(()=>{
				// 	uni.hideLoading()
				// },1000)
				// return
				var page_now=that.page
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					that.htmlReset=0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						if(page_now==1){
				
							that.datas = datas
						} else {
							if (datas.length == 0) {
								that.data_last = true
								return
							}
							that.data_last = false
							that.datas = that.datas.concat(datas)
						}
						that.page++
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
		min-height: calc(100vh - 50px - 44px - env(safe-area-inset-top));
		display: flex;
		flex-direction: column;
		/*  #endif  */
		
		padding-top: 100upx;
	}
	.list_tit{
		width: 100%;
		padding: 0 25upx;
		height: 100upx;
		border-top: 1px solid #F1F1F1;
		border-bottom: 1px solid #F1F1F1;
		position: fixed;
		background: #fff;
		top: 0;
		/* #ifdef H5 */
		top: calc(44px + env(safe-area-inset-top));
		/* #endif */
		z-index: 100;
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
		padding: 15upx;
		display: flex;
		flex-wrap: wrap;
	}
	.pthz_li_padd{
		width: 50%;
		padding: 15upx;
	}
	.pthz_li{
		width: 100%;
		height: 480upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.15);
		border-radius: 10upx;
		/* margin-bottom: 15upx; */
	}
	/* .pthz_li:nth-child(odd){
		margin-right: 14upx;
	} */
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
		
		width: 100%;
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
