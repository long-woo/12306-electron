import Vue from 'vue'
import axios from './scripts/http'

import App from './App'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'

import 'node-waves/dist/waves.css'
import Wavas from 'node-waves'

import './assets/iconfont/iconfont.css'

import bsComponents from './components'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(bsComponents.Autocomplete)
Vue.use(bsComponents.DatePicker)

Wavas.init()

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
