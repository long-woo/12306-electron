import * as types from '../mutations_type'

const state = {
  queryUrl: 'query',
  stationNames: []
}

const getters = {
  queryUrl: state => state.queryUrl,
  stationNames: state => state.stationNames
}

const actions = {
  setQueryUrl ({commit, state}, queryUrl) {
    commit(types.UPDATE_LOCAL_QUERYURL, queryUrl)
  },
  setStationName ({commit, state}, stationNames) {
    commit(types.UPDATE_LOCAL_STATIONNAME, stationNames)
  }
}

const mutations = {
  [types.UPDATE_LOCAL_QUERYURL] (state, queryUrl) {
    state.queryUrl = queryUrl
  },
  [types.UPDATE_LOCAL_STATIONNAME] (state, stationNames) {
    state.stationNames = stationNames
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
