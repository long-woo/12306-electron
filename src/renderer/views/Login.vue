<template>
  <b-modal id="loginModal" title="登录" :hide-footer="true" @shown="dialogShow">
    <b-tabs v-model="tabIndex">
      <b-tab title="二维码登录" active class="text-center pt-3">
        <img class="login-qrcode" :src="loginQRCode"/>
        <h4 class="text-success mt-3">{{loginQRStatus}}</h4>
      </b-tab>
      <b-tab title="账号登录" class="pt-3">
        <form @submit.stop.prevent="login">
          <b-input-group prepend="账号" class="form-group">
            <b-autocomplete ref="txtLoginUser" class="col pl-0 pr-0" inputClass="bl-rounded-0 rounded-right" placeholder="输入用户名/邮箱/手机号" v-model="userInfo" :dropdownData="loginUsers" @onSelect="selectLoginUser" @inputChange="inputChange"></b-autocomplete>
          </b-input-group>
          <b-input-group prepend="密码" class="form-group">
            <b-form-input type="password" placeholder="输入密码" v-model="password" @keyup.enter="login"></b-form-input>
          </b-input-group>
          <div class="form-row">
            <div class="checkbox icheck-info col-6">
              <input type="checkbox" id="chkRememberme" v-model="rememberme" />
              <label for="chkRememberme">记住我？</label>
            </div>
            <div class="checkbox icheck-info col-6 text-right">
              <input type="checkbox" id="chkAutoLogin" v-model="autoLogin" />
              <label for="chkAutoLogin">自动登录</label>
            </div>
          </div>
        </form>
        <b-button variant="info" class="mt-3 waves-effect" block @click="login">登录</b-button>
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<script>
import utils from '../utils/utils'

export default {
  name: 'Login',
  data () {
    return {
      tabIndex: 0,
      loginUsers: [],
      userInfo: null,
      userName: '',
      password: '',
      rememberme: true,
      autoLogin: true,
      loginQRCode: '',
      loginQRStatus: ''
    }
  },
  watch: {
    rememberme (value) {
      if (!value) {
        this.autoLogin = false
      }
    },
    autoLogin (value) {
      if (value) {
        this.rememberme = true
      }
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      this.getRememberUsers()
      this.getLoginQRCode()
    },

    // 获取登录二维码
    async getLoginQRCode () {
      const {code, data, message} = await this.$api.account.getLoginQRCode()

      if (code !== 200) return

      this.loginQRCode = data.qrCode
      this.loginQRStatus = message
    },

    // 获取记住账号用户
    getRememberUsers () {
      const loginUsers = utils.getLoginModel()

      loginUsers.map(item => {
        this.loginUsers.push({text: item.userName, value: item.password, rememberme: item.rememberme, autoLogin: item.autoLogin})
      })
    },

    dialogShow () {
      this.$refs.txtLoginUser.focus()
    },

    // 选择登录用户
    selectLoginUser (user) {
      this.userInfo = user
      this.userName = user.text
      this.password = user.value
      this.rememberme = user.rememberme
      this.autoLogin = user.autoLogin

      if (user.autoLogin) {
        this.login()
      }
    },
    inputChange (value) {
      this.userName = value
    },
    // 登录
    login () {
      if (!this.userName || !this.password) {
        this.$alert('账号或密码不能为空')
        return false
      }

      this.$root.$emit('bv::hide::modal', 'loginModal')
      this.$root.$emit('bv::show::modal', 'captchCodeModal')
    }
  }
}
</script>

<style scoped>
.login-qrcode {
  width: 130px;
  height: 130px;
}
</style>
