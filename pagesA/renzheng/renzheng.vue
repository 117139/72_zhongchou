<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<view class="rz_box">
				<view class="rz_tit">姓名*</view>
				<input type="text" class="rz_int" v-model="name" placeholder="请输入姓名" maxlength="8"/>
				<view class="rz_tit">身份证号*</view>
				<input type="text" class="rz_int" v-model="c_id" placeholder="请输入正确的身份证号码"/>
				<view class="rz_tit" style="height: 100upx;">上传证件*</view>
				<view class="up_rzimg dis_flex aic">
					<view class="up_rzimg_li" @tap="scpic" data-type="1">
						<image :src="sfimg1?getimg(sfimg1):getimg('/static/web/images/rz_img_03.jpg')" mode="aspectFill"></image>
						<text>上传身份证正面</text>
					</view>
					<view class="up_rzimg_li" @tap="scpic" data-type="2">
						<image :src="sfimg2?getimg(sfimg2):getimg('/static/web/images/rz_img_05.jpg')" mode="aspectFill"></image>
						<text>上传身份证反面</text>
					</view>
				</view>
				<view class="sub_btn" @tap="sub" style="margin-top: 200upx;">提交</view>
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
				name:'',
				c_id:'',
				sfimg1:'',
				sfimg2:'',
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
				if(!that.name){
					uni.showToast({
						icon:'none',
						title:'请输入姓名'
					})
					return
				}
				if(!that.c_id){
					uni.showToast({
						icon:'none',
						title:'请输入身份证号码'
					})
					return
				}
				if(!that.sfimg1||!that.sfimg2){
					uni.showToast({
						icon:'none',
						title:'请上传证件'
					})
					return
				}
				var datas={
					token:that.$store.state.loginDatas.userToken,
					real_name:that.name,
					id_number:that.c_id,
					id_number_front:that.sfimg1,
					id_number_contrary:that.sfimg2
				}
				if(that.btn_kg==1){
					return
				}
				that.btn_kg=1
				console.log(datas)
				uni.showLoading({
					title: '正在提交'
				})
				var jkurl='/user/realNameApprove'
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
							
						uni.showToast({
							icon:'none',
							title:'提交成功'
						})
						service.wxlogin('token')
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
							
							
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
			scpic(e) {
			  var that = this
			  console.log(e.currentTarget.dataset.type)
			  var sf_type = e.currentTarget.dataset.type
			  wx.showActionSheet({
			    itemList: ['拍照上传', '本地图片'],
			    success(res) {
			      console.log(res.tapIndex)
			      if (res.tapIndex == 0) {
			        that.upimg(sf_type,'camera')
			      }
			      if (res.tapIndex == 1) {
							that.upimg(sf_type,'album')
			        //本地
			        
			      }
			    },
			    fail(res) {
			      console.log(res.errMsg)
			    }
			  })
			
			},
			upimg(sf_type,type){
				uni.chooseImage({
				  count: 1,
				  sizeType: ['original'],
				  sourceType: [type],
				  success(res) {
				    // tempFilePath可以作为img标签的src属性显示图片
				    console.log(res)
				    const tempFilePaths = res.tempFilePaths
						
						service.wx_upload(tempFilePaths[0]).then(res => {
									
							that.btn_kg = 0
							console.log(res)
							if (res.code == 1) {
								var datas = res.msg
								if (sf_type == 1) {
								  that.sfimg1=datas
								 
								} else {
								  that.sfimg2=datas
								 
								}
							} else {
								if (res.msg) {
									uni.showToast({
										icon: 'none',
										title: res.msg
									})
								} else {
									uni.showToast({
										icon: "none",
										title: "上传失败"
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
				  }
				})
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
	.rz_box{
		width: 100%;
		padding: 30upx;
	}
	.rz_tit{
		font-size: 28upx;
		color: #333;
		font-weight: bold;
		height: 60upx;
		display: flex;
		align-items: center;
	}
	.rz_int{
		width: 100%;
		height: 80upx;
		font-size: 28upx;
		
		border-bottom: 1px solid #EEEEEE;
	}
	.sub_btn{
		width: 100%;
		height: 79upx;
		background: linear-gradient(-90deg, #FC5534, #FFBE33);
		border-radius: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #fff;
	}
	.up_rzimg{
		justify-content: space-between;
	}
	.up_rzimg_li{
		width: 320upx;
	}
	.up_rzimg_li image{
		width: 320upx;
		height: 198upx;
	}
	.up_rzimg_li text{
		height: 65upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #54AAFF;
		font-size: 26upx;
	}
</style>
