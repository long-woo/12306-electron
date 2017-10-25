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
  loginModel: state => state.loginModel,
  seatItems: state => state.seatItems
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
    if (loginModel.rememberme) {
      let models = utils.getLoginModel()

      models.map((item, index) => {
        if (item.userName === loginModel.userName) {
          return models.splice(index, 1)
        }
      })

      // 保存
      models.push(loginModel)
      utils.setLoginModel(models)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
