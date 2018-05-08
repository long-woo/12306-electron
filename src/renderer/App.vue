<template>
  <div id="app">
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
        this.$alert(res)

        if (res.indexOf('Error') > -1) {
          this.$electron.shell.openExternal('https://github.com/woo-long/12306-electron/releases')
        }
      })
    },
    // 检查url是否可用
    async checkTickUrl () {
      const res = await this.$api.getQueryUrl()

      if (!res) {
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

      this.$store.dispatch('setQueryUrl', res)
    }
  }
}
</script>

<style>
/* CSS */
* {
  transition: all 0.3s ease;
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
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Microsoft YaHei";
  user-select: none;
  -webkit-app-region: drag;
  overflow: hidden;
}

input,
a,
button,
tr,
thead,
.checkbox,
.img-captcha,
.btn,
.datepicker-overlay,
.btn-task-del {
  -webkit-app-region: no-drag;
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
  transition: all 0.3s ease;
}

.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
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

.ani-slide-up {
  animation: slideUp 0.3s ease forwards;
}

.ani-slide-down {
  animation: slideDown 0.3s ease forwards;
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

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  
  to {
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    transform: translateY(0);
  }
  
  to {
    transform: translateY(100%);
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
