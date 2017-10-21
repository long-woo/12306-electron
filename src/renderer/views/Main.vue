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
      <router-view></router-view>
    </main>
    <footer class="fixed-bottom border border-info border-left-0 border-right-0 border-bottom-0 bg-white">
      <div class="d-flex flex-row font-size-14">
        <div class="p-2">
          <a href="javascript:;" v-if="loginName">
            <i class="iconfont icon-user"></i>
            <span>{{loginName}}，</span>
            <span @click="logOff">注销</span>
          </a>
          <a class="text-info waves-effect" href="javascript:;" v-b-modal.loginModal v-else>
            <i class="iconfont icon-user"></i>
            <span>未登录</span>
          </a>
        </div>
      </div>
    </footer>
    <login ref="loginModal"></login>
    <captcha-code @validComplete="validComplete"></captcha-code>
  </div>
</template>

<script>
export default {
  name: 'Main',
  components: {
    Login: () => import('./Login'),
    CaptchaCode: () => import('./CaptchaCode')
  },
  data () {
    return {
      navItems: [
        { text: '新任务', active: true, icon: 'new-task', to: '/newtask' },
        { text: '任务管理', active: false, icon: 'task-manager', to: '/taskmanager' },
        { text: '我的订单', active: false, icon: 'order-manager', to: '/order' }
      ],
      captchaCodeType: 'login',
      loginName: ''
    }
  },
  methods: {
    navChange (nav) {
      nav.active = true

      this.navItems.map((val, index) => {
        if (val.text !== nav.text) val.active = false
      })
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

          if (res.result_code === 1) {
            this.$alert(res.result_message)
            this.$root.$emit('show::modal', 'loginModal')
            return
          }

          this.loginName = login.userName
          this.$store.dispatch('setLoginModel', login.$data)
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

.navbar-nav .nav-link i {
  font-size: 2rem;
}

.navbar-nav .nav-link p {
  margin-bottom: 0;
}

.container-fluid {
  padding-top: 1rem;
}
</style>
