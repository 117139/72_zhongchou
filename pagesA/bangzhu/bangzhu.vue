<template>
	<view class="minh100"><z_text></z_text>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<view class="bz_user dis_flex">
				<image class="bz_user_tx" :src="getimg(xqData.use_head_portrait)" mode="aspectFill"></image>
				<view class="flex_1 bz_yuser_box">
					<view class="bz_yuser_d1">{{xqData.user_nickname}}<text>筹款人</text></view>
					<view class="bz_yuser_d2">{{xqData.title}}</view>
				</view>
			</view>
			<view class="bz_box">
				
				<view class="cz_mon">请选择帮助金额</view>
				<view class="cz_list">
					<view class="cz_li" :class="cz_cur==index?'cur':''" v-for="(item,index) in cz_list" @tap="cz_cur=index">
						<image v-if="cz_cur==index" :src="getimg('/static/images/bz_xz_03.png')" mode="aspectFill"></image>
						<text>{{item.name}}元</text>
					</view>
					<view class="cz_li" :class="cz_cur==-1?'cur':''" @tap="cz_cur=-1">
						<image v-if="cz_cur==-1" :src="getimg('/static/images/bz_xz_03.png')" mode="aspectFill"></image>
						<!-- digit -->
						<!-- #ifdef MP-WEIXIN -->
						<input class="other_mon" type="digit" v-model="other_mon" placeholder="其他金额">
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<input class="other_mon" type="number" v-model="other_mon" placeholder="其他金额">
						<!-- #endif -->
						
					</view>
				</view>
				<view class="bz_tip">我已阅读并同意<text @tap="jump" data-url="/pagesA/about/about?type=ysxy">《隐私协议》</text>和<text @tap="jump" data-url="/pagesA/about/about?type=yhxy">《用户协议》</text></view>
				<view class="cz_btn" @tap="sub">我要帮TA{{cz_cur==-1?other_mon:cz_list[cz_cur].name}}元</view>
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
				id:'',
				xqData:'',
				cz_list:[
					{
						name:'10',
						id:10
					},
					{
						name:'20',
						id:20
					},
					{
						name:'30',
						id:30
					},
					{
						name:'50',
						id:50
					},
					{
						name:'100',
						id:100
					},
					{
						name:'200',
						id:200
					},
					{
						name:'300',
						id:300
					},
					{
						name:'500',
						id:500
					},
				],
				cz_cur:0,
				other_mon:'',
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
		onLoad(option) {
			that=this
			that.id=option.id
			that.onRetry()
		},
		methods: {
			...mapMutations(['login','logindata','logout','setplatform']),
			onRetry(){
				that.htmlReset=0
				that.getdata()
			},
			sub(){
				var money=0
				if(that.cz_cur==-1){
					if(!that.other_mon){
						uni.showToast({
							icon:'none',
							title:'请输入充值金额'
						})
						return
					}else if(that.other_mon>=0.01){
						money=that.other_mon
					}else{
						uni.showToast({
							icon:'none',
							title:'金额不能小于0.01元'
						})
						return
					}
					
				}else{
					// uni.showToast({
					// 	icon:'none',
					// 	title:that.cz_list[that.cz_cur].name+'元'
					// })
					money=that.cz_list[that.cz_cur].name*1
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/pay/donate'
				var data={
					token: that.$store.state.loginDatas.userToken,
					id:that.id,
					// #ifdef MP-WEIXIN
					payType:1, //1：小程序支付   2：APP支付  3：h5支付
					// #endif
					// #ifdef APP-PLUS
					payType:2,
					// #endif
					// #ifdef H5
					payType:3,
					// #endif
					money: money
				}
				service.P_post(jkurl, data).then(res => {
					that.btn_kg = 0
					that.htmlReset=0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						// if (typeof datas == 'string') {
						// 	datas = JSON.parse(datas)
						// }
						// #ifdef MP-WEIXIN
						that.wx_pay(datas)
						// #endif
						// #ifdef APP-PLUS
						that.app_pay(datas)
						// #endif
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
						title: '操作失败'
					})
				})
				
			},
			wx_pay(res_data){
				service.wxpay(res_data,'fwb').then(res => {
					uni.showToast({
						icon:'none',
						title:'支付成功'
					})
					service.wxlogin('token')
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
				}).catch(e => {
					that.btn_kg=0
					uni.showToast({
						icon: 'none',
						title: '微信支付失败'
					})
					setTimeout(()=>{
						uni.redirectTo({
							url:'../../pages/order_list/order_list'
						})
					},1000)
				})	
			},
			app_pay(res_data){
				uni.showToast({
					icon:'none',
					title:'app_pay'
				})
				uni.requestPayment({
				    provider: 'wxpay',
				    orderInfo: res_data, //微信、支付宝订单数据
				    success: function (res) {
							service.wxlogin('token')
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
				        console.log('success:' + JSON.stringify(res));
				    },
				    fail: function (err) {
							uni.showModal({
								title: '提示',
								content:'支付失败，原因为：'+err.errMsg,
								showCancel:false,
								success: function (res) {
										if (res.confirm) {
												console.log('用户点击确定');
										} else if (res.cancel) {
												console.log('用户点击取消');
										}
								}
							})
				        console.log('fail:' + JSON.stringify(err));
				    }
				});
			},
			sub1(){
				// if (that.phone == '' || !(/^1\d{10}$/.test(that.phone))) {
				// 	wx.showToast({
				// 		icon: 'none',
				// 		title: '请输入正确的手机号'
				// 	})
				// 	return
				// }
				if(that.cz_cur==-1){
					if(!that.other_mon){
						uni.showToast({
							icon:'none',
							title:'请输入充值金额'
						})
						return
					}else if(that.other_mon>=1){
						uni.showToast({
							icon:'none',
							title:'帮助'+that.other_mon+'元'
						})
						
						// setTimeout(function(){
						// 	that.show_tk=true
						// },1000)
					}else{
						uni.showToast({
							icon:'none',
							title:'金额不能小于1元'
						})
						return
					}
					
				}else{
					uni.showToast({
						icon:'none',
						title:that.cz_list[that.cz_cur].name+'元'
					})
					setTimeout(function(){
						// that.show_tk=true
						uni.navigateBack({
							delta:1
						})
					},1000)
				}
				
				setTimeout(function(){
					// that.show_tk=true
					uni.navigateBack({
						delta:1
					})
				},1000)
			},
			getdata() {
			
				///api/info/list
				var that = this
				var data = {
					id:that.id
				}
			
				//selectSaraylDetailByUserCard
				var jkurl = '/crowdfundDetails'
				uni.showLoading({
					title: '正在获取数据'
				})
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
			
						that.xqData = datas
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
		padding-top: 30upx;
	}
	.bz_user{
		width: 690upx;
		min-height: 152upx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10upx 0px rgba(0, 0, 0, 0.12);
		border-radius: 15upx;
		margin: 0 auto 10upx;
		padding: 27upx;
	}
	.bz_user_tx{
		width: 93upx;
		height: 93upx;
		border-radius: 50%;
	}
	.bz_yuser_box{
		width: 520upx;
		margin-left: 23upx;
	}
	.bz_yuser_d1{
		font-size: 32upx;
		color: #333;
		display: flex;
		align-items: center;
		width: 520upx;
		flex-wrap: wrap;
	}
	.bz_yuser_d1 text{
		background: rgba(19, 122, 242, .15);
		padding: 5upx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #137AF2;
		margin-left: 10upx;
		margin-bottom: 10upx;
	}
	.bz_yuser_d2{
		font-size: 28upx;
		color: #999;
		margin-top: 15upx;
	}
	.bz_box{
		width: 100%;
		padding: 0 55upx;
	}
	
	.cz_mon{
		font-size: 26upx;
		color: #666;
		width: 100%;
		height: 100upx;
		line-height: 40upx;
		display: flex;
		align-items: center;
	}
	.cz_list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.cz_li{
		width: 202upx;
		height: 117upx;
		background: #FFFFFF;
		border: 1px solid rgba(205, 205, 205, .79);
		border-radius: 4upx;
		position: relative;
		color: #333;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-right: 15upx;
		margin-bottom: 15upx;
		/* font-weight: bold; */
		font-size: 32upx;
	}
	.other_mon{
		width: 100%;
		font-size: 32upx;
		color: #333;
		text-align: center;
	}
	.cz_li:nth-child(3n){
		margin-right: 0;
	}
	.cz_li.cur{
		border-radius: 4upx;
		border: 1px solid;
		border-image: linear-gradient(0deg, #FC5534, #FFBE33) 10 10;
		color: #F45458;
	}
	.cz_li.cur image{
		position: absolute;
		top: 0;
		right: 0;
		width: 53upx;
		height: 56upx;
	}
	.cz_btn{
		font-size: 28upx;
		color: #fff;
		width: 616upx;
		
		height: 76upx;
		background: linear-gradient(-90deg, rgba(252, 85, 52, 0.89), rgba(255, 190, 51, 0.89));
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
		border-radius: 38upx;
		margin: 100upx auto 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.bz_tip{
		font-size: 22upx;
		color: #999;
		padding: 22upx 0px;
	}
</style>
