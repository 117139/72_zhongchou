<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<swiper class="swiper" :indicator-dots="indicatorDots"
				indicator-color="rgba(255,255,255,.6)" indicator-active-color="rgba(255,255,255,1)"  :current="current_swp" @change="sweiper_change" 
			 :autoplay="autoplay" :interval="interval" :duration="duration" circular='true' >
				<swiper-item v-for="(item,idx) in index_datas.bannerData">
					<image class="swi_img" :src="getimg(item.img)" lazy-load="true" mode="aspectFill"></image>
				</swiper-item>
					
			</swiper>
			<view class="index_box">
				<view class="swiper_dots">
					<view v-for="(item,idx) in index_datas.bannerData" :class="swp_cur==idx?'active':''" @tap="change_swp(idx)"></view>
				</view>
				<image class="index_banner_zd" src="../../static/images/index_banner_zd.png" mode=""></image>
				<view class="index_czbox">
					<view v-if="index_datas" class="index_czbox_tit">
						筹款<text>{{index_datas.raise_funds}}</text>元,用户<text style="margin-right: 10upx;">{{index_datas.member_number}}</text> 有<text>{{index_datas.project_number}}</text>个项目求助成功
					</view>
					<view class="indexurl_list dis_flex aic ">
						<view class="indexurl_li" @tap="jump_fuc(item.id)" v-for="(item,index) in index_url">
							<image :src="getimg(item.img)" mode="aspectFill"></image>
							<text>{{item.title}}</text>
						</view>
					</view>
				</view>
			</view>
			<view  v-if="index_datas" class="index_main">
				<!-- 互助推荐 -->
				<view v-if="index_datas.tjProjectData" class="index_hz">互助推荐</view>
				<scroll-view v-if="index_datas.tjProjectData" scroll-x="true" class="hz_list_box" style="white-space: nowrap;">
					<view class="hz_list">
						<view class="hz_li" v-for="(item,index) in index_datas.tjProjectData">
							<view class="hz_tr">今日推荐</view>
							<image class="hz_li_img" :src="getimg(item.pic[0])" mode="aspectFill"></image>
							<text class="hz_li_text text-cut">{{item.title}}</text>
							<view class="hz_user dis_flex aic">
								<image class="hz_li_tx flex_0" :src="getimg(item.head_portrait)" mode="aspectFill"></image>
								<text class="flex_1 text-cut hz_li_name">{{item.nickname}}发起</text>
							</view>
							<view class="hz_xq">还需:<text>{{item.residue_raise_funds>0?item.residue_raise_funds*1:0}}</text>元</view>
							<view class="hz_btn" @tap="jump" :data-url="'/pagesA/details/details?id='+item.id">立即帮助</view>
						</view>
					</view>
				</scroll-view>
				<!-- 平台互助 -->
				<view class="index_hz">平台互助</view>
				<view class="pthz_list">
					<view class="pthz_li" v-for="(item,index) in datas">
						<image class="pthz_li_img" :src="getimg(item.pic[0])" mode="aspectFill"></image>
						<view class="pthz_box">
							<view class="pthz_li_tit oh2">{{item.title}}</view>
							<view class="pthz_znum">
								<view class="pthz_num"  :style="'width:' + (item.yet_raise_funds*1/item.total_raise_funds*1) * 100 + '%'"></view>
							</view>
							<view class="pthz_pri">还需:<text>{{item.residue_raise_funds}}</text>元</view>
							<view class="hz_btn hz_btn1" @tap="jump" :data-url="'/pagesA/details/details?id='+item.id">立即帮助</view>
						</view>
					</view>
					<view v-if="datas.length==0" class="zanwu">暂无数据</view>
					<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
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
				indicatorDots: false,
				autoplay: true,
				interval: 3000,
				duration: 500,
				current_swp:0,
				swp_cur:0,
				bannerData:[
					'/static/web/images/index_02.jpg',
					'/static/web/images/index_02.jpg',
					'/static/web/images/index_02.jpg',
				],
				index_datas:{},
				index_url:[
					{
						url:'',
						img:'/static/web/images/index_icon_05.png',
						title:'项目众筹'
					},
					{
						url:'',
						img:'/static/web/images/index_icon_07.png',
						title:'爱心众筹'
					},
					{
						url:'',
						img:'/static/web/images/index_icon_09.png',
						title:'疾病众筹'
					},
					{
						url:'',
						img:'/static/web/images/index_icon_12.png',
						title:'公司众筹'
					},
				],
				datas:[],
				page: 1,
				size: 15,
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
			// console.log(e)
			this.PageScroll = e.scrollTop
			// if(e.scrollTop>10){
			// 	uni.showToast({
			// 		title:e.scrollTop
			// 	})
			// }
		},
		onPullDownRefresh() {
			
			that.onRetry()
		},
		onReachBottom() {
			
			that.getdata()
		},
		onShareAppMessage() {
			
		},
		onLoad(option) {
			that=this
			if(option.pid){
				
			uni.setStorageSync('pid',pid)
			}
			that.onRetry()
		},
		methods: {
			...mapMutations(['login','logindata','logout','setplatform']),
			
			sweiper_change(e){
				// console.log(e.detail.current)
				this.swp_cur=e.detail.current
			},
			change_swp(num){
				this.current_swp=num
			},
			onRetry(){
				that.getcate()
				that.getbanner()
				that.datas=[]
				that.data_last=false
				that.page=1
				that.getdata()
				that.htmlReset=0
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
				 			
				 		that.index_url = datas
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
			getbanner() {
			
				///api/info/list
				var that = this
				var data = {}
			
				//selectSaraylDetailByUserCard
				var jkurl = '/index'
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
			
						that.index_datas = datas
						uni.setStorageSync('evolve_pic',datas.evolve_pic)
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
			getdata() {
				
				///api/info/list
				var that = this
				var data = {
					page:that.page,
					size:that.size,
					type:-1
				}
			
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
			jump_fuc(id){
				uni.setStorageSync('type_id',id)
				uni.switchTab({
					url:'/pages/goodlist/goodlist'
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
	.index_box{
		width: 100%;
		
		/* border-radius: 25upx 25upx 0px 0px; */
		position: relative;
		top: -50upx;
		z-index: 900;
		padding-top: 30upx;
		margin-bottom: -50upx;
		padding: 0 30upx;
	}
	
	.swiper_dots{
		width: 100%;
		position: absolute;
		top: -23upx;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.swiper_dots view{
		width: 10upx;
		height: 10upx;
		background: #FFFFFF;
		border-radius: 10upx;
		margin: 0 10upx;
		transition: all .1s;
		opacity: .5;
	}
	.swiper_dots view.active{
		/* width: 24upx; */
		opacity: 1;
	}
	.index_banner_zd{
		width: 750upx;
		position: absolute;
		left: 0;
		top: 0;
		height: 88upx;
		z-index: 901;
	}
	.index_czbox{
		width: 100%;
		
		min-height: 260upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 30upx 2px rgba(169, 169, 169, 0.4);
		border-radius: 4px;
		position: relative;
		z-index: 902;
		padding-bottom: 10upx;
	}
	.index_czbox_tit{
		width: 100%;
		height: 80upx;
		display: flex;
		padding: 0 20upx;
		font-size: 26upx;
		color: #666;
		align-items: center;
		border-bottom: 1px solid #E8E8E8;
	}
	.index_czbox_tit text{
		font-size: 31upx;
		color: #F60;
	}
	.indexurl_list{
		width: 100%;
		min-height: 180upx;
		display: flex;
		flex-wrap: wrap;
		padding-top: 20upx;
	}
	.indexurl_li{
		width: 25%;
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-bottom: 20upx;
	}
	.indexurl_li image{
		width: 86upx;
		height: 86upx;
		margin-bottom: 22upx;
	}
	.indexurl_li text{
		font-size: 26upx;
		color: #333;
	}
	.index_main{
		width: 100%;
		padding: 0 30upx;
	}
	.index_hz{
		width: 100%;
		height: 88upx;
		display: flex;
		align-items: center;
		
		font-size: 36upx;
		font-family: PingFang;
		font-weight: bold;
		color: #333333;
		position: relative;
		padding-left: 25upx;
	}
	.index_hz::before{
		content: '';
		position: absolute;
		top: 29upx;
		left: 0;
		width: 8upx;
		height: 33upx;
		background: linear-gradient(180deg, #F54248, #FF7378);
		border-radius: 4upx;
	}
	.hz_list_box{
		width: 100%;
		height: 444upx;
		margin: -5upx 0;
	}
	.hz_list{
		padding: 5upx;
		height: 434upx;
	}
	.hz_li{
		display: inline-flex;
		width: 310upx;
		height: 424upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.15);
		border-radius: 10upx;
		padding: 10upx;
		flex-direction: column;
		position: relative;
	}
	.hz_li+.hz_li{
		margin-left: 12upx;
	}
	.hz_tr{
		position: absolute;
		top: 0;
		right: 0;
		font-size: 22upx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 120upx;
		height: 40upx;
		background: linear-gradient(-90deg, rgba(252, 85, 52, 0.89), rgba(255, 190, 51, 0.89));
		border-radius: 0 15upx 0 15upx;
		z-index: 10;
	}
	.hz_li_img{
		width: 100%;
		height: 177upx;
		border-radius: 4upx;
		margin-bottom: 10upx;
	}
	.hz_li_text{
		width: 100%;
		font-size: 32upx;
		color: #333;
		font-family: PingFang;
		font-weight: bold;
		margin-bottom: 15upx;
	}
	
	.hz_li_tx{
		width: 43upx;
		height: 43upx;
		border-radius: 50%;
		margin-right: 13px;
	}
	.hz_li_name{
		font-size: 26upx;
		color: #333;
	}
	.hz_xq{
		font-size: 24upx;
		color: #333;
		margin-top: 15upx;
		margin-bottom: 15upx;
	}
	.hz_xq text{
		color: #F82121;
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
	.pthz_list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 10upx 0;
	}
	.pthz_li{
		width: 337upx;
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
	.hz_btn1{
		
		background: linear-gradient(-90deg, rgba(252, 85, 52, 0.89), rgba(255, 190, 51, 0.89));
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.21);
	}
</style>
