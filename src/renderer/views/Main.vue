<template>
  <div>
    <header class="navbar-dark fixed-top">
      <div class="navbar-nav-scroll">
        <b-nav class="navbar-nav flex-row justify-content-center text-center bg-info">
          <b-nav-item class="waves-effect" :active="nav.active" v-for="(nav, index) in navItems" :key="index" :to="nav.to" @click="navChange(nav)">
            <i class="iconfont" :class="`icon-${nav.icon}`"></i>
            <p>{{nav.text}}</p>
          </b-nav-item>
        </b-nav>
      </div>
    </header>
    <main class="container-fluid">
      <h1>{{$route.params.id}}</h1>
      <router-view></router-view>
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
      <task-button ref="taskButton"></task-button>
    </footer>

    <login ref="loginModal"></login>
    <captcha-code @validComplete="validComplete"></captcha-code>
  </div>
</template>

<script>
import utils from '../scripts/utils'

export default {
  name: 'Main',
  components: {
    Login: () => import('./Login'),
    CaptchaCode: () => import('./CaptchaCode'),
    TaskButton: () => import('./TaskButton')
  },
  data () {
    return {
      navItems: [
        { text: '新任务', active: true, icon: 'new-task', to: '/main/newtask' },
        { text: '任务管理', active: false, icon: 'task-manager', to: '/main/taskmanager' },
        { text: '我的订单', active: false, icon: 'order-manager', to: '/main/order' }
      ],
      captchaCodeType: 'login',
      loginName: ''
    }
  },
  mounted () {
    this.chkeckIsLogin()
  },
  methods: {
    navChange (nav) {
      nav.active = true

      this.navItems.map((val, index) => {
        if (val.text !== nav.text) val.active = false
      })
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
      this.$refs.taskButton.getPassengers()
    },
    // 校验验证码完成
    async validComplete (value) {
      if (value) {
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
          this.$refs.taskButton.getPassengers()
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
</style>
