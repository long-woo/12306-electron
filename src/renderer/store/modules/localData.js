import * as types from '../mutations_type'
import utils from '../../scripts/utils'

const state = {
  queryUrl: 'query',
  stationNames: [],
  loginModel: null,
  taskData: [],
  confirmOrderData: {},
  orderCount: 0
}

const getters = {
  queryUrl: state => state.queryUrl,
  stationNames: state => state.stationNames,
  loginModel: state => state.loginModel,
  seatItems: state => state.seatItems,
  taskData: state => state.taskData,
  confirmOrderData: state => state.confirmOrderData,
  orderCount: state => state.orderCount
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
  },
  setTaskData ({commit, state}, taskData) {
    commit(types.UPDATE_LOCAL_TASKDATA, taskData)
  },
  setTaskDataStatus ({commit, state}, taskStatusInfo) {
    commit(types.UPDATE_LOCAL_TASKDATASTATUS, taskStatusInfo)
  },
  deleteTaskData ({commit, state}, index) {
    commit(types.REMOVE_LOCAL_TASKDATA, index)
  },
  setConfirmOrderData ({commit, state}, confirmOrderData) {
    commit(types.UPDATE_LOCAL_CONFIRMORDERDATA, confirmOrderData)
  },
  setOrderCount ({commit, state}, orderCount) {
    commit(types.UPDATE_LOCAL_ORDERCOUNT, orderCount)
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
  },
  [types.UPDATE_LOCAL_TASKDATA] (state, taskData) {
    state.taskData.push(taskData)
  },
  [types.UPDATE_LOCAL_TASKDATASTATUS] (state, {index, text}) {
    const taskItem = state.taskData[index]

    if (!taskItem) return
    taskItem.statusText = text
  },
  [types.REMOVE_LOCAL_TASKDATA] (state, index) {
    state.taskData.splice(index, 1)
  },
  [types.UPDATE_LOCAL_CONFIRMORDERDATA] (state, confirmOrderData) {
    state.confirmOrderData = confirmOrderData
  },
  [types.UPDATE_LOCAL_ORDERCOUNT] (state, orderCount) {
    state.orderCount = orderCount
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
