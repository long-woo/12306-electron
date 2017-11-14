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
      <router-view ref="views"></router-view>
    </main>
    <footer class="fixed-bottom border border-info border-left-0 border-right-0 border-bottom-0 bg-white">
      <div class="d-flex flex-row font-size-14">
        <div class="p-2">
          <div class="text-info" v-if="loginName">
            <i class="iconfont icon-user"></i>
            <span>{{loginName}}，</span>
            <a href="javascript:;" @click="logOff">注销</a>
          </div>
          <a class="text-info waves-effect" href="javascript:;" v-b-modal.loginModal v-else>
            <i class="iconfont icon-user"></i>
            <span>未登录</span>
          </a>
        </div>
      </div>
    </footer>
    <login ref="loginModal"></login>
    <captcha-code :type="captchaCodeType" @validComplete="validComplete"></captcha-code>
  </div>
</template>

<script>
import utils from '../scripts/utils'

export default {
  name: 'Main',
  components: {
    Login: () => import('./Login'),
    CaptchaCode: () => import('./CaptchaCode')
  },
  data () {
    return {
      navItems: [
        { text: '新任务', active: false, activeClass: '', icon: 'new-task', to: '/' },
        { text: '任务管理', active: false, activeClass: '', icon: 'task-manager', to: '/taskmanager' },
        { text: '我的订单', active: false, activeClass: '', icon: 'order-manager', to: '/myorder' }
      ],
      captchaCodeType: 'login',
      loginName: ''
    }
  },
  mounted () {
    this.chkeckIsLogin()
    this.$eventBus.$on('openDialog', (dialog) => {
      this.captchaCodeType = dialog === 'captchCodeModal' ? 'order' : 'login'
      this.$root.$emit('show::modal', dialog)
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
      const {code, loginName} = await this.$api.chkeckIsLogin()

      if (code !== 1) return

      this.loginName = loginName

      const loginInfo = utils.getLoginModel(loginName)

      if (!loginInfo.length) return
      // utils.notification.show('', {body: '登录成功'})
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
          const res = await this.$api.login(loginData)

          if (res.code !== 1) {
            this.$alert(res.message)
            this.$root.$emit('show::modal', 'loginModal')
            return
          }

          const loginInfo = {
            loginName: res.loginName,
            userName: login.userName,
            password: login.password,
            rememberme: login.rememberme,
            autoLogin: login.autoLogin
          }

          this.loginName = res.loginName
          this.$store.dispatch('setLoginModel', loginInfo)
          this.getPassengers()
        } else {
          // 提交订单
          const orderData = this.$store.getters.confirmOrderData

          utils.task.confirmSubmitOrder(orderData.train, orderData.seatCode, orderData.passengers, orderData.key, value.verifyCode, orderData.index)
        }
      }
    },
    // 注销
    logOff () {

    }
  }
}
</script>

<style scoped>
.bg-nav-hue {
  background: linear-gradient(to top right, #41B883, #563D7C, #17A2B8);
  background: -webkit-linear-gradient(left bottom, #41B883, #563D7C, #17A2B8);
  animation: ani-hue 60s infinite linear;
  -webkit-animation: ani-hue 60s infinite linear;
}

main {
  position: absolute;
  overflow: auto;
  top: 5.5rem;
  bottom: 2.5rem;
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

.container-fluid {
  padding-top: 1rem;
}

.badge-count {
  position: absolute;
  top: 1rem;
  right: 0;
}
</style>
