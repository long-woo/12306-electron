<template>
  <div class="h-100">
    <header class="navbar-dark fixed-top">
      <div class="navbar-nav-scroll">
        <b-nav class="navbar-nav flex-row justify-content-center text-center bg-nav-hue">
          <b-nav-item class="waves-effect" :active-class="nav.activeClass" v-for="(nav, index) in navItems" :key="index" :to="nav.to" @click="navChange(nav)">
            <i class="iconfont" :class="`icon-${nav.icon}`"></i>
            <p>
              {{nav.text}}
              <b-badge class="badge-count" pill variant="danger" v-if="index === 2 && $store.getters.orderCount">
                {{$store.getters.orderCount}}
              </b-badge>
            </p>
          </b-nav-item>
        </b-nav>
      </div>
    </header>
    <main class="container-fluid">
      <transition appear enter-active-class="animated zoomInDown">
        <router-view />
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
        <div class="text-center" v-if="showAddTask">
          <a class="btn-add-task waves-effect" href="javascript:;" @click="addTask">
            <i class="iconfont" :class="buttonIcon"></i>
            <p>{{buttonText}}</p>
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
    <task-panel :showPanel="showTaskPanel" :passengers="passengers" @addTaskSuccess="addTask" />
    <login ref="loginModal"></login>
    <captcha-code :type="captchaCodeType" @validComplete="validComplete"></captcha-code>
    <about :show.sync="showAbout" />
  </div>
</template>

<script>
import utils from '../utils/utils'
import OrderTask from '../utils/task'

export default {
  name: 'Main',
  components: {
    TaskPanel: () => import('./TaskPanel'),
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
      showTaskPanel: false,
      captchaCodeType: 'login',
      loginName: '',
      showAbout: false,
      buttonIcon: 'icon-add-task',
      buttonText: '添加任务',
      showAddTask: true,
      passengers: []
    }
  },
  watch: {
    '$route' (to, from) {
      const isShow = to.name === 'NewTask'

      if (!isShow) this.showTaskPanel = false

      this.showAddTask = isShow
    },

    showTaskPanel (value) {
      if (value) {
        this.buttonIcon = 'icon-close'
        this.buttonText = '关闭'
        return
      }

      this.buttonIcon = 'icon-add-task'
      this.buttonText = '添加任务'
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
    async getPassengers () {
      if (!this.$store.getters.loginModel) return

      const { data } = await this.$api.account.getPassengers('', 1, 999)

      if (!data.length) return

      this.passengers = data
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

          // utils.task.confirmOrderQueueAsync(orderData.train, orderData.seatCode, orderData.passengers, orderData.key, value.verifyCode, orderData.awaitTime)
          OrderTask.confirmOrderQueue(orderData.train, orderData.passengers, orderData.key, orderData.token, orderData.seatCode, value.verifyCode, orderData.awaitTime, orderData.chooseSeats)
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
    },
    // 添加任务
    addTask () {
      this.showTaskPanel = !this.showTaskPanel
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

.btn-add-task {
  background-color: var(--cyan);
  box-shadow: 0 0 0.5rem var(--cyan);
  color: var(--white);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 4.5rem;
  height: 4.5rem;
  margin: 0 auto;
  border-radius: 50%;
  text-decoration: none;
}

.btn-add-task:active {
  width: 4rem;
  height: 4rem;
}

.btn-add-task:hover {
  background-color: rgba(23, 162, 184, 0.8);
}

.btn-add-task i {
  font-size: 1.8rem;
}

.btn-add-task p {
  margin-top: -.5rem;
}
</style>
