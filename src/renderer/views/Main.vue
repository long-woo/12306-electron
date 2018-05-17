<template>
  <div>
    <header class="navbar-dark fixed-top">
      <div class="navbar-nav-scroll">
        <b-nav class="navbar-nav flex-row justify-content-center text-center bg-nav-hue">
          <b-nav-item class="waves-effect" :active-class="nav.activeClass" v-for="(nav, index) in navItems" :key="index" :to="nav.to" @click="navChange(nav)">
            <i class="iconfont" :class="`icon-${nav.icon}`"></i>
            <p>
              {{nav.text}}
              <b-badge class="badge-count" pill variant="danger" v-if="index === 1 && $store.getters.taskData.length">
                {{$store.getters.taskData.length}}
              </b-badge>
              <b-badge class="badge-count" pill variant="danger" v-else-if="index === 2 && $store.getters.orderCount">
                {{$store.getters.orderCount}}
              </b-badge>
            </p>
          </b-nav-item>
        </b-nav>
      </div>
    </header>
    <main class="container-fluid">
      <transition appear enter-active-class="animated zoomInDown">
        <router-view ref="views"></router-view>
      </transition>
    </main>
    <footer class="fixed-bottom border border-info border-left-0 border-right-0 border-bottom-0 bg-white">
      <div class="d-flex flex-row justify-content-between font-size-14">
        <div class="p-2">
          <div class="text-info" v-if="loginName">
            <i class="iconfont icon-user"></i>
            <span>{{loginName}}，</span>
            <a href="javascript:;" @click="logOff">退出</a>
          </div>
          <a class="text-info waves-effect" href="javascript:;" v-b-modal.loginModal v-else>
            <i class="iconfont icon-user"></i>
            <span>未登录</span>
          </a>
        </div>
        <div class="p-2">
          <a class="text-info waves-effect" href="javascript:;" @click="openAbout">
            <i class="iconfont icon-help"></i>
            <span>关于</span>
          </a>
        </div>
      </div>
    </footer>
    <login ref="loginModal"></login>
    <captcha-code :type="captchaCodeType" @validComplete="validComplete"></captcha-code>
    <about :show.sync="showAbout" />
    <!-- <audio id="audioEgg" :src="audioEggUrl" preload="auto" loop style="display: none;" hidden="true"></audio> -->
  </div>
</template>

<script>
import utils from '../utils/utils'

export default {
  name: 'Main',
  components: {
    Login: () => import('./Login'),
    CaptchaCode: () => import('./CaptchaCode'),
    About: () => import('./About')
  },
  data () {
    return {
      navItems: [
        { text: '新任务', active: false, activeClass: '', icon: 'new-task', to: '/' },
        { text: '任务管理', active: false, activeClass: '', icon: 'task-manager', to: '/taskmanager' },
        { text: '我的订单', active: false, activeClass: '', icon: 'order-manager', to: '/myorder' }
      ],
      captchaCodeType: 'login',
      loginName: '',
      showAbout: false,
      audioEggUrl: ''
    }
  },
  mounted () {
    // utils.speech.textToSpeech('Hello！欢迎使用1|2|3|0|6-Electron，祝您购票成功')

    this.chkeckIsLogin()
    this.$eventBus.$on('openDialog', (dialog) => {
      this.captchaCodeType = dialog === 'captchCodeModal' ? 'order' : 'login'
      this.$root.$emit('bv::show::modal', dialog)
    })
  },
  methods: {
    navChange (nav) {
      nav.active = true
      nav.activeClass = 'active'

      this.navItems.map((val, index) => {
        if (val.text !== nav.text) {
          val.active = false
          nav.activeClass = ''
        }
      })
    },
    // 获取乘客
    getPassengers () {
      const $newTask = this.$refs.views.$refs

      if ($newTask.taskButton) {
        $newTask.taskButton.getPassengers()
      }
    },
    // 检查是否已经登录
    async chkeckIsLogin () {
      const {code, data} = await this.$api.account.chkeckIsLogin()

      if (code !== 200) return

      this.loginName = data.loginName

      const loginInfo = utils.getLoginModel(data.loginName)

      if (!loginInfo.length) return

      this.$store.dispatch('setLoginModel', loginInfo[0])
      this.getPassengers()
    },
    // 校验验证码完成
    async validComplete (value) {
      if (value.result) {
        if (this.captchaCodeType === 'login') {
          const login = this.$refs.loginModal
          const loginData = {
            username: login.userName,
            password: login.password
          }
          const {code, data, message} = await this.$api.account.login(loginData)

          if (code !== 200) {
            this.$alert(message)
            this.$root.$emit('bv::show::modal', 'loginModal')
            return
          }

          const loginInfo = {
            loginName: data.loginName,
            userName: login.userName,
            password: login.password,
            rememberme: login.rememberme,
            autoLogin: login.autoLogin
          }

          this.loginName = data.loginName
          this.$store.dispatch('setLoginModel', loginInfo)
          this.getPassengers()
        } else {
          // 提交订单
          const orderData = this.$store.getters.confirmOrderData

          // utils.task.confirmOrderQueueAsync(orderData.train, orderData.seatCode, orderData.passengers, orderData.key, value.verifyCode, orderData.index, orderData.awaitTime)
          utils.task.confirmOrderQueue(orderData.train, orderData.passengers, orderData.key, orderData.token, orderData.seatCode, value.verifyCode, orderData.index, orderData.awaitTime)
        }
      }
    },
    // 关于
    openAbout () {
      this.showAbout = true
    },
    // 退出登录
    async logOff () {
      await this.$api.account.loginOff()
      // 清除登录信息
      this.loginName = ''
      this.$eventBus.$emit('loginOff')
    }
  }
}
</script>

<style scoped>
.bg-nav-hue {
  background: linear-gradient(to top right, #563D7C, #17A2B8, #41B883);
  background: -webkit-linear-gradient(left bottom, #563D7C, #17A2B8, #41B883);
  animation: ani-hue 60s infinite linear;
  -webkit-animation: ani-hue 60s infinite linear;
}

main {
  position: absolute;
  overflow: auto;
  top: 5.5rem;
  bottom: 2.8rem;
  -webkit-overflow-scrolling: touch;
}

.navbar-nav .nav-link {
  padding-left: 1rem;
  padding-right: 1rem;
}

.navbar-nav .nav-link i{
  font-size: 2rem;
}

.navbar-nav .nav-link p{
  margin-bottom: 0;
}

.badge-count {
  position: absolute;
  top: 1rem;
  right: 0;
}
</style>
