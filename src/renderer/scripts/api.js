import Vue from 'vue'

const urls = {
  getCaptcha: `/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand&${Math.random()}`, // GET
  checkCaptcha: '/passport/captcha/captcha-check', // POST
  getStationName: '/otn/resources/js/framework/station_name.js', // GET
  getQueryUrl: '/otn/leftTicket/query1', // GET
  getTicket: '/otn/' // GET
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

    seatCodes.map((val, idx) => {
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
  }
}

export default {
  getStationName,
  getQueryUrl,
  getTicket
}
