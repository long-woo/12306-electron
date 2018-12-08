import Vue from 'vue'

/**
 * 获取登录用户
 * @param {*} userName 账号
 */
const getLoginModel = (userName) => {
  const data = getLocalStorage('LOGINMODEL') || []

  if (userName) {
    return data.filter(item => item.userName === userName || item.loginName === userName) || []
  }

  return data
}

/**
 * 保存登录用户
 * @param {*} model 登录信息
 */
const setLoginModel = (model) => {
  setLocalStorage('LOGINMODEL', model)
}

/**
 * 获取查询车次信息
 */
const getQueryInfo = () => {
  const data = getLocalStorage('QUERYINFO')

  return data
}

/**
 * 保存查询车次信息
 * @param {*} model 查询车次信息
 */
const setQueryInfo = (model) => {
  setLocalStorage('QUERYINFO', model)
}

/**
 * 设置localStorage
 * @param {*} name 名称
 * @param {*} value 值
 */
function setLocalStorage (name, value) {
  localStorage[name] = JSON.stringify(value)
}

/**
 * 获取localStorage
 * @param {*} name 名称
 */
function getLocalStorage (name) {
  const value = localStorage[name] || null
  const data = JSON.parse(value)

  return data
}

/**
 * 休眠
 * @param {*} time 时间（毫秒）
 */
const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

/**
 * 通知
 */
const notification = {
  notictice: null,
  /**
   * 显示通知
   * @param {*} title 通知标题
   * @param {*} option 通知配置
   */
  show (title, option) {
    title = title || '提示'
    option = Object.assign({
      body: '', // 通知内容
      icon: null || require('../assets/logo.png'), // 通知中显示的图标的URL
      data: null, // 通知关联的任务类型的数据
      requireInteraction: false, // 通知保持有效不自动关闭，默认为false
      tag: null, // 识别标签，相同tag时只会打开同一个通知窗口
      timeout: 3000 // 自动关闭时间
    }, option)

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        // 允许
        this.notictice = new Notification(title, option)

        if (option.timeout > 0) {
          setTimeout(() => {
            this.notictice.close()
          }, option.timeout)
        }
      } else if (permission === 'denied') {
        // 拒绝
        Vue.alert('您拒绝了桌面通知')
      } else {
        Vue.alert('等待您允许桌面通知')
      }
    })
  },
  /**
   * 关闭通知
   */
  hide () {
    if (!this.notictice) return

    this.notictice.close()
  }
}

/**
 * 语音
 */
const speech = {
  /**
   * 文本转语音（语音合成）
   * @param {*} text 文本
   */
  textToSpeech (text) {
    const sayText = new window.SpeechSynthesisUtterance(text)

    window.speechSynthesis.speak(sayText)
  }
}

export default {
  getLoginModel,
  setLoginModel,
  getQueryInfo,
  setQueryInfo,
  sleep,
  notification,
  speech
}
