(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pagesA-my_zc-my_zc"],{"04d1":function(t,a,i){"use strict";var e=i("4ea4");i("99af"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n,o=e(i("5530")),s=(e(i("e143")),e(i("274d"))),d=i("2f62"),r={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,htmlReset:-1,tabs:[],fw_cur:0,datas:[],page:1,size:15,triggered:!0,data_last:!1}},computed:(0,o.default)((0,o.default)({},(0,d.mapState)(["hasLogin","userName","loginDatas"])),{},{style:function(){var t=this.StatusBar,a=this.CustomBar,i="height:".concat(a,"px;padding-top:").concat(t,"px;");return i},style1:function(){var t=this.StatusBar,a="top:".concat(t,"px;");return a}}),onPageScroll:function(t){console.log(t),this.PageScroll=t.scrollTop},onPullDownRefresh:function(){n.onRetry()},onReachBottom:function(){n.getdata()},onLoad:function(){n=this,n.onRetry()},methods:(0,o.default)((0,o.default)({},(0,d.mapMutations)(["login","logindata","logout","setplatform"])),{},{onRetry:function(){n.datas=[],n.data_last=!1,n.page=1,n.getdata()},fwcur_fuc:function(t){this.fw_cur=t,this.onRetry()},getdata:function(){var t={page:n.page,size:n.size,token:n.$store.state.loginDatas.userToken};if(1!=n.btn_kg){n.btn_kg=1;var a="/user/crowdfundProject/list";uni.showLoading({title:"正在获取数据"});var i=n.page;s.default.P_get(a,t).then((function(t){if(n.btn_kg=0,n.htmlReset=0,console.log(t),1==t.code){var a=t.data;if(console.log(typeof a),"string"==typeof a&&(a=JSON.parse(a)),1==i)n.datas=a;else{if(0==a.length)return void(n.data_last=!0);n.data_last=!1,n.datas=n.datas.concat(a)}n.page++,console.log(a)}else t.msg?uni.showToast({icon:"none",title:t.msg}):uni.showToast({icon:"none",title:"操作失败"})})).catch((function(t){n.btn_kg=0,console.log(t),uni.showToast({icon:"none",title:"获取数据失败"})}))}},jump:function(t){var a=this;1!=a.btn_kg&&(a.btn_kg=1,setTimeout((function(){a.btn_kg=0}),1e3),s.default.jump(t))},getimg:function(t){return s.default.getimg(t)}})};a.default=r},"1c7f":function(t,a,i){var e=i("4bdb");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=i("4f06").default;n("27bbf1e7",e,!0,{sourceMap:!1,shadowMode:!1})},2145:function(t,a,i){t.exports=i.p+"static/img/loading.79a1a107.gif"},"40da":function(t,a,i){"use strict";var e=i("1c7f"),n=i.n(e);n.a},"4bdb":function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,".minh100[data-v-6d566989]{\nmin-height:calc(100vh - 44px - env(safe-area-inset-top));display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column\n}.scroll_list1[data-v-6d566989]{position:absolute;top:%?0?%;left:0;right:0;bottom:0;\n\t/* height: calc(100vh - 100upx); */-webkit-box-flex:1;-webkit-flex:1;flex:1}.fl_list[data-v-6d566989]{width:100%;padding:%?15?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.pthz_li_padd[data-v-6d566989]{width:50%;padding:%?15?%}.pthz_li[data-v-6d566989]{width:100%;height:%?480?%;background:#fff;box-shadow:0 0 %?10?% 0 rgba(0,0,0,.15);border-radius:%?10?%\n\t/* margin-bottom: 15upx; */}\n\n/* .pthz_li:nth-child(odd){\n\tmargin-right: 14upx;\n} */.pthz_li_img[data-v-6d566989]{width:100%;height:%?211?%;border-radius:%?10?% %?10?% 0 0}.pthz_box[data-v-6d566989]{width:100%;padding:%?15?%}.pthz_li_tit[data-v-6d566989]{width:100%;height:%?90?%;line-height:%?45?%;font-size:%?32?%;font-family:PingFang SC;color:#333}.pthz_znum[data-v-6d566989]{width:100%;height:%?5?%;background:#e5e5e5;border-radius:%?3?%;margin:%?15?% 0}.pthz_num[data-v-6d566989]{max-width:100%;height:%?5?%;background:-webkit-linear-gradient(right,rgba(252,85,52,.89),rgba(255,190,51,.89));background:linear-gradient(-90deg,rgba(252,85,52,.89),rgba(255,190,51,.89));border-radius:%?3?%}.pthz_pri[data-v-6d566989]{font-size:%?24?%;color:#333;margin-bottom:%?30?%}.pthz_pri uni-text[data-v-6d566989]{color:#f92929;font-weight:700}.hz_btn[data-v-6d566989]{width:100%;height:%?49?%;background:#f54248;box-shadow:0 0 %?10?% 0 rgba(0,0,0,.21);border-radius:%?25?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?26?%;color:#fff}.hz_btn1[data-v-6d566989]{background:-webkit-linear-gradient(right,rgba(252,85,52,.89),rgba(255,190,51,.89));background:linear-gradient(-90deg,rgba(252,85,52,.89),rgba(255,190,51,.89));box-shadow:0 0 10px 0 rgba(0,0,0,.21)}",""]),t.exports=a},"91bd":function(t,a,i){"use strict";i.r(a);var e=i("04d1"),n=i.n(e);for(var o in e)"default"!==o&&function(t){i.d(a,t,(function(){return e[t]}))}(o);a["default"]=n.a},"93fe":function(t,a,i){"use strict";i.d(a,"b",(function(){return n})),i.d(a,"c",(function(){return o})),i.d(a,"a",(function(){return e}));var e={z_text:i("e956").default},n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"minh100"},[e("z_text"),1==t.htmlReset?e("v-uni-view",{staticClass:"zanwu",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.onRetry.apply(void 0,arguments)}}},[t._v("请求失败，请点击重试")]):t._e(),-1==t.htmlReset?e("v-uni-view",{staticClass:"loading_def"},[e("v-uni-image",{staticClass:"loading_def_img",attrs:{src:i("2145"),mode:""}})],1):t._e(),0==t.htmlReset?e("v-uni-view",[e("v-uni-view",{staticClass:"fl_list"},[t._l(t.datas,(function(a,i){return e("v-uni-view",{staticClass:"pthz_li_padd",attrs:{"data-url":"/pagesA/details/details?id="+a.id+"&type=2"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.jump.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"pthz_li"},[e("v-uni-image",{staticClass:"pthz_li_img",attrs:{src:t.getimg(a.pic[0]),mode:"aspectFill"}}),e("v-uni-view",{staticClass:"pthz_box"},[e("v-uni-view",{staticClass:"pthz_li_tit oh2"},[t._v(t._s(a.title))]),e("v-uni-view",{staticClass:"pthz_znum"},[e("v-uni-view",{staticClass:"pthz_num",style:"width:"+1*a.yet_raise_funds/a.total_raise_funds*1*100+"%"})],1),e("v-uni-view",{staticClass:"pthz_pri"},[t._v("还需:"),e("v-uni-text",[t._v(t._s(a.residue_raise_funds))]),t._v("元")],1),e("v-uni-view",{staticClass:"hz_btn hz_btn1",attrs:{"data-url":"/pagesA/my_zc_edit/my_zc_edit?id="+a.id},on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.jump.apply(void 0,arguments)}}},[t._v("编辑")])],1)],1)],1)})),0==t.datas.length?e("v-uni-view",{staticClass:"zanwu"},[t._v("暂无数据")]):t._e(),t.data_last?e("v-uni-view",{staticClass:"data_last"},[t._v("我可是有底线的哟~")]):t._e()],2)],1):t._e()],1)},o=[]},d3bb:function(t,a,i){"use strict";i.r(a);var e=i("93fe"),n=i("91bd");for(var o in n)"default"!==o&&function(t){i.d(a,t,(function(){return n[t]}))}(o);i("40da");var s,d=i("f0c5"),r=Object(d["a"])(n["default"],e["b"],e["c"],!1,null,"6d566989",null,!1,e["a"],s);a["default"]=r.exports}}]);