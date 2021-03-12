import Vue from 'vue'
import App from './App'

import store from './store'
import event from 'common/event.js'
import con_base64 from 'common/base64.js'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
import baoJing from './components/baojing/baojing.vue'
Vue.component('bao-jing',baoJing)
import tx_share from './components/tx_share/tx_share.vue'
Vue.component('tx_share',tx_share)
import QSPopup from '@/components/QS-popup/QS-popup.vue'
Vue.component('QSPopup', QSPopup)

import z_text from './components/z_text/z_text.vue'
Vue.component('z_text',z_text)
Vue.config.productionTip = false

Vue.prototype.event = event;

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()