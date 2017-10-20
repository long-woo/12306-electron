<template>
  <b-modal id="loginModal" title="登录" :okOnly="true">
    <form @submit.stop.prevent="login">
      <b-input-group left="账号" class="form-group">
        <b-form-input type="text" placeholder="输入用户名/邮箱/手机号" v-model="userName" @keyup.enter="login"></b-form-input>
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
export default {
  name: 'Login',
  data () {
    return {
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
  methods: {
    // 登录
    login (e) {
      if (!this.userName || !this.password) {
        this.$alert('账号或密码不能为空')
        return false
      }

      this.$root.$emit('hide::modal', 'loginModal')
      this.$root.$emit('show::modal', 'captchCodeModal')
    }
  }
}
</script>
