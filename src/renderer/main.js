import Vue from 'vue'
import axios from './scripts/http'

import App from './App'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'icheck-bootstrap/icheck-bootstrap.css'
import BootstrapVue from 'bootstrap-vue'

import 'node-waves/dist/waves.css'
import Wavas from 'node-waves'

import './assets/iconfont/iconfont.css'

import swal from 'sweetalert'

import 'nprogress/nprogress.css'
import nprogress from 'nprogress'

import bsComponents from './components'

import api from './scripts/api'
import eventBus from './scripts/eventBus'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(bsComponents)

Wavas.init()

Vue.swal = Vue.prototype.$swal = swal
Vue.nprogress = Vue.prototype.$nprogress = nprogress
Vue.api = Vue.prototype.$api = api
Vue.store = store
Vue.prototype.$eventBus = eventBus

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
