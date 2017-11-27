<template>
  <b-modal id="loginModal" title="登录" :okOnly="true" @shown="dialogShow">
    <form @submit.stop.prevent="login">
      <b-input-group left="账号" class="form-group">
        <b-autocomplete ref="txtLoginUser" class="col pl-sm-0 pr-sm-0" inputClass="bl-rounded-0" placeholder="输入用户名/邮箱/手机号" v-model="userInfo" :dropdownData="loginUsers" @onSelect="selectLoginUser" @inputChange="inputChange"></b-autocomplete>
      </b-input-group>
      <b-input-group left="密码" class="form-group">
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
    <b-button slot="modal-footer" variant="primary" class="waves-effect" @click="login">登录</b-button>
  </b-modal>
</template>

<script>
import utils from '../scripts/utils'

export default {
  name: 'Login',
  data () {
    return {
      loginUsers: [],
      userInfo: null,
      userName: '',
      password: '',
      rememberme: true,
      autoLogin: true
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
    const loginUsers = utils.getLoginModel()

    loginUsers.map(item => {
      this.loginUsers.push({text: item.userName, value: item.password, rememberme: item.rememberme, autoLogin: item.autoLogin})
    })
  },
  methods: {
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
