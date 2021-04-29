<template>
	<view class="minh100"><z_text></z_text>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<!-- #ifdef MP-WEIXIN -->
			<view class="h_tip dis_flex aic ju_c">分享邀请更多，获得更多</view>
				<!-- #endif -->
			<!-- <scroll-view class="scroll_list1"   scroll-y="true" refresher-enabled='true' :refresher-triggered="triggered"
				 :refresher-threshold="100" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
				 @refresherabort="onAbort" @scrolltolower="getdata"> -->
			<view class="fl_list">
				<view class="pthz_li_padd" v-for="(item,index) in datas" >
					<view class="pthz_li">
						<image class="pthz_li_img" :src="getimg(item.pic[0])" mode="aspectFill" 
						 @tap="jump" :data-url="'/pagesA/details/details?id='+item.id+'&type=2'"></image>
						<view class="pthz_box">
							<view class="pthz_li_tit oh2"  @tap="jump" :data-url="'/pagesA/details/details?id='+item.id+'&type=2'">{{item.title}}</view>
							<view class="pthz_znum"  @tap="jump" :data-url="'/pagesA/details/details?id='+item.id+'&type=2'">
								<view class="pthz_num" :style="'width:' + (item.yet_raise_funds*1/item.total_raise_funds*1) * 100 + '%'"></view>
							</view>
							<view class="pthz_pri"  @tap="jump" :data-url="'/pagesA/details/details?id='+item.id+'&type=2'">还需:<text>{{item.residue_raise_funds}}</text>元</view>
							<view class="dis_flex ju_a">
								<view class="hz_btn hz_btn1" @tap.stop="jump" :data-url="'/pagesA/my_zc_edit/my_zc_edit?id='+item.id">编辑</view>
								<!-- #ifdef MP-WEIXIN -->
								<view class="hz_btn hz_btn1 dis_flex_c aic" style="position: relative;">
									<button type="default" open-type="share" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0;"></button>
									<text>分享</text>
								</view>
								<!-- #endif -->
							</view>
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
				htmlReset: -1,
				tabs: [],
				fw_cur: 0,



				datas: [],

				page: 1,
				size: 15,
				triggered: true, //设置当前下拉刷新状态
				data_last: false,
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
			that.onRetry()
		},
		onReachBottom() {
			that.getdata()
		},
		onShareAppMessage() {
			return {
				title: '橙云众帮',
				path: '/pagesA/details/details?pid=' + that.loginDatas.id+'&id='+that.g_id,
				success: function(res) {
					console.log('成功', res)
				}
			}
		},
		onLoad() {
			that = this
			that.onRetry()
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),

			onRetry() {

				that.datas = []
				that.data_last = false
				that.page = 1
				that.getdata()
			},
			fwcur_fuc(num) {
				this.fw_cur = num

				this.onRetry()
			},

			getdata() {

				///api/info/list
				var data = {
					page: that.page,
					size: that.size,
					token: that.$store.state.loginDatas.userToken
				}
				if(that.btn_kg==1){
					return
				}
				that.btn_kg=1
				//selectSaraylDetailByUserCard
				var jkurl = '/user/crowdfundProject/list'
				uni.showLoading({
					title: '正在获取数据'
				})
				// setTimeout(()=>{
				// 	uni.hideLoading()
				// },1000)
				// return
				var page_now = that.page
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					that.htmlReset = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}

						if (page_now == 1) {

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
	.minh100 {
		/*  #ifdef H5  */
		min-height: calc(100vh - 44px - env(safe-area-inset-top));
		display: flex;
		flex-direction: column;
		/*  #endif  */
	}
	.h_tip{
		width: 100%;
		height: 50upx;
		border-top: 1px solid #E8E8E8;
		border-bottom: 1px solid #E8E8E8;
		font-size: 24upx;
		color: #F92929;
	}
	.scroll_list1 {
		position: absolute;
		top: 0upx;
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

	.pthz_li_img {
		width: 100%;
		height: 211upx;
		border-radius: 10upx 10upx 0 0;
	}

	.pthz_box {
		width: 100%;
		padding: 15upx;
	}

	.pthz_li_tit {
		width: 100%;
		height: 90upx;
		line-height: 45upx;
		font-size: 32upx;
		font-family: PingFang SC;
		color: #333;
	}

	.pthz_znum {
		width: 100%;
		height: 5upx;
		background: #E5E5E5;
		border-radius: 3upx;
		margin: 15upx 0;
	}

	.pthz_num {
		max-width: 100%;
		height: 5upx;
		background: linear-gradient(-90deg, rgba(252, 85, 52, 0.89), rgba(255, 190, 51, 0.89));
		border-radius: 3upx;
	}

	.pthz_pri {
		font-size: 24upx;
		color: #333;
		margin-bottom: 26upx;
	}

	.pthz_pri text {
		color: #F92929;
		font-weight: bold;
	}

	.hz_btn {
	
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

	.hz_btn1 {
		margin: 0 10upx;
		background: linear-gradient(-90deg, rgba(252, 85, 52, 0.89), rgba(255, 190, 51, 0.89));
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.21);
	}
</style>
