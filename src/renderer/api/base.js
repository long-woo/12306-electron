import axios from '../utils/http'
import config from '../utils/config'

class BaseContent {
  /**
   * 返回结果
   * @param {*} data 数据内容
   * @param {*} param1 结果状态/消息
   */
  constructor (data, {message = '请求成功', code = 200} = {}) {
    this.code = code
    this.data = data
    this.message = message
  }

  /**
   * 获取站名
   */
  static async getStationName () {
    const res = await axios.get(config.urls.getStationName)
    const stationName = res.substring(res.indexOf('\'') + 1, res.lastIndexOf('\''))
    const arrStation = stationName.split('@')
    let cityNames = []

    arrStation.map((staion) => {
      if (staion) {
        const [, cityText, cityCode, fullPY, firstPY] = staion.split('|')
        cityNames.push({text: cityText, value: cityCode, firstPY: firstPY, fullPY: fullPY})
      }
    })

    return this._baseContent(cityNames)
  }

  /**
   * 获取查询的url
   */
  static async getQueryUrl () {
    const res = await axios.get(config.urls.initPage)
    const regexTicketUrl = res.match(/CLeftTicketUrl\s+=\s+'(.+)'/) || []
    const queryUrl = regexTicketUrl.length ? regexTicketUrl[1] : ''

    return this._baseContent(queryUrl)
  }

  /**
   * 查询车次
   * @param {*} formData (queryUrl、trainDate、fromCity、toCity)
   */
  static async getTicket (formData) {
    const {data} = await axios.get(`${config.urls.getTicket}${formData.queryUrl}`, {
      params: {
        'leftTicketDTO.train_date': formData.trainDate,
        'leftTicketDTO.from_station': formData.fromCity,
        'leftTicketDTO.to_station': formData.toCity,
        'purpose_codes': 'ADULT'
      }
    })
    let ticketData = []

    if (!data) return this._baseContent(ticketData)

    const result = data.result || []
    const stationNames = data.map || []

    result.map((val, inx) => {
      const arrTrain = val.split('|')
      const trainCode = arrTrain[3]

      ticketData.push({
        _rowVariant: arrTrain[11] !== 'Y' ? 'danger' : '',
        tranType: trainCode.substr(0, 1),
        trainNo: arrTrain[2],
        trainCode: trainCode,
        fromCityCode: arrTrain[6],
        fromCityName: stationNames[arrTrain[6]],
        toCityCode: arrTrain[7],
        toCityName: stationNames[arrTrain[7]],
        departureTime: arrTrain[8],
        arrivalTime: arrTrain[9],
        useTime: arrTrain[10],
        isBuy: arrTrain[11] === 'Y',
        ypInfo: arrTrain[12],
        locationCode: arrTrain[15],
        seatTypeCodes: this._getSeatTypeCode(arrTrain[35]),
        seatTypes: this._getSeatTypes(arrTrain),
        secret: arrTrain[0],
        remark: arrTrain[1]
      })
    })

    return this._baseContent(ticketData)
  }

  /**
   * 获取图片验证码
   * @param {*} type 验证码类型，默认为登录
   */
  static async getCaptchaCode (type) {
    const url = type === 'order' ? config.urls.getOrderCaptchaCode : config.urls.getCaptchaCode
    const res = await axios.get(url, {
      responseType: 'arraybuffer'
    })
    const data = res.toString().indexOf('Error') > -1 ? '' : `data:image/jpeg;base64,${Buffer.from(res).toString('base64')}`

    return this._baseContent(data)
  }

  /**
   * 校验验证码
   * @param {*} code 验证码
   * @param {*} type 验证码类型，默认为登录
   */
  static async validCaptchaCode (verifyCode, type) {
    let formData = {}
    const url = type === 'order' ? config.urls.checkOrderCaptchaCode : config.urls.checkCaptchaCode

    if (type === 'order') {
      formData.randCode = verifyCode
      formData.rand = 'randp'
    } else {
      formData.answer = verifyCode
      formData.login_site = 'E'
      formData.rand = 'sjrand'
    }

    const res = await axios.post(url, formData)
    let code = 400
    let message = '验证码错误'

    if (type === 'login') {
      if (res.result_code !== '4') {
        message = res.result_message
        return this._baseContent(null, {message, code})
      }
    }

    if (type === 'order') {
      const data = res.data

      if (data.result !== '1') {
        message = data.msg === 'FALSE' ? '验证码不正确' : data.msg

        return this._baseContent(null, {message, code})
      }
    }

    message = '验证通过'
    return this._baseContent(null, {message})
  }

  /**
   * 获取座位信息
   * @param {*} seatTypeCode
   * @param {*} seatTypes
   */
  static getSeatTypeInfo (seatTypeCode, seatTypes) {
    switch (seatTypeCode) {
      case 'Q':
        return seatTypes ? `观光座（${seatTypes[20]}）` : '观光座'
      case '9':
        return seatTypes ? `商务座（${seatTypes[32]}）` : '商务座'
      case 'P':
        return seatTypes ? `特等座（${seatTypes[25]}）` : '特等座'
      case 'S':
        return seatTypes ? `一等包座（${seatTypes[27]}）` : '一等包座'
      case 'M':
        return seatTypes ? `一等座（${seatTypes[31]}）` : '一等座'
      case 'O':
        return seatTypes ? `二等座（${seatTypes[30]}）` : '二等座'
      case '6':
        return seatTypes ? `高级软卧（${seatTypes[21]}）` : '高级软卧'
      case '4':
        return seatTypes ? `软卧（${seatTypes[23]}）` : '软卧'
      case '3':
        return seatTypes ? `硬卧（${seatTypes[28]}）` : '硬卧'
      case '2':
        return seatTypes ? `软座（${seatTypes[24]}）` : '软座'
      case '1':
        return seatTypes ? `硬座（${seatTypes[29]}）` : '硬座'
      case 'W':
        return seatTypes ? `无座（${seatTypes[26]}）` : '无座'
      default:
        return seatTypes ? `其他（${seatTypes[22]}）` : '其他'
    }
  }

  /**
   * 存在两个“1”时，第一个“1”改成“W”
   * @param {*} seatTypeCodes
   */
  static _getSeatTypeCode (seatTypeCodes) {
    const seatCodes = seatTypeCodes.replace(/(1)/, 'W').split('')

    return seatCodes
  }

  /**
   * 获取座位类型
   * @param {*} trains
   */
  static _getSeatTypes (trains) {
    const seatCodes = this._getSeatTypeCode(trains[35])
    let arrSeatInfo = []

    seatCodes.map(val => {
      const seatDetail = this.getSeatTypeInfo(val, trains)

      arrSeatInfo.push({ seatTypeCode: val, seatTypeDetail: seatDetail })
    })

    return arrSeatInfo
  }

  static _baseContent (data, {message = '请求成功', code = 200} = {}) {
    return new BaseContent(data, {message, code})
  }
}

export default BaseContent
