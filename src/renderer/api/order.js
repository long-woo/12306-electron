import axios from './http'
import config from './config'
import BaseContent from './base'

class Order {
  /**
   * 提交订单
   * @param {*} formData 参数 (secretStr、train_date、back_train_date、tour_flag、purpose_codes、query_from_station_name、query_to_station_name)
   */
  static async submitOrder (formData) {
    formData.purpose_codes = formData.ticketType || 'ADULT'
    formData.tour_flag = 'dc'

    const {data, messages} = await axios.post(config.urls.submitOrder, formData)
    let message = messages.indexOf('有未处理的订单') > -1 ? '您还有未完成支付的订单，请先进行处理' : messages.toString()
    let code = 400

    if (data === 'N') {
      code = 200
      message = '订单已提交'
    }

    return new BaseContent(null, {message, code})
  }

  /**
   * 获取提交订单的信息（token、keychange）
   */
  static async getSubmitOrderInfo () {
    const res = await axios.post(config.urls.getSubmitOrderInfo)
    // token
    const rgxToken = res.match(/globalRepeatSubmitToken\s+=\s+'(.+)';/) || []
    const orderToken = rgxToken.length ? rgxToken[1] : ''
    // keyischange 'key_check_isChange':'A9B10220CE8ABC25EFB68C1CADA21FA79F07219C68157AB466B000C7'
    const rgxKey = res.match(/'key_check_isChange':'(.+)','leftDetails':/) || []
    const orderKey = rgxKey.length ? rgxKey[1] : ''

    return new BaseContent({orderToken, orderKey})
  }

  /**
   * 检查提交订单信息
   * @param {*} formData 参数（cancel_flag、bed_level_order_num、passengerTicketStr、oldPassengerStr、tour_flag、randCode、_json_att、REPEAT_SUBMIT_TOKEN）
   */
  static async checkOrderInfo (formData) {
    formData.cancel_flag = 2
    formData.bed_level_order_num = '000000000000000000000000000000'
    formData.tour_flag = 'dc'
    formData._json_att = ''

    const {data, messages} = await axios.post(config.urls.checkOrderInfo, formData)
    const code = 400

    if (!data) return new BaseContent(null, {message: messages.toString(), code})

    if (!data.submitStatus) return new BaseContent(null, {message: (data.isRelogin ? '请先登录' : data.errMsg), code})

    return new BaseContent({
      isCaptchaCode: data.ifShowPassCode === 'Y',
      captchaCodeTime: data.ifShowPassCodeTime,
      isChooseBed: data.canChooseBeds === 'Y',
      isChooseSeat: data.canChooseSeats === 'Y',
      chooseSeats: data.choose_Seats,
      isChooseMid: data.isCanChooseMid === 'Y',
      smoke: data.smokeStr
    })
  }

  /**
   * 获取订单出票时间
   */
  static async getOrderAwaitTime () {
    const {data} = await axios.get(config.urls.getOrderAwaitTime, {
      params: {
        random: new Date().getTime(),
        tourFlag: 'dc',
        _json_att: ''
      }
    })
    let code = 400
    let message = '请求失败'

    if (!data.queryOrderWaitTimeStatus) {
      message = '请先登录'

      return new BaseContent(null, {message, code})
    }

    if (data.waitTime === -100) {
      message = '出票超时'

      return new BaseContent(null, {message, code})
    }

    return new BaseContent(data.orderId)
  }

  /**
   * 获取待支付的订单
   */
  static async getMyOrder () {
    let code = 400
    let message = '请求失败'
    const {data, messages} = await axios.post(config.urls.getMyOrder)

    if (!data) {
      message = '没有找到待支付的订单'

      return new BaseContent([], {message, code})
    }

    const order = data.orderDBList || []

    if (messages.length) {
      message = messages.toString()

      return new BaseContent([], {message, code})
    }

    if (data.to_page === 'cache') {
      message = '您的订单还在排队中'

      return new BaseContent([], {message, code})
    }

    if (!order.length) {
      message = '没有找到待支付的订单'

      return new BaseContent([], {message, code})
    }

    return new BaseContent(order)
  }

  /**
   * 获取提交订单队列信息
   * @param {*} formData 参数（train_date、train_no、stationTrainCode、seatType、fromStationTelecode、toStationTelecode、leftTicket、purpose_codes、train_location、_json_att、REPEAT_SUBMIT_TOKEN）
   * @param {*} seatText 座位名称
   */
  static async getOrderQueueInfo (formData, seatText) {
    formData.purpose_codes = '00'
    formData._json_att = ''

    const {data, messages} = await axios.post(config.urls.getOrderQueueInfo, formData)
    let code = 400
    let ticketData
    let message

    if (!data) {
      message = messages.toString()
      return new BaseContent(null, {message, code})
    }

    if (data.isRelogin === 'Y') {
      message = '请先登录'
      return new BaseContent(null, {message, code})
    }

    code = 200
    ticketData = data.ticket.split(',') // 可能有无座数
    message = `${formData.stationTrainCode}车次【${seatText}】剩余【${ticketData[0]}】张`

    if (ticketData.length > 1) {
      message += `和【无座（${ticketData[1]}）张】`
    }

    if (data.op_2 === 'true') {
      code = 400
      message = `${message}，当前排队人数【${data.countT}】超过剩余票数，请更换车次或座位`
    }

    return new BaseContent(null, {message, code})
  }

  /**
   * 确认提交订单
   * @param {*} formData 参数（passengerTicketStr、oldPassengerStr、randCode、purpose_codes、key_check_isChange、leftTicketStr、train_location、choose_seats、seatDetailType、roomType、dwAll、_json_att、REPEAT_SUBMIT_TOKEN）
  */
  static async confirmOrderQueue (formData) {
    formData.purpose_codes = '00'
    formData.roomType = '00'
    formData.dwAll = 'N'
    formData._json_att = ''

    const {data} = await axios.post(config.urls.confirmOrderQueue, formData)
    let code = 200
    let message = '订单已确认，等待出票'

    if (!data.submitStatus) {
      code = 400
      message = data.errMsg
    }

    return new BaseContent(null, {message, code})
  }

  /**
   * 自动提交订单
   * @param {*} formData （secretStr,train_date,query_from_station_name,query_to_station_name,passengerTicketStr,oldPassengerStr）
   */
  static async autoSubmitOrder (formData) {
    formData.tour_flag = 'dc'
    formData.purpose_codes = formData.ticketType || 'ADULT'
    formData.cancel_flag = 2
    formData.bed_level_order_num = '000000000000000000000000000000'

    let code = 400
    let message
    const {data, messages} = await axios.post(config.urls.autoSubmitOrder, formData)

    if (!data) {
      message = messages.toString()

      return new BaseContent(null, {message, code})
    }

    if (!data.submitStatus) {
      message = data.isRelogin ? '请先登录' : data.errMsg

      return new BaseContent(null, {message, code})
    }

    const ticketData = data.result.split('#')

    return new BaseContent({
      ticketData: ticketData,
      isCaptchaCode: data.ifShowPassCode === 'Y',
      captchaCodeTime: data.ifShowPassCodeTime,
      isChooseBed: data.canChooseBeds === 'Y',
      isChooseSeat: data.canChooseSeats === 'Y',
      chooseSeats: data.choose_Seats,
      isChooseMid: data.isCanChooseMid === 'Y',
      smoke: data.smokeStr
    })
  }

  /**
   * 获取队列信息（自动提交）
   * @param {*} formData (train_date,train_no,stationTrainCode,seatType,fromStationTelecode,toStationTelecode,leftTicket)
   */
  static async getOrderQueueInfoAsync (formData) {
    formData.purpose_codes = formData.ticketType || 'ADULT'
    formData._json_att = ''

    let code = 400
    let message
    const {data, messages} = await axios.post(config.urls.getOrderQueueInfoAsync, formData)

    if (!data) {
      message = messages.toString()

      return new BaseContent(null, {message, code})
    }

    if (data.isRelogin === 'Y') {
      message = '请先登录'

      return new BaseContent(null, {message, code})
    }

    const ticketData = data.ticket.split(',') // 可能有无座数

    message = `${formData.stationTrainCode}车次【${BaseContent.getSeatTypeInfo(formData.seatType)}】剩余【${ticketData[0]}】张`

    if (ticketData.length > 1) {
      message += `和【无座（${ticketData[1]}）张】`
    }

    if (data.op_2 === 'true') {
      message = `${message}，当前排队人数【${data.countT}】超过剩余票数，请更换车次或座位`
      return new BaseContent(null, {message, code})
    }

    return new BaseContent(null, {message})
  }

  /**
 * 确认订单队列（自动提交）
 * @param {*} formData (passengerTicketStr,oldPassengerStr,randCode,key_check_isChange,leftTicketStr,train_location,choose_seats,seatDetailType)
 */
  static async confirmOrderQueueAsync (formData) {
    formData.purpose_codes = formData.ticketType || 'ADULT'
    formData._json_att = ''

    let code = 200
    let message = '订单已确认，等待出票'
    const {data} = await axios.post(config.urls.confirmOrderQueueAsync, formData)

    if (!data.submitStatus) {
      code = 400
      message = data.errMsg
    }

    return new BaseContent(null, {message, code})
  }
}

export default Order
