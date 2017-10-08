import axios from 'axios'
import Vue from 'vue'

// 配置axios
axios.defaults.baseURL = 'https://kyfw.12306.cn/otn'
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(config => {
  // Vue.$toast('请稍后^o^', {
  //   icon: 'loading',
  //   timeout: 0
  // })

  return config
}, error => {
  // Vue.$hideToast()
  Vue.alert('请求出错拉>.<')

  return error
})

// 响应拦截器
axios.interceptors.response.use(res => {
  // Vue.$hideToast()

  if (res.data.Code !== 20000) {
    const message = res.data.Message

    Vue.$alert(message)

    return message
  }

  return res.data
}, error => {
  // Vue.$hideToast()
  Vue.alert('发生错误了，再试一下>.<')

  return error
})

export default axios
