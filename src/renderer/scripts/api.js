import Vue from 'vue'

const urls = {
  getCaptcha: `/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand&${Math.random()}`, // GET
  checkCaptcha: '/passport/captcha/captcha-check', // POST
  login: '/passport/web/login', // POST
  loginAuthuam: '/passport/web/auth/uamtk', // POST
  loginAuthClient: '/otn/uamauthclient', // POST
  chkeckIsLogin: '/otn/login/checkUser', // POST
  getStationName: '/otn/resources/js/framework/station_name.js', // GET
  getQueryUrl: '/otn/leftTicket/query1', // GET
  getTicket: '/otn/', // GET
  getPassengers: '/otn/passengers/query' // POST
}

/**
 * 获取站名
 */
const getStationName = async () => {
  const res = await Vue.http.get(urls.getStationName)
  const stationName = res.substring(res.indexOf('\'') + 1, res.lastIndexOf('\''))
  const arrStation = stationName.split('@')
  let cityNames = []

  arrStation.map((staion) => {
    if (staion) {
      const [, cityText, cityCode, fullPY, firstPY] = staion.split('|')
      cityNames.push({text: cityText, value: cityCode, firstPY: firstPY, fullPY: fullPY})
    }
  })

  return cityNames
}

/**
 * 获取查询的url
 */
const getQueryUrl = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return Vue.http.get(urls.getQueryUrl, {
    params: {
      'leftTicketDTO.train_date': `${year}-${month}-${day}`,
      'leftTicketDTO.from_station': 'SHH',
      'leftTicketDTO.to_station': 'CSQ',
      'purpose_codes': 'ADULT'
    }
  })
}

/**
 * 查询车次
 * @param {*} fromCity 出发地
 * @param {*} toCity 目的地
 * @param {*} trainDate 乘车日期
 */
const getTicket = async (fromCity, toCity, trainDate) => {
  const {data} = await Vue.http.get(`${urls.getTicket}${Vue.store.getters.queryUrl}`, {
    params: {
      'leftTicketDTO.train_date': trainDate,
      'leftTicketDTO.from_station': fromCity,
      'leftTicketDTO.to_station': toCity,
      'purpose_codes': 'ADULT'
    }
  })
  const result = data.result || []
  const stationNames = data.map || []
  let ticketData = []

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
      seatTypeCodes: common.getSeatTypeCode(arrTrain[35]),
      seatTypes: common.getSeatTypes(arrTrain),
      secret: arrTrain[0],
      remark: arrTrain[1]
    })
  })

  return ticketData
}

/**
 * 获取图片验证码
 */
const getCaptchaCode = async () => {
  const res = await Vue.http.get(urls.getCaptcha, {
    responseType: 'arraybuffer'
  })

  return `data:image/jpeg;base64,${Buffer.from(res).toString('base64')}`
}

/**
 * 校验验证码
 * @param {*} code 验证码
 */
const validCaptchaCode = (code) => {
  let formData = {
    answer: code,
    login_site: 'E',
    rand: 'sjrand'
  }

  return Vue.http.post(urls.checkCaptcha, formData)
}

/**
 * 登录
 * @param {*} formData 表单数据
 */
const login = async (formData) => {
  formData.appid = 'otn'

  let loginResult = {}
  let res = await Vue.http.post(urls.login, formData)

  if (res.result_code !== 0) {
    loginResult.code = 0
    loginResult.message = res.result_message

    return loginResult
  }

  loginResult = await common.loginAuth()

  return loginResult
}

/**
 * 获取乘客
 * @param {*} name 乘客名
 * @param {*} pageIndex 当前页
 * @param {*} pageCount 每页数
 */
const getPassengers = async (name, pageIndex, pageCount) => {
  let formData = {
    pageIndex: pageIndex || 1,
    pageSize: pageCount || 10
  }

  if (name) {
    formData['passengerDTO.passenger_name'] = name
  }

  const res = await Vue.http.post(urls.getPassengers, formData)

  if (!res.data) {
    return []
  }

  return res.data.datas || []
}

/**
 * 检查是否登录
 */
const chkeckIsLogin = async () => {
  let loginResult = {}
  const {data} = await Vue.http.post(urls.chkeckIsLogin)
  let res = data.flag || false

  if (!res) {
    loginResult.code = 0
    loginResult.message = '用户未登录'
    return loginResult
  }

  loginResult = await common.loginAuth()

  return loginResult
}

const common = {
  // 获取座位代码
  getSeatTypeCode (seatTypeCodes) {
    // 存在两个“1”时，第一个“1”改成“W”
    const seatCodes = seatTypeCodes.replace(/(1)/, 'W').split('')

    return seatCodes
  },
  // 获取座位信息
  getSeatTypes (trains) {
    const seatCodes = this.getSeatTypeCode(trains[35])
    let arrSeatInfo = []

    seatCodes.map(val => {
      const seatDetail = this.getSeatTypeInfo(val, trains)

      arrSeatInfo.push({ seatTypeCode: val, seatTypeDetail: seatDetail })
    })

    return arrSeatInfo
  },
  // 获取座位类型
  getSeatTypeInfo (seatTypeCode, seatTypes) {
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
  },
  // 登录授权
  async loginAuth () {
    const loginResult = {}
    let res = await Vue.http.post(urls.loginAuthuam, {appid: 'otn'})

    if (res.result_code !== 0) {
      loginResult.code = 0
      loginResult.message = res.result_message

      return loginResult
    }

    let loginTicket = res.newapptk

    res = await Vue.http.post(urls.loginAuthClient, {tk: loginTicket})

    if (res.result_code !== 0) {
      loginResult.code = 0
      loginResult.message = res.result_message

      return loginResult
    }

    loginResult.ticket = res.apptk
    loginResult.loginName = res.username
    loginResult.code = 1
    loginResult.message = '登录成功'

    return loginResult
  }
}

export default {
  getStationName,
  getQueryUrl,
  getTicket,
  getSeatTypeInfo: common.getSeatTypeInfo,
  getCaptchaCode,
  validCaptchaCode,
  login,
  getPassengers,
  chkeckIsLogin
}
