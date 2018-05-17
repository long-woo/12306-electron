const urls = {
  initPage: '/otn/leftTicket/init', // GET
  getCaptchaCode: `/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand&${Math.random()}`, // GET
  checkCaptchaCode: '/passport/captcha/captcha-check', // POST
  login: '/passport/web/login', // POST
  loginAuthuam: '/passport/web/auth/uamtk', // POST
  loginAuthClient: '/otn/uamauthclient', // POST
  chkeckIsLogin: '/otn/login/checkUser', // POST
  logOff: '/otn/login/loginOut', // GET
  getStationName: '/otn/resources/js/framework/station_name.js', // GET
  getTicket: '/otn/', // GET
  getPassengers: '/otn/confirmPassenger/getPassengerDTOs', // POST
  // getPassengers: '/otn/passengers/query', // POST

  autoSubmitOrder: '/otn/confirmPassenger/autoSubmitOrderRequest', // POST
  getOrderQueueInfoAsync: '/otn/confirmPassenger/getQueueCountAsync', // POST
  confirmOrderQueueAsync: '/otn/confirmPassenger/confirmSingleForQueueAsys', // POST

  submitOrder: '/otn/leftTicket/submitOrderRequest', // POST
  getSubmitOrderInfo: '/otn/confirmPassenger/initDc', // POST
  checkOrderInfo: '/otn/confirmPassenger/checkOrderInfo', // POST
  getOrderQueueInfo: '/otn/confirmPassenger/getQueueCount', // POST
  confirmOrderQueue: '/otn/confirmPassenger/confirmSingleForQueue', // POST

  getOrderCaptchaCode: `/otn/passcodeNew/getPassCodeNew?module=passenger&rand=randp&${Math.random()}`, // GET
  checkOrderCaptchaCode: '/otn/passcodeNew/checkRandCodeAnsyn', // POST
  getOrderAwaitTime: `/otn/confirmPassenger/queryOrderWaitTime`, // GET
  getMyOrder: '/otn/queryOrder/queryMyOrderNoComplete' // POST
}

export default {
  urls
}
