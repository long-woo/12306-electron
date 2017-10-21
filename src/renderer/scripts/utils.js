/**
 * 获取登录用户
 * @param {*} userName 账号
 */
const getLoginModel = (userName) => {
  const model = localStorage.LOGINMODEL || null
  const data = JSON.parse(model) || []

  if (userName) {
    return data.filter(item => item.userName === userName)
  }

  return data
}

/**
 * 保存登录用户
 * @param {*} model 登录信息
 */
const setLoginModel = (model) => {
  model = JSON.stringify(model)

  if (localStorage.LOGINMODEL) {
    localStorage.LOGINMODEL = model
  } else {
    localStorage.setItem('LOGINMODEL', model)
  }
}

export default {
  getLoginModel,
  setLoginModel
}
