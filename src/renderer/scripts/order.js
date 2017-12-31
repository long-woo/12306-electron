import Vue from 'vue'

/**
 * 提交订单
 * @param {*} url url
 * @param {*} formData 参数 (secretStr、train_date、back_train_date、tour_flag、purpose_codes、query_from_station_name、query_to_station_name)
 */
const submitOrder = async (url, formData) => {
  formData.purpose_codes = 'ADULT'
  formData.tour_flag = 'dc'

  const {data} = await Vue.http.post(url, formData)
  let result = {
    code: 0,
    message: '提交订单失败'
  }

  if (data === 'N') {
    result.code = 1
    result.message = '提交订单成功'
  }

  return result
}

/**
 * 获取提交订单的信息（token、keychange）
 * @param {*} url url
 */
const getSubmitOrderInfo = async (url) => {
  const res = await Vue.http.post(url)
  // token
  const rgxToken = res.match(/globalRepeatSubmitToken\s+=\s+'(.+)';/) || []
  console.log(rgxToken)
  const orderToken = rgxToken.length ? rgxToken[1] : ''
  // keyischange 'key_check_isChange':'A9B10220CE8ABC25EFB68C1CADA21FA79F07219C68157AB466B000C7'
  const rgxKey = res.match(/'key_check_isChange':'(.+)','leftDetails':/) || []
  console.log(rgxKey)
  const orderKey = rgxKey.length ? rgxKey[1] : ''
  const result = {
    code: 1,
    data: {
      orderToken,
      orderKey
    }
  }

  return result
}

/**
 * 检查提交订单信息
 * @param {*} url url
 * @param {*} formData 参数（cancel_flag、bed_level_order_num、passengerTicketStr、oldPassengerStr、tour_flag、randCode、_json_att、REPEAT_SUBMIT_TOKEN）
 */
const checkOrderInfo = async (url, formData) => {
  formData.cancel_flag = 2
  formData.bed_level_order_num = '000000000000000000000000000000'
  formData.tour_flag = 'dc'
  formData._json_att = ''

  const {data, messages} = await Vue.http.post(url, formData)
  let result = {}

  if (!data) {
    result.code = 0
    result.message = messages.toString()
    return result
  }

  if (!data.submitStatus) {
    result.code = 0
    result.message = data.isRelogin ? '请先登录' : data.errMsg
    return result
  }

  result.code = 1
  result.isCaptchaCode = data.ifShowPassCode === 'Y'
  result.captchaCodeTime = data.ifShowPassCodeTime
  result.isChooseBed = data.canChooseBeds === 'Y'
  result.isChooseSeat = data.canChooseSeats === 'Y'
  result.chooseSeats = data.choose_Seats
  result.isChooseMid = data.isCanChooseMid === 'Y'
  result.smoke = data.smokeStr
  return result
}

/**
 * 获取提交订单队列信息
 * @param {*} url url
 * @param {*} formData 参数（train_date、train_no、stationTrainCode、seatType、fromStationTelecode、toStationTelecode、leftTicket、purpose_codes、train_location、_json_att、REPEAT_SUBMIT_TOKEN）
 * @param {*} seatText 座位名称
 */
const getOrderQueueInfo = async (url, formData, seatText) => {
  formData.purpose_codes = '00'
  formData._json_att = ''

  const {data, messages} = await Vue.http.post(url, formData)
  let result = {}

  if (!data) {
    result.code = 0
    result.message = messages.toString()
    return result
  }

  if (data.isRelogin === 'Y') {
    result.code = 0
    result.message = '请先登录'
    return result
  }

  const ticketData = data.ticket.split(',') // 可能有无座数
  let message = `${formData.stationTrainCode}车次【${seatText}】剩余【${ticketData[0]}】张`

  if (ticketData.length > 1) {
    message += `和【无座（${ticketData[1]}）张】`
  }

  if (data.op_2 === 'true') {
    result.code = 0
    result.message = `${message}，当前排队人数【${data.countT}】超过剩余票数，请更换车次或座位`
    return
  }

  result.code = 1
  result.message = message
  return result
}

/**
 * 确认提交订单
 * @param {*} url
 * @param {*} formData 参数（passengerTicketStr、oldPassengerStr、randCode、purpose_codes、key_check_isChange、leftTicketStr、train_location、choose_seats、seatDetailType、roomType、dwAll、_json_att、REPEAT_SUBMIT_TOKEN）
 */
const confirmOrderQueue = async (url, formData) => {
  formData.purpose_codes = '00'
  formData.roomType = '00'
  formData.dwAll = 'N'
  formData._json_att = ''

  const {data} = await Vue.http.post(url, formData)
  let result = {}

  if (!data.submitStatus) {
    result.code = 0
    result.message = data.errMsg
    return result
  }

  result.code = 1
  result.message = '订单已确认，等待出票'
  return result
}

export default {
  submitOrder,
  getSubmitOrderInfo,
  checkOrderInfo,
  getOrderQueueInfo,
  confirmOrderQueue
}
