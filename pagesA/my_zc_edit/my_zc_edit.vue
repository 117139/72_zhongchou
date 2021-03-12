<template>
	<view class="minh100"><z_text></z_text>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<image class="box_bg" src="../../static/images/fq_banner_02.jpg" mode="widthFix"></image>
			<view class="box_main">
				<view class="box_main_form">
					<view class="box_main_form_li">
						<view class="form_li_tit">标题</view>
						<view class="dis_flex aic form_li_main">
							<input class="flex_1" type="text" v-model="datas.title" placeholder="请填写发起标题"/>
						</view>
					</view>
					<view class="box_main_form_li">
						<view class="form_li_tit">目标金额</view>
						<view class="dis_flex aic form_li_main">
							<input class="flex_1" type="number" v-model="datas.total_raise_funds" placeholder="请填写筹款目标金额，例100000"/><view>元</view>
						</view>
					</view>
					<view class="box_main_form_li">
						<view class="form_li_tit">发起人姓名</view>
						<view class="dis_flex aic form_li_main">
							<input class="flex_1" type="text" v-model="datas.initiator_name" placeholder="请填写发起人真实姓名"/>
						</view>
					</view>
					<view class="box_main_form_li">
						<view class="form_li_tit">发起人联系方式</view>
						<view class="dis_flex aic form_li_main">
							<input class="flex_1" type="number" v-model="datas.initiator_phone" placeholder="请填写您的常用手机号"/>
						</view>
					</view>
					<view class="box_main_form_li">
						<view class="form_li_tit">患者姓名</view>
						<view class="dis_flex aic form_li_main">
							<input class="flex_1" type="text" v-model="datas.patient_name" placeholder="请填写患者姓名"/>
						</view>
					</view>
					<view class="box_main_form_li">
						<view class="form_li_tit">患者年龄</view>
						<view class="dis_flex aic form_li_main">
							<input class="flex_1" type="number" v-model="datas.patient_age" placeholder="请填写患者年龄"/>
						</view>
					</view>
					<view class="box_main_form_li">
						<view class="form_li_tit">患者家庭住址</view>
						<view class="dis_flex aic form_li_main">
							<input class="flex_1" type="text" v-model="datas.patient_address" placeholder="请填写患者家庭住址"/>
						</view>
					</view>
					<view class="box_main_form_li">
						<view class="form_li_tit">患者疾病名称</view>
						<view class="dis_flex aic form_li_main">
							<input class="flex_1" type="text" v-model="datas.patient_illness" placeholder="请填写患者疾病名称"/>
						</view>
					</view>
					<picker mode="selector" :range="zc_list" range-key="title" @change="getPicker" data-type="1">
						<view class="box_main_form_li">
							<view class="form_li_tit">所属类别</view>
							<view class="dis_flex aic form_li_main">
								<view class="flex_1">{{zc_list[zc_index].title}}</view>
							</view>
						</view>
					</picker>
					<view class="box_main_form_li">
						<view class="form_li_tit">众筹类型</view>
						<view class="dis_flex aic form_li_main">
							<input class="flex_1" type="text" v-model="datas.genre" placeholder="请填写众筹类型(1~4个字)" maxlength="4"/>
						</view>
					</view>
					<!-- <view class="box_main_form_li" style="border-bottom: 0;"> -->
					<view class="box_main_form_li">
						<view class="form_li_tit">标签</view>
						<view class="dis_flex aic form_li_main">
							<textarea class="content_text" placeholder="请输入标签(每个标签已回车区分,每行一个)" v-model="datas.label"/>
						</view>
					</view>
					<view class="box_main_form_li">
						<view class="form_li_tit">详情内容</view>
						<view class="dis_flex aic form_li_main">
							<textarea class="content_text" placeholder="请输入" v-model="datas.content"/>
						</view>
					</view>
					<view class="pz1_tit">封面图：</view>
					<view class="pz_imgs">
						<view v-if="sj_img.length>0" class="pz_img" v-for="(item,index) in sj_img">
							<image class="img_del" src="/static/images/img_del.png" mode="aspectFill" @tap="imgdel" :data-idx="index"
							 data-type="1"></image>
							<image mode="aspectFill" :src="getimg(item)" @tap="pveimg" :data-src="getimg(item)"></image>
							<!-- <image mode="aspectFill" :src="item" @tap="pveimg" :data-src="item"></image> -->
						</view>
						<view class="pz_img" v-if="sj_img.length<9">
							<image src="/static/images/upimg1.png" @tap="upimg" mode="aspectFit" data-type="1 "></image>
						</view>
					</view>
					<view class="pz1_tit">详情图：</view>
					<view class="pz_imgs">
						<view v-if="sj_img2.length>0" class="pz_img" v-for="(item,index) in sj_img2">
							<image class="img_del" src="/static/images/img_del.png" mode="aspectFill" @tap="imgdel" :data-idx="index"
							 data-type="2"></image>
							<image mode="aspectFill" :src="getimg(item)" @tap="pveimg" :data-src="getimg(item)"></image>
							<!-- <image mode="aspectFill" :src="item" @tap="pveimg" :data-src="item"></image> -->
						</view>
						<view class="pz_img" v-if="sj_img2.length<9">
							<image src="/static/images/upimg1.png" @tap="upimg" data-type="2" mode="aspectFit"></image>
						</view>
					</view>
					<view class="sub_btn" @tap="sub">发布</view>
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
				id:'',
				datas:{
					title:'',//title
					genre:'',//众筹类型（自己填写）
					total_raise_funds:'',//众筹金额
					initiator_name:'',//发起人
					initiator_phone:'',//发起人联系方式
					patient_name:'', //患者姓名
					patient_age:'', //患者年龄
					patient_address:'', //患者家庭住址
					patient_illness:'', //患者疾病名称
					label:'', //标签
					category_id:'1', //所属类别
					content:'', //详情
				},
				zc_list:[
					{
						id:1,
						name:'类型1'
					},
					{
						id:2,
						name:'类型2'
					},
					{
						id:3,
						name:'类型3'
					},
					{
						id:4,
						name:'类型4'
					},
				],
				zc_index:0,
				sj_img: [],
				sj_img2: [],
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
			// console.log(e)
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
			if(!uni.getStorageSync('cate_list')){
				
				that.getcate()
			}else{
				if(uni.getStorageSync('cate_list')){
					console.log(uni.getStorageSync('cate_list'))
					var cate_list=JSON.parse(uni.getStorageSync('cate_list'))
					that.zc_list = cate_list
					that.fw_cur=cate_list[0].id
					// that.fw_cur=cate_list[0].id
					Vue.set(that.datas,'category_id',cate_list[0].id)
				}else{
					that.getcate()
				}
				
			}
			that.onRetry()
		},
		methods: {
			...mapMutations(['login','logindata','logout','setplatform']),
			onRetry(){
				that.htmlReset=0
				// that.zc_index=that.getindex(that.zc_list,that.datas.category_id)
				that.getdata()
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
				 			
				 		that.zc_list = datas
						that.fw_cur=datas[0].id
						// that.fw_cur=datas[0].id
						Vue.set(that.datas,'category_id',datas[0].id)
						if(datas.length>0){
							// var cate_list=JSON.stringify(datas)
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
			
			sub(){
				console.log(that.datas)
				///user/crowdfundProject/save
				var datas=JSON.parse(JSON.stringify(that.datas))
				if (!that.datas.title) {
					uni.showToast({
						icon: 'none',
						title: '请输入标题'
					});
					return;
				}
				if (!that.datas.total_raise_funds) {
					uni.showToast({
						icon: 'none',
						title: '请输入目标金额'
					});
					return;
				}
				if (!that.datas.initiator_name) {
					uni.showToast({
						icon: 'none',
						title: '请输入发起人'
					});
					return;
				}
				if (!that.datas.initiator_phone) {
					uni.showToast({
						icon: 'none',
						title: '请输入发起人联系方式'
					});
					return;
				}
				if (!that.datas.patient_name) {
					uni.showToast({
						icon: 'none',
						title: '请输入患者姓名'
					});
					return;
				}
				if (!that.datas.patient_age) {
					uni.showToast({
						icon: 'none',
						title: '请输入患者年龄'
					});
					return;
				}
				if (!that.datas.patient_address) {
					uni.showToast({
						icon: 'none',
						title: '请输入患者家庭住址'
					});
					return;
				}
				if (!that.datas.patient_illness) {
					uni.showToast({
						icon: 'none',
						title: '请输入患者疾病名称'
					});
					return;
				}
				var sj_img=''
				console.log(that.sj_img)
				if(that.sj_img.length>0){
					sj_img=that.sj_img.join(',')
				}else{
					uni.showToast({
						icon: 'none',
						title: '请上传封面图'
					});
					return
				}
				var sj_img2=''
				
				if(that.sj_img2.length>0){
					sj_img2=that.sj_img2.join(',')
				}
				Vue.set(datas,'banner_pic',sj_img)
				Vue.set(datas,'content_img',sj_img2)
				Vue.set(datas,'token',that.$store.state.loginDatas.userToken)
				// uni.showToast({
				// 	icon:'none',
				// 	title:'提交成功'
				// })
				console.log(datas)
				var jkurl="/user/crowdfundProject/save"
				if(that.btn_kg==1){
					return
					
				}
				that.btn_kg=1
				uni.showLoading({
					title: '正在提交'
				})
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
						setTimeout(function(){
							// that.show_tk=true
							uni.navigateBack({
								delta:1
							})
							return
							that.datas={
								title:'',//title
								genre:'',//众筹类型（自己填写）
								total_raise_funds:'',//众筹金额
								initiator_name:'',//发起人
								initiator_phone:'',//发起人联系方式
								patient_name:'', //患者姓名
								patient_age:'', //患者年龄
								patient_address:'', //患者家庭住址
								patient_illness:'', //患者疾病名称
								label:'', //标签
								category_id:'1', //所属类别
								content:'', //详情
							}
							that.sj_img=''
							that.sj_img2=''
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
			getPicker(e){
				console.log(e.currentTarget.dataset.type)
				var datas=e.currentTarget.dataset
				if(datas.type==1){
					that.zc_index=e.detail.value
					Vue.set(that.datas,'category_id',that.zc_list[that.zc_index].id)
				}
			},
			getindex(arr,id){
				if(arr.length>0){
					for(var i=0;i<arr.length;i++){
						if(arr[i].id==id){
							return i
						}
					}
					return 0
				}else{
					return -1
				}
			},
			getdata() {
			
				///api/info/list
				var that = this
				var data = {
					token: that.$store.state.loginDatas.userToken,
					id:that.id
				}
			
				//selectSaraylDetailByUserCard
				var jkurl = '/user/crowdfundProject/look'
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
			
						that.datas = datas
						// Vue.set(datas,'banner_pic',sj_img)
						if(datas.banner_pic.length>0){
							
							that.sj_img=datas.banner_pic
						}
						if(datas.content_img.length>0){
							that.sj_img2=datas.content_img
						}
						
						// Vue.set(datas,'content_img',sj_img2)
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
			getimg(img){
				return service.getimg(img)
			},
			pveimg(e) {
				service.pveimg(e)
			},
			upimg(e) {
				var that = this
				var datas = e.currentTarget.dataset
				// 从相册选择1张图
				var z_count = 9 - that.sj_img.length
				if (datas.type == 2) {
					z_count = 9 - that.sj_img2.length
				}
				uni.showActionSheet({
					itemList: ['拍照', '相册'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						var sourceType = ['camera', 'album']
						if (res.tapIndex == 0) {
							sourceType = ['camera']
						} else {
							sourceType = ['album']
						}
						uni.chooseImage({
							count: z_count,
							sizeType: ['original', 'compressed'],
							sourceType: sourceType,
							success: function(res) {
								console.log(res)
								const tempFilePaths = res.tempFilePaths
			
			
								// if(datas.type==2){
								// 	that.sj_img2=that.sj_img2.concat(res.tempFilePaths).slice(0,9)
								// }else{
								// 	that.sj_img=that.sj_img.concat(res.tempFilePaths).slice(0,9)
								// }
			
								// return
								// that.upimg1(tempFilePaths, 0, datas.type)
								that.upimg1(tempFilePaths,datas.type, 0)
								
							}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			
			
			},
			upimg1(imgs, type, i) {
				var that = this
				service.wx_upload(imgs[i]).then(res => {
			
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.msg
						console.log(i)
						var newdata
						if (type == 2) {
							that.sj_img2.push(datas)
							newdata = that.sj_img2.length
						} else {
							that.sj_img.push(datas)
							newdata = that.sj_img.length
						}
			
			
						console.log(newdata < 9)
						console.log(i < imgs.length - 1)
						console.log(newdata < 9 && i < imgs.length - 1)
						if (newdata < 9 && i < imgs.length - 1) {
							i++
							that.upimg1(imgs, type, i)
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
			},
			imgdel(e) {
				var that = this
				console.log(e.currentTarget.dataset.idx)
				var datas = e.currentTarget.dataset
				uni.showModal({
					title: '提示',
					content: '确定要删除这张图片吗',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定', e.currentTarget.dataset.type)
							if (datas.type == 2) {
								that.sj_img2.splice(datas.idx, 1)
							} else {
								that.sj_img.splice(datas.idx, 1)
							}
			
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.minh100{
		padding-bottom: 50upx;
	}
	.box_bg{
		width: 100%;
		height: auto;
		position: absolute;
		top: 0;
		z-index: 0;
	}
	.box_main{
		position: relative;
		top: 0;
		z-index: 1;
		padding: 170upx 30upx 0;
	}
	.box_main_form{
		width: 100%;
		background: #fff;
		border-radius: 10upx;
		padding: 0 30upx;
	}
	.box_main_form_li{
		width: 690upx;
		width: 100%;
		border-bottom: 1px solid #eee;
	}
	.form_li_tit{
		font-size: 30upx;
		color: #222;
		height: 90upx;
		width: 100%;
		display: flex;
		align-items: center;
	}
	.form_li_main{
		padding-bottom: 25upx;
		font-size: 30upx;
		color: #222;
	}
	.form_li_main input{
		min-width: 0;
		font-size: 30upx;
	}
	.content_text{
		width: 100%;
		height: 283upx;
		background: #EFEFEF;
		border-radius: 4upx;
		padding: 20upx;
		font-size: 30upx
	}
	.sub_btn{
		width: 100%;
		height: 86upx;
		background: linear-gradient(-90deg, #FC5534, #FFBE33);
		border-radius: 4upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		color: #fff;
		margin: 50upx auto 0;
	}
	
	
	
	
	.pz1_box {
		width: 100%;
		background: #FFFFFF;
		padding: 0 30upx 50upx;
	}
	
	.pz1_tit {
		width: 100%;
		font-size: 30upx;
		color: #222;
		line-height: 88upx;
	}
	
	.pz_imgs {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 30upx;
		border-bottom: 1px solid #eee;
	}
	
	.pz_img {
		/* width: 180upx;
		height: 140upx; */
		width: 190upx;
		border-radius: 10upx;
		margin-right: 15upx;
		margin-bottom: 15upx;
		position: relative;
	}
	
	.pz_img image {
		/* width: 180upx;
		height: 140upx; */
		width: 190upx;
		height: 190upx;
	}
	
	.pz_img .img_del {
		width: 30upx;
		height: 30upx;
		/* background: #FF4B4B; */
		border-radius: 15upx;
		position: absolute;
		top: -10upx;
		right: -10upx;
		z-index: 10;
	}
</style>
