import Vue from 'vue'

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

import 'animate.css/animate.css'

import bsComponents from './components'

import api from './api'
import eventBus from './utils/eventBus'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(bsComponents)

Wavas.init()

Vue.swal = Vue.prototype.$swal = swal
Vue.nprogress = Vue.prototype.$nprogress = nprogress
Vue.api = Vue.prototype.$api = api
Vue.store = store
Vue.eventBus = Vue.prototype.$eventBus = eventBus

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
