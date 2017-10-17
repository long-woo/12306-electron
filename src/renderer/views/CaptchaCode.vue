<template>
  <b-modal id="captchCodeModal" :title="title" :hideHeaderClose="true" @change="change">
    <div class="text-center img-captcha">
      <canvas id="cvCaptchaCode" width="293px" height="190px" @click="selectCode"></canvas>
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

.img-captcha canvas {
  box-shadow: 0 6px 20px rgba(225, 225, 225, 1)
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
      const img = new Image()
      const canvas = document.getElementById('cvCaptchaCode')
      const context = canvas.getContext('2d')

      context.fillStyle = '#fff'
      context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      context.fill()
      img.src = res
      img.onload = () => {
        context.drawImage(img, 0, 0)
      }
    },
    change (state) {
      if (state) {
        this.getCaptchaCode()
      }
    },
    // 选择验证码
    selectCode (e) {
      console.log(e)
      const chkImg = new Image()
      chkImg.src = require('@/assets/icon_like.png')
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
