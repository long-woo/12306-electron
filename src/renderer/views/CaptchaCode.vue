<template>
  <b-modal id="captchCodeModal" :title="title" :no-close-on-backdrop="true" @change="change">
    <div class="text-center img-captcha">
      <canvas id="cvCaptchaCode" width="293px" height="190px" @click="selectCode"></canvas>
      <img :src="require('@/assets/icon_like.png')" v-for="(item, index) in imgCaptchaCode" :key="index" :style="{left: `${item.X}px`, top: `${item.Y}px`}" @click="cancelSelecte(index)" />
    </div>
    <b-button slot="modal-footer" variant="success" class="waves-effect" @click="getCaptchaCode">换一张？</b-button>
    <b-button slot="modal-footer" variant="secondary" class="waves-effect" @click="cancel" v-show="type === 'login'">返回</b-button>
    <b-button slot="modal-footer" variant="info" class="waves-effect" @click="validCaptcha">验证</b-button>
  </b-modal>
</template>

<style scoped>
.img-captcha {
  height: 190px;
  width: 293px;
  margin: 0 auto;
  position: relative;
}

.img-captcha canvas {
  box-shadow: 0 6px 20px rgba(225, 225, 225, 1)
}

.img-captcha img {
  position: absolute;
  width: 30px;
  height: 30px;
}
</style>

<script>
export default {
  name: 'CaptchCode',
  data () {
    return {
      captchaCode: [],
      imgCaptchaCode: []
    }
  },
  props: {
    title: {
      type: String,
      default: '选择验证码'
    },
    type: {
      type: String,
      default: 'login'
    }
  },
  methods: {
    // 获取验证码
    async getCaptchaCode () {
      const res = await this.$api.getCaptchaCode(this.type)

      if (!res) return

      this.captchaCode = []
      this.imgCaptchaCode = []
      this.drawImage(res, 0, 0)
    },
    change (state) {
      if (state) {
        this.getCaptchaCode()
      }
    },
    // 画图
    drawImage (imgData, x, y) {
      const img = new Image()
      const canvas = document.getElementById('cvCaptchaCode')
      const context = canvas.getContext('2d')

      context.fillStyle = '#fff'
      context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      context.fill()

      img.src = imgData
      img.onload = () => {
        context.drawImage(img, x, y)
      }
    },
    // 选择验证码
    selectCode (e) {
      let x = e.offsetX
      let y = e.offsetY

      if (y <= 30) return

      y = y - 30

      this.captchaCode.push(`${x}-${y}`)
      this.imgCaptchaCode.push({X: x - 15, Y: y + 15})
    },
    // 取消选择
    cancelSelecte (index) {
      this.captchaCode.splice(index, 1)
      this.imgCaptchaCode.splice(index, 1)
    },
    // 返回
    cancel () {
      if (this.type !== 'login') return

      this.$root.$emit('bv::hide::modal', 'captchCodeModal')
      this.$root.$emit('bv::show::modal', 'loginModal')
    },
    // 验证
    async validCaptcha () {
      let verifyCode = this.captchaCode.toString()

      if (!verifyCode) return

      verifyCode = verifyCode.replace(/(-)/gi, ',')

      const {code, message} = await this.$api.validCaptchaCode(verifyCode, this.type)
      const validResult = {
        result: code === 1,
        verifyCode
      }

      if (!validResult.result) {
        this.$alert(message)
        this.getCaptchaCode()
      } else {
        this.$root.$emit('bv::hide::modal', 'captchCodeModal')
      }

      // 验证完成
      this.$emit('validComplete', validResult)
    }
  }
}
</script>
