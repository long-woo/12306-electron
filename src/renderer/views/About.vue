<template>
  <div class="swal-about-overlay" :class="{'swal-about-show': show}" tabindex="-1">
    <div class="swal-about-modal">
      <button type="button" class="close mr-1" aria-label="Close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="swal-icon swal-icon--custom">
        <img :src="appIcon">
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
      appIcon: require('../assets/logo.png'),
      appName: '',
      appVersion: '',
      appAuthorName: '',
      currentYear: ''
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
    this.currentYear = new Date().getFullYear()
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
.swal-about-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0;
  overflow-y: hidden;
  background-color: rgba(0,0,0,.4);
  opacity: 0;
  transition: opacity .3s;
  display: none;
}

.swal-about-overlay:before {
  content: ' ';
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}

.swal-about-show {
  opacity: 1;
  display: block;
  z-index: 10000;
}

.swal-about-show .swal-about-modal {
  opacity: 1;
  box-sizing: border-box;
  -webkit-animation: showSweetAlert .3s;
  animation: showSweetAlert .3s;
  will-change: transform;
}

.swal-about-modal {
  width: 478px;
  opacity: 0;
  background-color: #fff;
  text-align: center;
  border-radius: 5px;
  position: static;
  margin: 20px auto;
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  z-index: 10001;
  transition: opacity .2s,-webkit-transform .3s;
  transition: transform .3s,opacity .2s;
  transition: transform .3s,opacity .2s,-webkit-transform .3s;
}

.swal-icon--custom {
  width: 6rem;
}

@media (max-width: 500px) {
  .swal-about-modal {
      width: calc(100% - 20px);
  }
}
</style>
