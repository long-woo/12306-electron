<template>
  <div id="app" class="h-100">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    window.addEventListener('offline', () => {
      this.$alert('网络没有连接^~^')
    })

    if (!navigator.onLine) return

    this.checkUpdate()
    this.checkTickUrl()
  },
  methods: {
    // 检查是否有新版本
    checkUpdate () {
      const ipcRender = this.$electron.ipcRenderer

      ipcRender.send('checkUpdate')
      ipcRender.on('autoUpdateStatus', (event, res) => {
        this.$alert(res, {timeout: 0})

        if (res.indexOf('Error') > -1) {
          this.$electron.shell.openExternal('https://github.com/long-woo/12306-electron/releases')
        }
      })
    },
    // 检查url是否可用
    async checkTickUrl () {
      const {data} = await this.$api.base.getQueryUrl()

      if (!data) {
        this.$swal('查询车票地址不可用^~^', '请重试', 'warning', {
          buttons: {
            cancel: '取消',
            default: '确定'
          }
        }).then(conf => {
          if (!conf) return

          this.checkTickUrl()
        })

        return
      }

      this.$store.dispatch('setQueryUrl', data)
    }
  }
}
</script>

<style>
/* CSS */
* {
  transition: all 0.3s ease-in;
}

::selection {
  background-color: var(--cyan);
  color: #fff;
}

::-webkit-scrollbar {
  width: 0;
}

html,body {
  height: 100%;
  -webkit-app-region: drag;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Microsoft YaHei";
  overflow: hidden;
  position: relative;
}

input,
a,
button,
tr,
thead,
p,
span,
h4,
.checkbox,
.img-captcha,
.btn,
.swal-icon,
.swal-title {
  -webkit-app-region: no-drag;
}

.waves-effect {
  display: inherit;
}

a:focus {
  outline: none !important;
}

.table {
  margin-bottom: 0;
}

button {
  cursor: pointer;
}

[disabled], .disabled {
  cursor:not-allowed;
}

label {
  margin-bottom: 0 !important;
}

.font-size-14{
  font-size: 0.875rem !important;
}

#nprogress .bar {
  background-color: var(--cyan) !important;
}

#nprogress .spinner,
#nprogress .bar {
  z-index: 999999 !important;
}

#nprogress .spinner-icon {
  border-top-color: #41B883;
  border-left-color: #41B883;
}

.radio, .checkbox {
  margin-bottom: 0 !important;
}

.radio > input[type="radio"]:first-child:checked + label::before,
.checkbox > input[type="checkbox"]:first-child:checked + label::before,
.radio > input[type="radio"]:first-child:checked + input[type="hidden"] + label::before,
.checkbox > input[type="checkbox"]:first-child:checked + input[type="hidden"] + label::before {
  content: "\e7bc" !important;
  font-family: 'iconfont' !important;
  font-size: 1.2rem !important;
}

.iconfont {
  display: inline-block !important;
  transition: all 0.3s ease-in;
}

.bg-nav-hue {
  background: linear-gradient(to top right, #563D7C, #41B883);
  background: -webkit-linear-gradient(left bottom, #563D7C, #41B883);
  animation: ani-hue 60s infinite linear;
  -webkit-animation: ani-hue 60s infinite linear;
}

.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease-in;
}

.rotate-enter,
.rotate-leave-to {
  display: inline-block;
  transform: rotateZ(180deg);
  -webkit-transform: rotateZ(180deg);
}

.border-b-dashed-1 {
  border-bottom: 0.01rem dashed var(--cyan);
}

.ani-slide-left {
  animation: slideLeft 0.3s ease-in;
}

.ani-slide-right {
  animation: slideRight 0.3s ease-out;
}

.form-control:focus,
.sorting,
.close:focus,
.no-outline {
  box-shadow: 0 0 0 transparent !important;
  outline: none;
}

.swal-about .swal-icon--custom {
  width: 6rem;
}

.bl-rounded-0{
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.br-rounded-0 {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.tip-info {
  font-size: .7rem;
  padding: 0;
}

@keyframes slideLeft {
  0% {
    transform: translateX(100%);
  }

  50% {
    transform: translateX(-6%);
  }
  
  100% {
    transform: translateX(0);
  }
}

@keyframes slideRight {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-6%);
  }
  
  100% {
    transform: translateX(100%);
  }
}

@-webkit-keyframes ani-hue {
  from {
    -webkit-filter: hue-rotate(0);
  }

  to {
    -webkit-filter: hue-rotate(-360deg);
  }
}

@keyframes ani-hue {
  from {
    filter: hue-rotate(0);
  }

  to {
    filter: hue-rotate(-360deg);
  }
}
</style>
