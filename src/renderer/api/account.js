import axios from '../utils/http'
import config from '../utils/config'
import BaseContent from './base'

const _loginAuth = Symbol('_loginAuth')

class Account {
  /**
   * 检查是否登录
   */
  static checkIsLogin () {
    return this[_loginAuth]()
  }

  /**
   * 获取登录二维码
   */
  static async getLoginQRCode () {
    let message = '使用手机铁路12306扫一扫'
    const res = await axios.post(config.urls.loginQRCode, {appid: 'otn'})
    const {image: qrCode, uuid} = res
    const data = {
      qrCode: `data:image/jpg;base64,${qrCode}`,
      uuid
    }

    if (res.result_code !== '0') {
      message = res.result_message
      return new BaseContent(null, {message, code: 400})
    }

    return new BaseContent(data, {message})
  }

  /**
   * 登录
   * @param {*} formData 表单数据
   */
  static async login (formData) {
    formData.appid = 'otn'

    let message = ''
    const res = await axios.post(config.urls.login, formData)

    if (res.result_code !== 0) {
      message = res.result_message

      return new BaseContent(null, {message, code: 400})
    }

    return this[_loginAuth]()
  }

  /**
   * 检查登录二维码
   * @param {*} formData
   * uuid
   */
  static async checkLoginQRCode (formData) {
    formData.appid = 'otn'

    const res = await axios.post(config.urls.checkLoginQRCode, formData)
    const code = parseInt(res.result_code) // 1.扫描成功，等待手机确认、2.扫码登录成功、3.二维码已过期
    let message = '使用手机铁路12306扫一扫'

    if (code === 2) {
      message = res.result_message

      // return new BaseContent(res.uamtk, {message})
      return this[_loginAuth]()
    }

    switch (code) {
      case 0:
        break
      case 1:
        message = '扫描成功，等待手机确认'
        break
      default:
        message = res.result_message
        break
    }

    return new BaseContent({code}, {message, code: 400})
  }

  /**
   * 获取乘客
   * @param {*} name 乘客名
   * @param {*} pageIndex 当前页
   * @param {*} pageCount 每页数
   */
  static async getPassengers (name, pageIndex, pageCount) {
    let formData = {
      pageIndex: pageIndex || 1,
      pageSize: pageCount || 10
    }

    if (name) {
      formData['passengerDTO.passenger_name'] = name
    }

    let {data} = await axios.post(config.urls.getPassengers)

    data = data.normal_passengers || []

    return new BaseContent(data)
  }

  /**
   * 退出登录
   */
  static loginOff () {
    return axios.get(config.urls.logOff)
  }

  /**
   * 登录授权
   */
  static async [_loginAuth] () {
    let code = 400
    let message = '请求成功'
    let data = {
      code: -1 // 用于扫码登录时，做判断
    }
    let res = await axios.post(config.urls.loginAuthuam, {appid: 'otn'})

    if (res.result_code !== 0) {
      message = res.result_message

      return new BaseContent(data, {message, code})
    }

    let loginTicket = res.newapptk

    res = await axios.post(config.urls.loginAuthClient, {tk: loginTicket})

    if (res.result_code !== 0) {
      message = res.result_message

      return new BaseContent(data, {message, code})
    }

    code = 200
    message = '登录成功'
    data.code = 2
    data.ticket = res.apptk
    data.loginName = res.username

    return new BaseContent(data, {message, code})
  }
}

export default Account
