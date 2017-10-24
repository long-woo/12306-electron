import * as types from '../mutations_type'
import utils from '../../scripts/utils'

const state = {
  queryUrl: 'query',
  stationNames: [],
  loginModel: null,
  seatItems: [
    {text: '观光座', code: 'Q'},
    {text: '商务座', code: '9'},
    {text: '特等座', code: 'P'},
    {text: '一等包座', code: 'S'},
    {text: '一等座', code: 'M'},
    {text: '二等座', code: 'O'},
    {text: '高级软卧', code: '6'},
    {text: '软卧', code: '4'},
    {text: '硬卧', code: '3'},
    {text: '软座', code: '2'},
    {text: '硬座', code: '1'},
    {text: '无座', code: 'W'},
    {text: '其他', code: ''}
  ]
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
    if (loginModel) {
      let models = utils.getLoginModel()

      for (let i = 0; i < models.length; i++) {
        if (models[i].userName === loginModel.userName) {
          models.splice(i, 1)
          break
        }
      }

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
