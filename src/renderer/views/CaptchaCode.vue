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
      captchaCode: []
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

      this.captchaCode = []
      this.drawImage(res, 0, 0, true)
    },
    change (state) {
      if (state) {
        this.getCaptchaCode()
      }
    },
    // 画图
    drawImage (imgData, x, y, isCode) {
      const img = new Image()
      const canvas = document.getElementById('cvCaptchaCode')
      const context = canvas.getContext('2d')

      if (isCode) {
        context.fillStyle = '#fff'
        context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        context.fill()
      }

      img.src = imgData
      img.onload = () => {
        if (isCode) {
          context.drawImage(img, x, y)
        } else {
          const index = this.captchaCode.indexOf(`${x}-${y}`)
          if (index < 0) {
            context.drawImage(img, x, y, 30, 30)
            this.captchaCode.push(`${x}-${y}`)
          } else {
            // 移除
            // const startX = x - 15
            // const endX = x + 15
            // const startY = y - 15
            // const endY = y + 15
            this.captchaCode.splice(index, 1)
            context.fillStyle = 'rgba(255,255,255,0.5)'
            context.fillRect(x, y, 30, 30)
            context.save()
          }
          console.log(this.captchaCode)
        }
      }
    },
    // 选择验证码
    selectCode (e) {
      if (e.offsetY <= 30) return

      const x = e.offsetX
      const y = e.offsetY - 30
      console.log(x, y)
      const chkImg = require('@/assets/icon_like.png')

      this.drawImage(chkImg, x - 15, y + 10, false)
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
