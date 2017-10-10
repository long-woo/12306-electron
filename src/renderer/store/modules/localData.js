import * as types from '../mutations_type'

const state = {
  queryUrl: 'query'
}

const getters = {
  queryUrl: state => state.queryUrl
}

const actions = {
  setQueryUrl ({commit, state}, queryUrl) {
    commit(types.UPDATE_LOCAL_QUERYURL, queryUrl)
  }
}

const mutations = {
  [types.UPDATE_LOCAL_QUERYURL] (state, queryUrl) {
    state.queryUrl = queryUrl
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
