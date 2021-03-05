<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<view  v-if="xqData" class="top_box">
				<swiper class="swiper" :indicator-dots="indicatorDots"
					indicator-color="rgba(255,255,255,.9)" indicator-active-color="#F54248"  
				 :autoplay="autoplay" :interval="interval" :duration="duration" circular='true' >
					<swiper-item v-for="(item,idx) in xqData.pic">
						<image  class="swi_img" :src="getimg(item)" lazy-load="true" mode="aspectFill"></image>
					</swiper-item>
						
				</swiper>
				<view class="fq_user dis_flex aic">
					<image class="fq_user_tx" :src="getimg(xqData.use_head_portrait)" mode="aspectFill"></image>
					<view class="fq_user_name">{{xqData.user_nickname}}<text>发起筹款</text></view>
					<view v-if="xqData.genre" class="grqz">{{xqData.genre}}</view>
				</view>
				<view class="xq_tit">{{xqData.title}}</view>
				<block v-if="xqData.label">
					<view class="xq_bqs" v-if="xqData.label.length>0">
						<view v-if="item" class="xq_bq" v-for="(item,index) in xqData.label">{{item}}</view>
					</view>
				</block>
				<view class="xq_datas">
					<image class="xq_datas_bg" :src="getimg('/static/web/images/xqimg_06.jpg')" mode="aspectFill"></image>
					<view class="xq_datas_box">
						<view class="xq_datas_li">
							<view class="xq_datas_li_num">{{xqData.total_raise_funds}}</view>
							<view class="xq_datas_li_name">需要筹款(元)</view>
						</view>
						<view class="xq_datas_li">
							<view class="xq_datas_li_num">{{xqData.yet_raise_funds}}</view>
							<view class="xq_datas_li_name">已经筹款(元)</view>
						</view>
						<view class="xq_datas_li">
							<view class="xq_datas_li_num">{{xqData.help_number}}</view>
							<view class="xq_datas_li_name">帮助次数</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 10upx;width: 100%;background: #F1F1F1;"></view>
			<view v-if="xqData" class="top_box">
				<view class="dis_flex aic mian_tit">
					<view class="mian_tit_name">求助人的故事</view>
					<view class="jb_btn" @tap="jump" :data-url="'/pagesA/jubao/jubao?id='+id"><text class="iconfont icon-jubao"></text>举报</view>
				</view>
				<view class="mian_inr">
					患者姓名：{{xqData.patient_name}}
					<br>患者年龄：{{xqData.patient_age}}
					<br>家庭住址：{{xqData.patient_address}}
					<br>所患疾病名称：{{xqData.patient_illness}}
					<br>{{xqData.content}}
				</view>
				<block v-if="xqData.content_img">
					<view class="main_imgs" v-if="xqData.content_img.length>0">
						<image v-for="(item,index) in xqData.content_img" class="main_img" 
						@tap="pveimg" data-array="" :data-src="getimg(item)" :src="getimg(item)" mode="aspectFill"></image>
						
					</view>
				</block>
				
			</view>
			<view style="height: 10upx;width: 100%;background: #F1F1F1;"></view>
			
			<view class="top_box">
				<view class="dis_flex aic mian_tit">
					<view class="mian_tit_name">帮助次数</view>
					<view class="jb_btn"></view>
				</view>
				<view class="jz_list">
					<view class="jz_li" v-for="(item,index) in datas">
						<image class="jz_li_tx" :src="getimg(item.head_portrait)" mode="aspectFill"></image>
						<view class="jz_li_msg dis_flex aic ju_b">
							<view class="jz_li_msg_l">
								<view class="jz_li_msg_l_d1 dis_flex aic">
									<view class="jz_li_msg_l_name">{{item.nickname}}</view>支持了{{item.money}}元
								</view>
								<view class="jz_li_msg_l_d2">{{item.create_time}}</view>
							</view>
							<text @tap="zan_fuc(item)" class="iconfont icon-zan" :class="item.is_praise==1?'zan':''"></text>
						</view>
					</view>
					<view v-if="datas.length==0" class="zanwu">暂无数据</view>
					<view v-if="datas.length>0&&data_last" class="data_last">我可是有底线的哟~</view>
				</view>
				<view style="width: 100%;height: 100upx;"></view>
			</view>
			<view class="b_cz_box dis_flex ju_b aic">
				<!-- #ifdef MP-WEIXIN -->
				<view class="b_cz_btn dis_flex_c aic" style="position: relative;" @tap="share_fuc">
					<button type="default" open-type="share" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0;"></button>
					
					<text class="iconfont icon-fenxiang21"></text>
					<text>分享</text>
				</view>
				<view class="b_cz_sg"></view>
				<!-- #endif -->
				<!-- <view class="b_cz_btn dis_flex_c aic" @tap="shareFc()"> -->
				<view class="b_cz_btn dis_flex_c aic" @tap="getewm()">
					<text class="iconfont icon-shengchenghaibao"></text>
					<text>生成海报</text>
				</view>
				<view class="b_cz_box_btn" @tap="jump" :data-url="'/pagesA/bangzhu/bangzhu?id='+id">我要帮帮他</view>
			</view>
			
			<QSPopup ref="popup">
				<view class="flex_column">
					<view class="backgroundColor-white padding1vh border_radius_10px">
						<image :src="posterImage || ''" mode="widthFix" class="posterImage_img"></image>
					</view>
					<view class="flex_row marginTop2vh">
						<view class="save_img_btn" @tap.prevent.stop="saveImage()">保存到本地</view>
						<!-- <button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
						<button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button> -->
					</view>
				</view>
			</QSPopup>
			<view class="hideCanvasView">
				<canvas  class="hideCanvas" id="default_PosterCanvasId" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
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
	import _app from '../../util/QS-SharePoster/app.js';
	// import _app from '@/util/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '../../util/QS-SharePoster/QS-SharePoster.js';
	var that
	// #ifdef H5
	var jweixin = require('jweixin-module')  
	// #endif
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				htmlReset:-1,
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				id:'',
				xqData:{},
				datas:[],
				page: 1,
				size: 15,
				data_last:false,
				poster: {
					width: 750,
					height: 1334
				},
				posterImage: '',
				canvasId: 'default_PosterCanvasId',
				ewmimg:'',   //海报码
				type:''
			}
		},
		onShareAppMessage() {
			
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
			that.getdatalist()
		},
		onLoad(option) {
			that=this
			
			if(option.scene){
				const scene = decodeURIComponent(option.scene)
				console.log(scene)
				var arr=scene.split('=')
				console.log(scene)
				var obj = {};
				obj[arr[0]] = arr[1]
				this.id = obj.id
				var pid = obj.pid
				uni.setStorageSync('pid',pid)
			}
			if(option.id){
				that.id=option.id
			}
			if(option.type){
				that.type=option.type
			}
			that.onRetry()
			// jweixin.ready(function(){
					// TODO  
			// });
		},
		onShow() {
			// that.getewm()
		},
		methods: {
			...mapMutations(['login','logindata','logout','setplatform']),
			onRetry(){
				// that.htmlReset=0
				that.getdata()
				that.getdatalist()
			},
			async shareFc() {
				let _this = this;
				if(!that.hasLogin){
					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url:'/pages/login/login'
					})
					// #endif
				}
				try {
					this.count++;
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: _this, //若在组件中使用 必传
						canvasType: '2d',
						type: 'testShareType',
						background: {
								height: 750,
								width: 1334,
							backgroundColor:'#fff'
						},
						formData: {
							//访问接口获取背景图携带自定义数据
			
						},
						posterCanvasId: _this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						// background: {
						// 	height: 750,
						// 	width: 1334
						// },
						setCanvasWH({
							bgObj
						}) {
							_this.poster = bgObj
						},
						drawArray({
							bgObj,
							type,
							bgScale,
							setBgObj,
							getBgObj
						}) {
							return [
							{
									type: 'image',
									id: 'productImage',
									// url:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3692825435,2429977222&fm=26&gp=0.jpg',
									// url: 'http://yibeitong.com.aa.800123456.top/resource/platform/system/20210112/8821e90feae0424358a7894cf2695131.jpg',
									// url: 'https://cdn.51daiyan.cn//resource/api//user_code//20210128/18735d2d9a83b8b97c20f217e2528aaa.jpg',
									url:service.imgurl+that.xqData.pic[0],
									// url: 'http://www.wanbonet.com/suxin/images/72_zhongchou/static/images/haibao_img_03.jpg',
									dx: 0,
									dy: 0,
									serialNum: 0,
									infoCallBack(imageInfo) {
										let width;
										let height;
										if (imageInfo.width > imageInfo.height) {
											width = imageInfo.width > 700 ? 700 : imageInfo.width;
											height = width / imageInfo.width * imageInfo.height;
										} else {
											height = imageInfo.height > 700 ? 700 : imageInfo.height;
											width = height / imageInfo.height * imageInfo.width;
										}
										if (width < 500) {
											width = 500;
											height = width / imageInfo.width * imageInfo.height;
										}
										let addHeight = height * .3;
										if (addHeight < 150) addHeight = 150;
										if (addHeight > 250) addHeight = 250;
										width=750
										height=611
										setBgObj({
											width:750,
											height: 1334,
											backgroundColor:'#fff'
										});
										return {
											dWidth: 750,
											dHeight: 611
										}
									}
								},
								{
									type: 'text',
									id: 'productName',
									text:that.xqData.title,
									color: '#333333',
									
									serialNum: 1,
									allInfoCallback({
										drawArray
									}) {
										console.log('allInfoCallback', 1)
										const productImage = drawArray.find(item => item.id === 'productImage')
										console.log('allInfoCallback', 2)
										console.log('allInfoCallback getBgObj', getBgObj)
										const addHeight = getBgObj().height - productImage.dHeight;
										console.log('allInfoCallback', 3)
										return {
											size: 56,
											lineFeed: {
												maxWidth: 690,
												lineHeight:90,
												lineNum:2
											},
											dx:30,
											dy:685
										}
									}
								},
								{
									type: 'image',
									id: 'productImage12',
									url: service.imgurl+'static/web/images/haibao_img_07.jpg',
									// url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3692825435,2429977222&fm=26&gp=0.jpg',
									// url: 'http://www.wanbonet.com/suxin/images/72_zhongchou/static/images/haibao_img_07.jpg',
									dx: 30,
									dy: 869,
									serialNum: 2,
									dWidth: 690,
									dHeight: 155,
									infoCallBack(imageInfo) {
										let width;
										let height;
										
										width=690
										height=155
										
										return {
											dWidth: width,
											dHeight: height
										}
									}
								},
								{
									type: 'text',
									text: '需要筹款(元）',
									color: '#565757',
									serialNum: 3,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: 40,
											color:'#565757',
											fontWeight:'bold',
											lineFeed: {
												
												lineNum: 1
											},
											dx:55,
											dy:947
										}
									}
								},
								{
									type: 'text',
									text: that.xqData.total_raise_funds,
									color: '#565757',
									serialNum: 4,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: 45,
											color:'#F86637',
											fontWeight:'bold',
											lineFeed: {
												
												lineNum: 1
											},
											dx:335,
											dy:947
										}
									}
								},
								
								{
									type: 'image',
									id: 'productImage13',
									url:service.imgurl+that.ewmimg,
									// url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3692825435,2429977222&fm=26&gp=0.jpg',
									// url: 'http://www.wanbonet.com/suxin/images/72_zhongchou/static/images/haibao_img_07.jpg',
									dx: 88,
									dy: 1080,
									serialNum: 5,
									infoCallBack(imageInfo) {
										
										return {
											dWidth: 188,
											dHeight: 188
										}
									}
								},
								{
									type: 'text',
									text: '长按识别小程序',
									serialNum: 4,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: 45,
											color:'#2A2A2A',
											// fontWeight:'bold',
											lineFeed: {
												
												lineNum: 1
											},
											dx:365,
											dy:1135
										}
									}
								},
								{
									type: 'text',
									text: '好货要和朋友一起分享',
									serialNum: 4,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: 26,
											color:'#2A2A2A',
											// fontWeight:'bold',
											lineFeed: {
												
												lineNum: 1
											},
											dx:365,
											dy:1205
										}
									}
								},
							]
						}
					})
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.posterImage = d.poster.tempFilePath;
					this.$refs.popup.show()
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				console.log(that.posterImage)
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.posterImage,
					success(res) {
						// _app.showToast('保存成功');
						uni.showToast({
							title:'保存成功'
						});
						that.hideQr()
					},
					fail(err) {
						console.log('err')
						console.log(err)
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				that.hideQr()
				// #endif
				
			},
			hideQr() {
				this.$refs.popup.hide()
			},
			share_fuc(e){
				// #ifdef APP-PLUS
				uni.shareWithSystem({
					type:'text',
				  summary: '111',
				  href: 'https://uniapp.dcloud.io',
				  success(){
				    // 分享完成，请注意此时不一定是成功分享
				  },
				  fail(){
				    // 分享失败
				  }
				})
				// #endif
				// #ifdef H5
					
					
					jweixin.config({
					debug:true,
					appId: result.appId,
					timestamp: result.timestamp,
					nonceStr: result.nonceStr,
					signature: result.signature,
					jsApiList: [
					"updateAppMessageShareData", //分享给朋友
					"updateTimelineShareData" //分享到朋友圈
					]
					});
				// #endif
			},
			zan_fuc(item){
				
				//selectSaraylDetailByUserCard
				var jkurl = '/attention'
				var data={
					token: that.$store.state.loginDatas.userToken,
					id:item.id,
					type:1,
					operate: item.is_praise==1?'cancel':'affirm'   //操作类型  affirm：确认操作（就是点赞，关注等）     cancel：取消（取消点赞，关注等）
				}
				service.P_post(jkurl, data).then(res => {
					that.btn_kg = 0
					that.htmlReset=0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
							
						if(item.is_praise==1){
							Vue.set(item,'is_praise',2)
						}else{
							Vue.set(item,'is_praise',1)
						}
							
							
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
			pveimg(e){
				service.pveimg(e)
			},
			getdata() {
			
				///api/info/list
				var that = this
				var data = {
					id:that.id
				}
			
				//selectSaraylDetailByUserCard
				var jkurl = '/crowdfundDetails'
				if(that.type==2){
					data = {
						token: that.$store.state.loginDatas.userToken,
						id:that.id
					}
					jkurl="/user/crowdfundProject/look"
				}
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
						if(that.type==2){
							var label=that.xqData.label
							label=label.split(/\n/)
							console.log(datas)
							Vue.set(that.xqData, 'label',label)
						}
						
			
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
						if(!that.id){
							setTimeout(()=>{
								// uni.navigateBack({
								// 	delta:1
								// })
								uni.switchTab({
									url:'/pages/index/index'
								})
							},1000)
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
			getewm() {
			
				///api/info/list
				var that = this
				var data = {
					token: that.$store.state.loginDatas.userToken,
					id:that.id
				}
			
				//selectSaraylDetailByUserCard
				var jkurl = '/generateProjectQrCode'
				
				service.P_post(jkurl, data).then(res => {
					that.btn_kg = 0
					that.htmlReset=0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
			
					
			
						that.ewmimg = datas
						that.shareFc()
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
			getdatalist() {
				
				var data = {
					id:that.id,
					page: that.page,
					size: that.size,
					token: that.$store.state.loginDatas.userToken
				}
			
				//selectSaraylDetailByUserCard
				var jkurl = '/getHelpRecord'
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
					that.htmlReset=0
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
			getimgarr(img,type) {
				return service.getimgarr(img,type)
			},
		}
	}
</script>

<style scoped>
	.top_box{
		width: 100%;
		padding: 30upx;
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
	.fq_user_tx{
		width: 43upx;
		height: 43upx;
		border-radius: 50%;
		margin-right: 12upx;
		flex: none;
	}
	.fq_user_name{
		font-size: 28upx;
		color: #333;
		flex: 1;
	}
	.fq_user_name text{
		margin-left: 10upx;
		color: #8E8E8E;
	}
	.grqz{
		font-size: 22upx;
		color: #137AF2;
		padding: 7upx;
		background: rgba(19, 122, 242, .27);
	}
	.xq_tit{
		font-size: 36upx;
		color: #333;
		line-height: 50upx;
		margin-bottom: 20upx;
	}
	.xq_bqs{
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 30upx;
	}
	.xq_bq{
		font-size: 22upx;
		color: #137AF2;
		padding: 7upx;
		background: rgba(19, 122, 242, .27);
		margin-right: 19upx;
		margin-bottom: 19upx;
	}
	.xq_datas{
		width: 100%;
		height: 186upx;
		
		border: 1px solid #FED8AF;
		border-radius: 4upx;
		position: relative;
	}
	.xq_datas_bg{
		position: relative;
		z-index: 1;
		width: 100%;
		height: 100%;
	}
	.xq_datas_box{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		right: 0;
		z-index: 2;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.xq_datas_li{
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content:center;
	}
	.xq_datas_li_num{
		font-size: 36upx;
		color: #F86637;
		margin-bottom: 20upx;
		font-weight: bold;
	}
	.xq_datas_li_name{
		font-size: 20upx;
		color: #565757;
	}
	.mian_tit{
		width: 100%;
		/* height: 100upx; */
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30upx;
	}
	.mian_tit_name{
		font-size: 34upx;
		color: #333;
		padding-left: 24upx;
		position: relative;
		font-weight: bold;
	}
	.mian_tit_name::before{
		content: '';
		position: absolute;
		top: 10upx;
		left: 0;
		width: 5upx;
		height: 32upx;
		background: #F54248;
		border-radius: 3upx;
	}
	.jb_btn{
		font-size: 26upx;
		color: #F86637;
	}
	.jb_btn text{
		font-size: 26upx;
		color: #F86637;
	}
	.mian_inr{
		font-size: 28upx;
		color: #333;
		line-height: 40upx;
	}
	.main_imgs{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 20upx 0;
	}
	.main_img{
		width: 217upx;
		height: 217upx;
		margin-right: 18upx;
		margin-bottom: 18upx;
	}
	.main_img:nth-child(3n){
		margin-right: 0;
	}
	.jz_list{
		width: 100%;
	}
	.jz_li{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.jz_li_tx{
		width: 87upx;
		height: 87upx;
		border-radius: 50%;
	}
	.jz_li_msg{
		width: 569upx;
		height: 130upx;
		border-bottom: 1px solid #E8E8E8;
	}
	.jz_li_msg_l{
		width: 500upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.jz_li_msg_l_d1{
		font-size: 26upx;
		color: #333;
	}
	.jz_li_msg_l_name{
		font-size: 28upx;
		color: #333;
		margin-right: 10upx;
		font-weight: bold;
	}
	.jz_li_msg_l_d2{
		font-size: 22upx;
		color: #999;
	}
	.jz_li_msg text{
		color: #CCC;
		font-size: 28upx;
		margin-right: 10upx;
		felx:none;
	}
	.jz_li_msg .zan{
		color: #FC5534;
	}
	.b_cz_box{
		width: 100%;
		height: 100upx;
		background: #FFFFFF;
		box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
		background: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		padding: 10upx 30upx;
	}
	.b_cz_box_btn{
		font-size: 26upx;
		color: #fff;
		flex: 1;
		min-width: 405upx;
		height: 69upx;
		background: linear-gradient(-90deg, rgba(252, 85, 52, 0.89), rgba(255, 190, 51, 0.89));
		border-radius: 33upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.b_cz_btn{
		font-size: 22upx;
		color: #999;
		flex: 1;
		max-width: 120upx;
	}
	.b_cz_sg{
		width: 1px;
		height: 48upx;
		background: #D9D9D9;
	}
	.b_cz_btn .iconfont{
		font-size: 45upx;
		color: #9c9c9c;
		margin-bottom: 6upx;
	}
	
	
	
	.hideCanvasView {
		position: relative;
	}
	
	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
	
	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}
	
	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}
	
	.flex_column {
		display: flex;
		flex-direction: column;
	}
	
	.backgroundColor-white {
		background-color: #FE7E13;
	}
	
	.border_radius_10px {
		border-radius: 10px;
	}
	
	.padding1vh {
		padding: 9upx;
		box-sizing: border-box;
	}
	
	.posterImage_img {
		width: 480upx;
		height: 853upx;
	}
	
	
	.padding1vh {
		padding: 9upx;
		box-sizing: border-box;
	}
	
	.posterImage_img {
		width: 480upx;
		height: 853upx;
	}
	.flex_row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	
	.marginTop2vh {
		margin-top: 2vh;
	}
	.save_img_btn{
		width: 339upx;
		height: 77upx;
		background: #FE7E13;
		border-radius: 39upx;
		font-size: 28upx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
