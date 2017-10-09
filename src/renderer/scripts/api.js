import Vue from 'vue'

const urls = {
  getCaptcha: `/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand&${Math.random()}`, // GET
  checkCaptcha: '/passport/captcha/captcha-check', // POST
  getTicket: '/otn/leftTicket/queryX' // GET
}

/**
 * 查询车次
 * @param {*} fromCity 出发地
 * @param {*} toCity 目的地
 * @param {*} trainDate 乘车日期
 */
const getTicket = (fromCity, toCity, trainDate) => {
  return Vue.http.get(urls.getTicket, {
    params: {
      'leftTicketDTO.train_date': trainDate,
      'leftTicketDTO.from_station': fromCity,
      'leftTicketDTO.to_station': toCity,
      'purpose_codes': 'ADULT'
    }
  })
}

export default {
  getTicket
}
