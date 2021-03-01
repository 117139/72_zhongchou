<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<view class="ts_box">
				<view class="ts_box_tit">请选择你的投诉类型</view>
				<view class="ts_list">
					<view class="dis_flex aic ts_li" @tap="xz_fuc=index" v-for="(item,index) in list">
						<view :class="xz_fuc==index?'cur':''"><text class="iconfont icon-duigou"></text></view>{{item}}
					</view>
					<view class="content_box">
						<textarea class="content_box_1" placeholder="请详细描述你的问题" v-model="content" maxlength="30"/>
						<view class="dis_flex aic ju_b">
							<view></view>
							<view style="font-size: 24upx;color: #999;">30字以内</view>
						</view>
					</view>
				</view>
				<view class="b_btn" @tap="sub">投诉举报</view>
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
				list:[
					'虚假信息',
					'不真实',
					'与真人信息不符',
					'欺诈用户',
					'其他',
				],
				xz_fuc:0,
				content:''
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
			sub(){
				var datas={
					type:that.list[that.xz_fuc],
					content:that.content
				}
				uni.showToast({
					icon:'none',
					title:'提交成功'
				})
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
	.ts_box{
		width: 100%;
		padding: 30upx;
	}
	.ts_box_tit{
		font-size: 38upx;
		color: #333;
		padding-left: 20upx;
		width: 100%;
		height: 100upx;
		display: flex;
		position: relative;
		align-items: center;
	}
	.ts_box_tit::before{
		content: '';
		position: absolute;
		top: 35upx;
		left: 0;
		width: 6upx;
		height: 36upx;
		background: #FE7E13;
	}
	
	.ts_li{
		font-size: 36upx;
		color: #747474;
		height: 100upx;
	}
	.ts_li view{
		width: 36upx;
		height: 36upx;
		border: 1px solid #FE7E13;
		border-radius: 50%;
		margin-right: 20upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.ts_li view.cur{
		
		background: #FE7E13;
	}
	.ts_li .iconfont{
		font-size: 26upx;
		color: #fff;
	}
	.content_box{
		width: 100%;
		min-height: 300upx;
		background: #F7F8FA;
		padding: 30upx;
	}
	.content_box_1{
		height: 200upx;
	}
	.b_btn{
		font-size: 30upx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 88upx;
		background: #FE7E13;
		border-radius: 44px;
		margin: 100upx auto;
	}
</style>
