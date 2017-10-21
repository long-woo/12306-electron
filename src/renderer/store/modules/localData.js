import * as types from '../mutations_type'
import utils from '../../scripts/utils'

const state = {
  queryUrl: 'query',
  stationNames: [],
  loginModel: null
}

const getters = {
  queryUrl: state => state.queryUrl,
  stationNames: state => state.stationNames,
  loginModel: state => state.loginModel
}

const actions = {
  setQueryUrl ({commit, state}, queryUrl) {
    commit(types.UPDATE_LOCAL_QUERYURL, queryUrl)
  },
  setStationName ({commit, state}, stationNames) {
    commit(types.UPDATE_LOCAL_STATIONNAME, stationNames)
  },
  setLoginModel ({commit, state}, loginModel) {
    commit(types.UPDATE_LOCAL_LOGINMODEL, loginModel)
  }
}

const mutations = {
  [types.UPDATE_LOCAL_QUERYURL] (state, queryUrl) {
    state.queryUrl = queryUrl
  },
  [types.UPDATE_LOCAL_STATIONNAME] (state, stationNames) {
    state.stationNames = stationNames
  },
  [types.UPDATE_LOCAL_LOGINMODEL] (state, loginModel) {
    state.loginModel = loginModel

    // 保存到localStoreage
    if (loginModel) {
      let models = utils.getLoginModel()
      const model = models.filter(item => item.userName === loginModel.userName)

      if (model.length) {
        model[0].password = loginModel.password
        model[0].rememberme = loginModel.rememberme
        model[0].autoLogin = loginModel.autoLogin
      } else {
        models.push(loginModel)
        utils.setLoginModel(models)
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
