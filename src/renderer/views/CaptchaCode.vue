<template>
  <b-modal id="captchCodeModal" :title="title" :hideHeaderClose="true" @change="change">
    <div class="text-center img-captcha">
      <img :src="imgCaptchaCode" class="img-fluid" />
    </div>
    <b-button slot="modal-footer" variant="success" class="waves-effect" @click="getCaptchaCode">换一张？</b-button>
    <b-button slot="modal-footer" variant="secondary" class="waves-effect" @click="cancel">返回</b-button>
    <b-button slot="modal-footer" variant="primary" class="waves-effect" @click="validCaptcha">验证</b-button>
  </b-modal>
</template>

<style scoped>
.img-captcha {
  height: 190px;
}
</style>

<script>
export default {
  name: 'CaptchCode',
  data () {
    return {
      imgCaptchaCode: ''
    }
  },
  props: {
    title: {
      type: String,
      default: '选择验证码'
    }
  },
  methods: {
    // 获取验证码
    async getCaptchaCode () {
      const res = await this.$api.getCaptchaCode()
      this.imgCaptchaCode = res
    },
    change (state) {
      if (state) {
        this.getCaptchaCode()
      }
    },
    // 返回
    cancel () {
      this.$root.$emit('hide::modal', 'captchCodeModal')
      this.$root.$emit('show::modal', 'loginModal')
    },
    // 验证
    validCaptcha () {
      console.log('yanzheng')
    }
  }
}
</script>
