import Vue from 'vue'

const urls = {
  getCaptcha: `/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand&${Math.random()}`, // GET
  checkCaptcha: '/passport/captcha/captcha-check', // POST
  getQueryUrl: '/otn/leftTicket/query1', // GET
  getTicket: '/otn/' // GET
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
const getTicket = (fromCity, toCity, trainDate) => {
  return Vue.http.get(`${urls.getTicket}${Vue.store.getters.queryUrl}`, {
    params: {
      'leftTicketDTO.train_date': trainDate,
      'leftTicketDTO.from_station': fromCity,
      'leftTicketDTO.to_station': toCity,
      'purpose_codes': 'ADULT'
    }
  })
}

export default {
  getQueryUrl,
  getTicket
}
