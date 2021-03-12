<template>
	<view class="minh100">
		<z_text></z_text>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
				<view class="my_top">
					<image class="my_top_bg" :src="getimg('/static/web/images/my_banner_02.png')" mode=""></image>
					<view v-if="hasLogin" class="my_top_box">
						<!-- 签到 -->
						<view v-if="!loginDatas.id_number" class="qiandao_box" @tap="jump" :data-url="'/pagesA/renzheng/renzheng?type='+0">
							<view class="qd_nbox">
								<text class="iconfont icon-Authentication"></text>
								<text>去认证</text>
								<text class="iconfont icon-Authentication" style="opacity: 0;"></text>
							</view>
						</view>
						<!-- 签到 -->
						<view class="top_user">
							<view class="dis_flex">
								<view class="user_tximg" @tap="jump" data-url="/pagesA/my_msg/my_msg">
									<image class="user_tximg" :src="getimg(loginDatas.avatarurl)" mode="aspectFill"></image>
									<view class="user_edit"><text class="iconfont icon-xiugai"></text></view>
								</view>
								<view class="user_msg">
									<view class="dis_flex aic">
										<view class="user_name">{{loginDatas.nickname}}</view>
									</view>
									<view class="user_tel" v-if="loginDatas.phone">电话：{{loginDatas.phone}}</view>
								</view>
							</view>
							
						</view>
					</view>
					<view v-else class="my_top_box dis_flex_c aic ju_c">
						<!-- #ifdef MP-WEIXIN -->
						<view class="user_name" data-url="/pages/login/login" @tap='jump'>登录/注册</view>
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<view class="user_name" data-url="/pagesA/pc_login/pc_login" @tap='jump'>登录/注册</view>
						<!-- #endif -->
					</view>
				</view>
				<!-- 服务 -->
				<view class="fuwu_box">
					<view class="fuwu_tit">我的服务</view>
					<view class="fuwu_list">
						
						<view class="fuwu_li" @tap="jump" data-url="/pagesA/my_zc/my_zc?type=about" :data-login="true" :data-haslogin="hasLogin">
							<view class="my_icon"><text class="iconfont icon-zhongchou"></text></view>
							<view class="flex_1">我的众筹</view>
							<text class="iconfont icon-next-m"></text>
						</view>
						<view class="fuwu_li" @tap="jump" data-url="/pagesA/my_cyzc/my_cyzc?type=about" :data-login="true" :data-haslogin="hasLogin">
							<view class="my_icon"><text class="iconfont icon-wocanyude"></text></view>
							<view class="flex_1">我参与的众筹</view>
							<text class="iconfont icon-next-m"></text>
						</view>
						<view class="fuwu_li" @tap="jump" data-url="/pagesA/my_fans/my_fans?type=about" :data-login="true" :data-haslogin="hasLogin">
							<view class="my_icon"><text class="iconfont icon-fensi"></text></view>
							<view class="flex_1">我的粉丝</view>
							<text class="iconfont icon-next-m"></text>
						</view>
						<view class="fuwu_li" @tap="jump" data-url="/pagesA/my_settel/my_settel?type=about" :data-login="true" :data-haslogin="hasLogin">
							<view class="my_icon"><text class="iconfont icon-shouji"></text></view>
							<view class="flex_1">我的手机</view>
							<text class="iconfont icon-next-m"></text>
						</view>
						<view class="fuwu_li" @tap="jump" data-url="/pagesA/about/about?type=ysxy" :data-login='false' :data-haslogin='hasLogin'>
							<view class="my_icon"><text class="iconfont icon-2yinsi"></text></view>
							<view class="flex_1">隐私协议</view>
							<text class="iconfont icon-next-m"></text>
						</view>
					</view>
				</view>
				
				<view class="zzc_box" v-if="fk_show" @tap="fk_show=false">
					<view class="fk_box"  @tap.stop="">
						<view class="d1" @tap.stop="call" data-tel="400-0888-099">客服电话：400-0888-099</view>
						<view class="d2" @tap="fk_show=false">关闭</view>
					</view>
				</view>
		</block>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				datas: '',
				htmlReset: -1,
				fk_show:false
			}
		},
		onLoad() {
			that = this
			that.htmlReset = 0
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'loginDatas', 'fj_data'])
		},
		methods: {
			...mapMutations(['login', 'logindata', 'logout', 'setplatform']),
			fk_fuc(){
				uni.showModal({
				    title: '提示',
				    content: '客服电话：400-0888-099',
						showCancel:false,
						confirmText:'关闭',
						
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			call(e){
				console.log(e)
				service.call(e)
			},
			getimg(img){
				return service.getimg(img)
			},
			jump(e) {
				var that = this

				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
					setTimeout(function() {
						that.btnkg = 0
					}, 1000)
				}

				service.jump(e)
			},
		}
	}
</script>

<style scoped>
	.minh100 {
		background: #F8F8F8;
	}

	.my_top {
		width: 100%;
		height: 357upx;

		position: relative;
		overflow: hidden;
		margin-bottom: 34upx;
	}

	.my_top_bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
		width: 100%;
		height: 357upx;
	}

	.my_top_box {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
		width: 100%;
		height: 357upx;
		padding: 89upx 63upx 0;
	}

	.qiandao_box {
		position: absolute;
		right: -50upx;
		top: 100upx;
		z-index: 10;
		min-height: 60upx;
		background: linear-gradient(127deg, #F9676C, #F54248);
		border: 1px solid #FFFFFF;
		border-radius: 31upx;
		padding: 5upx;
	}

	.qd_nbox {
		padding: 0 20upx;
		height: 50upx;
		background: #FFFFFF;
		border: 1px solid #FFFFFF;
		border-radius: 26px;
		display: flex;
		align-items: center;
	}

	.qd_nbox text {
		margin: 0 4upx;
	}

	.top_user {
		width: 100%;
	}

	view.user_tximg {
		
		width: 134upx;
		height: 134upx;
		background: #FFFFFF;
		border: 2upx solid #CBB180;
		box-shadow: 0upx 0upx 12upx 0upx rgba(188, 157, 103, 0.2);
		border-radius: 50%;
		flex: none;
		position: relative;
		margin-right: 15upx;
	}
	image.user_tximg{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.user_edit{
		position: absolute;
		bottom: 0;
		right: 0;
	/* 	width: 35upx;
		height: 35upx; */
		padding: 9upx;
		background: #FFFFFF;
		border: 1px solid #CCAE7E;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.user_edit text{
		font-size: 16upx;
		color: #FD7934;
	}
	.user_msg {
		height: 118upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.user_name {
		font-size: 36upx;
		color: #fff;
		margin-right: 8upx;
	}

	.user_tel {
		font-size: 28upx;
		color: #fff;
	}

	

	.top_num {
		margin-top: 45upx;
		font-size: 26upx;
		color: #fff;
	}

	.top_pri {
		font-size: 36upx;
	}

	.num_hg {
		width: 1px;
		height: 71upx;
		background: #FFFFFF;
		opacity: 0.2;
	}

	/* order_box */
	.order_box {
		width: 690upx;
		min-height: 247upx;
		background: #FFFFFF;
		border-radius: 10upx;
		margin: 0 auto;
	}

	.order_top {
		width: 100%;
		height: 86upx;
		padding: 0 30upx;
		border-bottom: 1px solid #F8F8F8;
		color: #333;
		font-weight: bold;
	}

	.go_more {
		font-weight: normal;
		font-size: 28upx;
		color: #666;
		display: flex;
		align-items: center;
	}

	.go_more text {
		font-size: 16upx;
		color: #666;
		margin-left: 5upx;
	}

	
	.fuwu_box{
		margin: 20upx auto 0;
		width: 690upx;
		min-height: 465upx;
		background: #FFFFFF;
		border-radius: 10upx;
		margin-top: -100upx;
		z-index: 100;
		position: relative;;
	}
	.fuwu_tit{
		width: 100%;
		padding: 0 30upx;
		height: 100upx;
		font-size: 34upx;
		color: #333;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #EDEDED;
		font-weight: bold;
	}
	.fuwu_list{
		width: 100%;
		
		padding:0 30upx;
	}
	.fuwu_li{
		width: 100%;
		height: 100upx;
		font-size: 30upx;
		color: #333;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #EDEDED;
	}
	.fuwu_li image{
		width: 75upx;
		height: 75upx;
		margin-bottom: 20upx;
	}
	.fuwu_li text{
		font-size: 26upx;
		color: #999;
	}
	.zzc_box{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background: rgba(0,0,0,.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.fk_box{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 404upx;
		height: 229upx;
		background: #FFFFFF;
		border-radius: 10upx;
		position: relative;
		padding-bottom: 56upx;
	}
	.fk_box .d1{
		font-size: 28upx;
		color: #333;
		/* margin: 60upx auto; */
	}
	.fk_box .d2{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 56upx;
		font-size: 28upx;
		color: #666;
		border-top: 1px solid #E8E8E8;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.my_icon{
		width: 50upx;
	}
	.fuwu_li .my_icon>text{
		font-size: 34upx;
		color: #FD7D34;
	}
</style>
