import axios from '../utils/http'
import config from '../utils/config'
import BaseContent from './base'

const _loginAuth = Symbol('_loginAuth')

class Account {
  /**
   * 检查是否登录
   */
  static chkeckIsLogin () {
    return this[_loginAuth]()
  }

  /**
   * 登录
   * @param {*} formData 表单数据
   */
  static async login (formData) {
    formData.appid = 'otn'

    let message = ''
    let res = await axios.post(config.urls.login, formData)

    if (res.result_code !== 0) {
      message = res.result_message

      return new BaseContent(null, {message, code: 400})
    }

    return this[_loginAuth]()
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
    let res = await axios.post(config.urls.loginAuthuam, {appid: 'otn'})

    if (res.result_code !== 0) {
      message = res.result_message

      return new BaseContent(null, {message, code})
    }

    let loginTicket = res.newapptk

    res = await axios.post(config.urls.loginAuthClient, {tk: loginTicket})

    if (res.result_code !== 0) {
      message = res.result_message

      return new BaseContent(null, {message, code})
    }

    code = 200
    message = '登录成功'

    return new BaseContent({
      ticket: res.apptk,
      loginName: res.username
    }, {message, code})
  }
}

export default Account
