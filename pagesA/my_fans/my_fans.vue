<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<block v-if="htmlReset==0">
			<view class="top_box">
				<image class="top_box_bg" :src="getimg('/static/web/images/fans_bg_02.jpg')" mode=""></image>
				<view class="top_box_btn" @tap="jump" data-url="/pagesA/my_tx/my_tx">
					提现<text class="iconfont icon-next-m"></text>
				</view>
				<view class="top_box_msg">
					<view>当前佣金(元）</view>
					<view class="top_box_msg_pri">{{xqData.money}}</view>
				</view>
			</view>
			<view class="list_box">
				<view class="list_tit">
					<view class="list_tab" :class="tab_cur==1?'cur':''" @tap="tab_fuc(1)">一级粉丝({{xqData.yjCount}})</view>
					<view class="list_tab" :class="tab_cur==2?'cur':''" @tap="tab_fuc(2)">二级粉丝({{xqData.ejCount}})</view>
				</view>
				<block v-for="(item,index) in datas">
					<view class="hy_li">
						<image class="hy_li_tx" :src="getimg(item.head_portrait)" mode="aspectFill"></image>
						<view class="hy_li_msg">
							<view class="hy_li_msg1">
								<view class="hy_name">{{item.nickname}}</view>
								<view>捐助：￥{{item.consume}}元</view>
							</view>
							<view class="hy_li_msg2">
								<view class="hy_time">{{item.create_time}}</view>
								<view>推广人数：{{item.user_sum}}人</view>
							</view>
						</view>
					</view>
				</block>
				
				<view v-if="datas.length==0" class="zanwu">暂无数据</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~~~</view>
				<!-- <view  class="data_last">我可是有底线的哟~~~</view> -->
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
				btnkg:0,
				htmlReset:-1,
				page: 1,
				size: 15,
				data_last:false,
				tab_cur:1,
				xqData:'',
				datas:[]
			}
		},
		computed:{
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin',
				// 'order_ls_data'
			]),
			
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			
		},
		onLoad(option) {
			that=this
			if(option.type){
				this.type=option.type
			}
			that.datas=[]
			// that.htmlReset=0
			// return
			this.onRetry()
		},
		methods: {
			onRetry(){
				
				that.datas=[]
				that.data_last=false
				that.page=1
				that.getdata()
			},
			getdata() {
				
				///api/info/list
				// var that = this
				var data = {
					token: that.$store.state.loginDatas.userToken,
					page:that.page,
					size:that.size,
					type:that.tab_cur
				}
				if(that.btn_kg==1){
					return
				}
				that.btn_kg=1
				//selectSaraylDetailByUserCard
				var jkurl = '/user/promotionStatis'
				uni.showLoading({
					title: '正在获取数据'
				})
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
				
							that.xqData = datas
							that.datas = datas.list
						} else {
							that.xqData = datas
							if (datas.list.length == 0) {
								that.data_last = true
								return
							}
							that.data_last = false
							that.datas = that.datas.concat(datas.list)
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
			getimg(img){
				return service.getimg(img)
			},
			tab_fuc(num){
				that.tab_cur=num
				that.onRetry()
			}
		}
	}
</script>

<style scoped>
	.top_box{
		width: 100%;
		position: relative;
	}
	.top_box_btn{
		position: absolute;
		top: 100upx;
		right: 30upx;
		width: 126upx;
		height: 40upx;
		background: #FFFFFF;
		border-radius: 20upx;
		font-size: 24upx;
		color: #FC6956;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 800;
	}
	.top_box_btn text{
		color: #FC6855;
		font-size:18upx;
		margin-left: 5upx;
	}
	.top_box_bg{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 0;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.top_box_msg{
		position: relative;
		z-index: 1;
		width: 100%;
		height: 314upx;
		padding-top: 45upx;
		padding-bottom: 120upx;
		display: flex;
		justify-content: space-between;
		padding-left: 40upx;
		padding-right: 80upx;
		align-items: center;
		flex-direction: column;
		color: #fff;
		font-size: 24upx;
	}
	.top_box_msg_pri{
		font-size: 60upx;
	}
	.tg_icon{
		width: 150upx;
		height: 150upx;
	}
	.top_l1{
		font-size: 28upx;
		color: #fff;
	}
	.top_l2{
		font-size: 70upx;
		color: #fff;
		display: flex;
		align-items: baseline;
	}
	.top_l2 text{
		font-size: 28upx;
	}
	.list_box{
		width: 100%;
		padding: 0 30upx;
	}
	.list_tit{
		width: 100%;
		height: 118upx;
		background: #FFFFFF;
		box-shadow: 1px 3px 6upx 0px rgba(0, 0, 0, 0.1);
		border-radius: 4upx;
		display: flex;
		justify-content: space-around;
		align-items: stretch;
		margin-top: -60upx;
		margin-bottom: 30upx;
		position: relative;
		z-index: 10;
	}
	.list_tab{
		font-size: 30upx;
		color: #999;
		display: flex;
		align-items: center;
		border-bottom: 2px solid rgba(0,0,0,0);
	}
	.list_tab.cur{
		color: #F23C44;
		border-bottom: 2px solid #F23C44;
	}
	.hy_li{
		width: 100%;
		padding: 30upx 0;
		display: flex;
		align-items: stretch;
		border-bottom: 1px solid #F5F5F5;
	}
	.hy_li_tx{
		width: 88upx;
		height: 88upx;
		border-radius: 50%;
		flex: none;
		margin-right: 17upx;
	}
	.hy_li_msg{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.hy_li_msg1{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26upx;
		color: #999;
	}
	.hy_li_msg2{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26upx;
		color: #999;
	}
	.hy_name{
		font-size: 32upx;
		color: #000;
	}
	.hy_time{
		font-size: 24upx;
	}
</style>
