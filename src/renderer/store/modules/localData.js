import * as types from '../mutations_type'
import utils from '../../utils/utils'

const state = {
  queryUrl: 'query',
  queryInfo: {},
  stationNames: [],
  loginModel: null,
  taskData: null,
  confirmOrderData: {},
  orderCount: 0
}

const getters = {
  queryUrl: state => state.queryUrl,
  queryInfo: state => state.queryInfo,
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
  setQueryInfo ({commit, state}, queryInfo) {
    commit(types.UPDATE_LOCAL_QUERYINFO, queryInfo)
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
  setTaskCurrentTrain ({commit, state}, currentTrain) {
    commit(types.UPDATE_LOCAL_TASKCURRENTTRAIN, currentTrain)
  },
  deleteTaskData ({commit, state}) {
    commit(types.REMOVE_LOCAL_TASKDATA)
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
  [types.UPDATE_LOCAL_QUERYINFO] (state, queryInfo) {
    state.queryInfo = queryInfo
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
    state.taskData = taskData
  },
  [types.UPDATE_LOCAL_TASKDATASTATUS] (state, text) {
    const taskItem = state.taskData

    if (!taskItem) return

    taskItem.statusText = text
  },
  [types.UPDATE_LOCAL_TASKCURRENTTRAIN] (state, currentTrain) {
    const taskData = state.taskData

    if (!taskData) return

    taskData.currentTrain = currentTrain
  },
  [types.REMOVE_LOCAL_TASKDATA] (state) {
    state.taskData = null
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
