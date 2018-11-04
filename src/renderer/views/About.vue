<template>
  <div class="swal-overlay" :class="{'swal-overlay--show-modal': show}">
    <div class="swal-modal">
      <button type="button" class="close mr-1" aria-label="Close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="swal-icon swal-icon--custom">
        <img src="../assets/logo.png">
      </div>
      <div class="swal-title pt-0">{{appName}}</div>
      <div class="swal-text mb-0 text-center">
        <p class="mb-1">版本&nbsp;{{appVersion}}（<a href="javascript:;" @click="checkAppUpdate">检查更新</a>）</p>
        <p>Copyright&nbsp;&copy;&nbsp;{{currentYear}}&nbsp;<a href="javascript:;" class="text-info" @click="openUrl('https://about.me/longwu')">{{appAuthorName}}</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      appName: '',
      appVersion: '',
      appAuthorName: '',
      currentYear: new Date().getFullYear()
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    const appInfo = this.$electron.remote.app
    const pakInfo = this.$electron.remote.require('../../package.json')
    const author = pakInfo.author.split(' ') || ['long.woo']
    const authorName = author[0]

    this.appName = appInfo.getName()
    this.appVersion = appInfo.getVersion()
    this.appAuthorName = authorName
  },
  methods: {
    // 检查更新
    checkAppUpdate () {
      const ipcRender = this.$electron.ipcRenderer

      ipcRender.send('checkUpdate')
    },
    // 打开url
    openUrl (url) {
      this.$electron.shell.openExternal(url)
    },
    // 关闭
    close () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped>
.swal-overlay--show-modal {
  -webkit-app-region: drag;
}
.swal-icon--custom {
  width: 6rem;
}
</style>
