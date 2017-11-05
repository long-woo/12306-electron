import Vue from 'vue'

/**
 * 获取登录用户
 * @param {*} userName 账号
 */
const getLoginModel = (userName) => {
  const model = localStorage.LOGINMODEL || null
  const data = JSON.parse(model) || []

  if (userName) {
    return data.filter(item => item.userName === userName || item.loginName === userName) || []
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

/**
 * 任务
 */
const task = {
  startFunc: [],
  /**
   * 启动任务
   * @param {*} index 任务索引号
   */
  start (index) {
    this.stop(index)

    let timeout = 1
    const taskItem = Vue.store.getters.taskData[index]

    this.startFunc[index] = setInterval(async () => {
      this.setStatus(index, `${timeout}秒后，开始查询...`)

      if (timeout <= 0) {
        this.stop(index) // 暂停计时器
        timeout = 1
        // 开始查询
        const {fromCityCode, toCityCode, trainDate} = taskItem.queryInfo

        this.setStatus(index, '正在查询...')
        const res = await Vue.api.getTicket(fromCityCode, toCityCode, trainDate)
        let trainSeats = [] // 有票数的座位
        // 检查匹配车次是否符合预订条件
        let trainData = []

        res.forEach(train => {
          if (taskItem.trains.indexOf(train.trainCode) > -1) {
            const seatItems = this.isHasTicket(taskItem.seats, train.seatTypes)
            const arrSeat = trainSeats.concat(seatItems)
            console.log(seatItems)
            trainSeats = Array.from(new Set(arrSeat))

            if (!seatItems.length) return

            trainData.push(train)
          }
        })

        // 如果没有符合预订条件的车次，则继续启动任务
        if (!trainData.length) {
          this.start(index)
          return
        }

        // 开始准备提交订单
        this.setStatus(index, '正在开始准备提交订单...')
        this.startSubmitOder(trainData, trainSeats, taskItem)
        return
      }

      timeout = parseFloat(timeout - 0.1).toFixed(1)
    }, 100)
  },
  /**
   * 暂停任务
   * @param {*} index 任务索引号
   */
  stop (index) {
    clearInterval(this.startFunc[index])
  },
  /**
   * 检查是否有票
   * @param {*} chkSeats 选择的座位
   * @param {*} seatTypes 车次的座位
   */
  isHasTicket (chkSeats, seatTypes) {
    let result = []

    chkSeats.filter(s => {
      const trainSeat = seatTypes.find(t => t.seatTypeCode === s)

      if (!trainSeat) return

      const ticketCount = trainSeat.seatTypeDetail

      if (ticketCount.indexOf('无') < 0 && ticketCount.indexOf('-') < 0 && ticketCount.indexOf('*') < 0 && ticketCount.indexOf('0') < 0) {
        result.push(s)
      }
    })

    return result
  },
  /**
   * 设置任务状态
   * @param {*} index 任务索引号
   * @param {*} text 状态内容
   */
  setStatus (index, text) {
    const taskStatusInfo = {
      index,
      text
    }

    Vue.store.dispatch('setTaskDataStatus', taskStatusInfo)
  },
  /**
   * 开始提交订单
   * @param {*} trainData 车次
   * @param {*} trainSeats 座位
   * @param {*} taskItem 任务项
   */
  startSubmitOder (trainData, trainSeats, taskItem) {
    const queryInfo = taskItem.queryInfo
    const passengers = taskItem.passengers
    let isStop = false // 是否终止提交（当未登录）

    trainData.forEach(async (train) => {
      if (isStop) return

      for (let seatCode of trainSeats) {
        // 提交订单
        const orderResult = await this.submitOrder(train.secret, queryInfo, passengers, seatCode)

        if (orderResult.code < 1) {
          Vue.alert(orderResult.message)

          if (orderResult.message.indexOf('登录') > -1) {
            Vue.eventBus.$emit('openDialog', 'loginModal')
            isStop = true
            return
          }
          continue
        }

        // 获取订单排队信息
        const queueResult = await this.orderQueueInfo(train, queryInfo.trainDate, seatCode)
        Vue.alert(queueResult.message)

        if (queueResult.code < 1) {
          if (queueResult.message.indexOf('登录') > -1) {
            Vue.eventBus.$emit('openDialog', 'loginModal')
            isStop = true
            return
          }
          continue
        }

        // 是否要验证码
        if (orderResult.isCaptchaCode) {
          Vue.eventBus.$emit('openDialog', 'captchCodeModal')
          isStop = true
          return
        }

        // 确认提交订单（不需要验证码）
        const key = orderResult.ticketData[1]
        const confirmResult = await this.confirmSubmitOrder(train, seatCode, passengers, key, '')

        if (confirmResult.code < 1) {
          Vue.alert(confirmResult.message)

          if (confirmResult.message.indexOf('登录') > -1) {
            Vue.eventBus.$emit('openDialog', 'loginModal')
            isStop = true
            return
          }
        }
      }
    })
  },
  /**
   * 提交订单
   * @param {*} trainSecret 车次凭证
   * @param {*} queryInfo 查询信息
   * @param {*} passengers 乘客信息
   * @param {*} seatCode 座位代码
   */
  submitOrder (trainSecret, queryInfo, passengers, seatCode) {
    const orderData = {
      secretStr: trainSecret,
      train_date: queryInfo.trainDate,
      query_from_station_name: queryInfo.fromCityName,
      query_to_station_name: queryInfo.toCityName,
      passengerTicketStr: passengers.passengerTickets.replace(/(seatcode)/gi, seatCode),
      oldPassengerStr: passengers.oldPassengers
    }

    return Vue.api.autoSubmitOrder(orderData)
  },
  /**
   * 订单排队信息
   * @param {*} train 车次
   * @param {*} trainDate 乘车日期
   * @param {*} seatCode 座位代码
   */
  orderQueueInfo (train, trainDate, seatCode) {
    const currentDate = new Date()

    trainDate = `${trainDate} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`

    const queueData = {
      train_date: new Date(trainDate),
      train_no: train.trainNo,
      stationTrainCode: train.trainCode,
      seatType: seatCode,
      fromStationTelecode: train.fromCityCode,
      toStationTelecode: train.toCityCode,
      leftTicket: train.ypInfo
    }

    return Vue.api.getOrderQueueInfo(queueData)
  },
  /**
   * 确认提交订单
   * @param {*} train 车次
   * @param {*} seatCode 座位代码
   * @param {*} passengers 乘客
   * @param {*} key key
   * @param {*} captchCode 验证码
   */
  async confirmSubmitOrder (train, seatCode, passengers, key, captchCode) {
    const formData = {
      passengerTicketStr: passengers.passengerTickets.replace(/(seatcode)/gi, seatCode),
      oldPassengerStr: passengers.oldPassengers,
      randCode: captchCode,
      key_check_isChange: key,
      leftTicketStr: train.ypInfo,
      train_location: train.locationCode,
      choose_seats: '',
      seatDetailType: ''
    }

    let res = await Vue.api.confirmOrderQueue(formData)
    let data = {}
    let awaitTimeFunc = null

    if (res.code < 1) {
      Vue.alert(res.message)

      if (res.message.indexOf('登录') > -1) {
        Vue.eventBus.$emit('openDialog', 'loginModal')
        data.code = 0
        return data
      }

      data.code = -1
      return data
    }

    // 获取订单出票时间
    clearInterval(awaitTimeFunc)
    awaitTimeFunc = setInterval(async () => {
      res = await Vue.api.getOrderAwaitTime()

      if (res.code < 1) {
        clearInterval(awaitTimeFunc)
        Vue.alert(res.message)

        if (res.message.indexOf('登录') > -1) {
          Vue.eventBus.$emit('openDialog', 'loginModal')
          data.code = 0
          return data
        }

        data.code = -1
        return data
      }

      if (!res.orderId) {

      }
    }, 500)
  }
}

/**
 * 通知
 */
const notification = {
  notictice: null,
  /**
   * 显示通知
   * @param {*} title 通知标题
   * @param {*} option 通知配置
   */
  show (title, option) {
    title = title || '提示'
    option = Object.assign({
      body: '', // 通知内容
      // icon: null, // 通知中显示的图标的URL
      // image: null, // 通知中显示的图像的URL
      data: null, // 通知关联的任务类型的数据
      requireInteraction: false, // 通知保持有效不自动关闭，默认为false
      tag: null, // 识别标签，相同tag时只会打开同一个通知窗口
      timeout: 3000 // 自动关闭时间
    }, option)
    console.log(option)
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        // 允许
        this.notictice = new Notification(title, option)

        if (option.timeout > 0) {
          setTimeout(() => {
            this.notictice.close()
          }, option.timeout)
        }
      } else if (permission === 'denied') {
        // 拒绝
        Vue.alert('您拒绝了桌面通知')
      } else {
        Vue.alert('等待您允许桌面通知')
      }
    })
  },
  /**
   * 关闭通知
   */
  hide () {
    if (!this.notictice) return

    this.notictice.close()
  }
}

export default {
  getLoginModel,
  setLoginModel,
  task,
  notification
}
