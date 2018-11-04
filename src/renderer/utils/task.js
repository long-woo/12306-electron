import Vue from 'vue'
import utils from './utils'

const _setStatus = Symbol('_setStatus')
const _setCurrentTrain = Symbol('_setCurrentTrain')
const _isHasTicket = Symbol('_isHasTicket')
const _startSubmitOrder = Symbol('_startSubmitOrder')
const _submitOrder = Symbol('_submitOrder')
const _checkOrderInfo = Symbol('_checkOrderInfo')
const _getOrderQueueInfo = Symbol('_getOrderQueueInfo')
const _getOrderAwaitTime = Symbol('_getOrderAwaitTime')

const _startAutoSubmitOder = Symbol('_startAutoSubmitOder')
const _autoSubmitOrder = Symbol('_autoSubmitOrder')
const _getOrderQueueInfoAsync = Symbol('_getOrderQueueInfoAsync')

let timeout = 1

/**
 * 订单任务
 */
class OrderTask {
  /**
   * 开始任务
   */
  static start () {
    const taskItem = Vue.store.getters.taskData

    this.stop()

    this.startFunc = setInterval(async () => {
      this[_setStatus](`${timeout}秒后，开始查询...`)

      if (timeout <= 0) {
        this.stop() // 暂停计时器

        // 开始查询
        const {fromCityCode, toCityCode, trainDate, ticketType} = taskItem.queryInfo
        const formData = {
          queryUrl: Vue.store.getters.queryUrl,
          fromCity: fromCityCode,
          toCity: toCityCode,
          trainDate,
          ticketType
        }

        this[_setStatus]('正在查询...')

        const {data} = await Vue.api.base.getTicket(formData)

        // 更新列表车次数据
        Vue.eventBus.$emit('updateTicketData', data)

        let trainSeats = [] // 有票数的座位
        // 检查匹配车次是否符合预订条件
        let trainData = data.reduce((prev, current) => {
          if (taskItem.trains.indexOf(current.trainCode) > -1) {
            const arrPassenger = taskItem.passengers.passengerName.split(',')
            const seatItems = this[_isHasTicket](taskItem.seats, current.seatTypes, arrPassenger)
            const arrSeat = trainSeats.concat(seatItems)

            trainSeats = [...new Set(arrSeat)]

            prev.push(current)
          }

          return prev
        }, [])

        // 如果没有符合预订条件的车次，则继续启动任务
        if (!trainData.length) {
          this.start()

          return
        }

        // 开始准备提交订单
        this[_setStatus]('正在开始准备提交订单...')
        utils.notification.show('提示', {
          body: `【任务】正在执行提交订单`,
          tag: 'order'
        })
        this[_startSubmitOrder](trainData, trainSeats, taskItem)

        return
      }

      timeout = parseFloat(timeout - 0.1).toFixed(1)
    }, 100)
  }

  /**
   * 停止任务
   */
  static stop () {
    timeout = 1
    clearInterval(this.startFunc)
  }

  /**
   * 停止订单出票时间任务
   */
  static stopOrderAwaitFunc () {
    clearInterval(this.startOrderAwaitFunc)
  }

  /**
   * 设置任务状态
   * @param {*} text 状态内容
   */
  static [_setStatus] (text) {
    Vue.store.dispatch('setTaskDataStatus', text)
  }

  /**
   * 更新任务数据，当前预订车次信息
   * @param {*} train
   * @param {*} seatText
   */
  static [_setCurrentTrain] (train, seatText) {
    const {trainCode, fromCityName, toCityName, departureTime, arrivalTime, useTime} = train.trainCode
    const currentTrain = {
      trainCode,
      fromCityName,
      toCityName,
      departureTime,
      arrivalTime,
      useTime,
      seatText
    }

    Vue.store.dispatch('setTaskCurrentTrain', currentTrain)
  }

  /**
   * 检查是否有票
   * @param {*} chkSeats 选择的座位
   * @param {*} seatTypes 车次的座位
   * @param {*} arrPassenger 乘客
   */
  static [_isHasTicket] (chkSeats, seatTypes, arrPassenger) {
    const passengerCount = arrPassenger.length

    let result = chkSeats.reduce((prevValue, currentValue) => {
      const trainSeat = seatTypes.find(t => t.seatTypeCode === currentValue)

      if (!trainSeat) return []

      const ticketRemark = trainSeat.seatTypeDetail
      let ticketCount = ticketRemark.match(/（(.+)）/)[1]

      ticketCount = Number(ticketCount)
      if ('有'.indexOf(ticketCount.toString()) > -1 || (!Number.isNaN(ticketCount) && ticketCount >= passengerCount)) {
        prevValue.push(currentValue)
      }

      return prevValue
    }, [])

    return result
  }

  /**
   * 开始提交订单
   * @param {*} trainData 车次
   * @param {*} trainSeats 座位
   * @param {*} taskItem 任务项
   */
  static async [_startSubmitOrder] (trainData, trainSeats, taskItem) {
    const queryInfo = taskItem.queryInfo
    const passengers = taskItem.passengers
    const chooseSeats = taskItem.chooseSeats
    let isStop = false // 是否终止提交（当未登录）
    let title = '提示'
    let content = '哎呀！！！被挤下线了，请重新登录'

    for (let train of trainData) {
      if (isStop) return

      for (let seatCode of trainSeats) {
        const seatText = Vue.api.base.getSeatTypeInfo(seatCode)

        // 提交订单
        this[_setStatus](`正在预订【${train.trainCode}】车次的【${seatText}】...`)
        this[_setCurrentTrain](train, seatText)
        console.log('123')
        isStop = true
        if (isStop) return

        const orderResult = await this[_submitOrder](train.secret, queryInfo)

        if (orderResult.code !== 200) {
          this[_setStatus](`【${train.trainCode}】车次的【${seatText}】预订失败`)
          Vue.alert(orderResult.message)

          continue
        }

        const orderResultData = orderResult.data

        // 检查订单
        this[_setStatus](`【${train.trainCode}】车次的【${seatText}】正在检查订单信息...`)
        const checkResult = await this[_checkOrderInfo](passengers, orderResultData.orderToken, '', seatCode)

        if (checkResult.code !== 200) {
          this[_setStatus](`【${train.trainCode}】车次的【${seatText}无法提交订单`)
          Vue.alert(checkResult.message)

          if (checkResult.message.indexOf('登录') > -1) {
            this[_setStatus]('您的登录状态已失效，请重新登录')
            Vue.eventBus.$emit('openDialog', 'loginModal')
            utils.notification.show(title, {
              body: content,
              tag: 'order'
            })

            isStop = true
            return
          }
          continue
        }

        const awaitTime = parseInt(checkResult.captchaCodeTime)

        // 是否要验证码
        if (checkResult.isCaptchaCode) {
          // 将确认提交订单的数据存储到store
          const orderData = {
            train,
            seatCode,
            passengers,
            key: orderResultData.orderKey,
            token: orderResultData.orderToken,
            awaitTime,
            chooseSeats
          }

          Vue.store.dispatch('setConfirmOrderData', orderData)
          content = `正在预订【${train.trainCode}】车次【${seatText}】，请选择验证码`
          this[_setStatus](`正在预订【${train.trainCode}】车次【${seatText}】，等待选择验证码...`)
          Vue.eventBus.$emit('openDialog', 'captchCodeModal')
          utils.notification.show(title, {
            body: content,
            tag: 'order'
          })

          isStop = true
          return
        }

        // 获取订单排队信息
        this[_setStatus](`【${train.trainCode}】车次的【${seatText}】正在排队...`)
        const queueResult = await this[_getOrderQueueInfo](train, queryInfo.trainDate, seatCode, orderResultData.orderToken)

        if (queueResult.code !== 200) {
          this[_setStatus](`队伍太长，【${train.trainCode}】车次的【${seatText}】没能挤进去`)
          Vue.alert(queueResult.message)

          if (queueResult.message.indexOf('登录') > -1) {
            this[_setStatus]('您的登录状态已失效，请重新登录')
            Vue.eventBus.$emit('openDialog', 'loginModal')
            utils.notification.show(title, {
              body: content,
              tag: 'order'
            })

            isStop = true
            return
          }
          continue
        }

        // 确认提交订单（不需要验证码）
        const confirmResult = await this.confirmOrderQueue(train, passengers, orderResultData.orderKey, orderResultData.orderToken, seatCode, '', awaitTime, chooseSeats)

        if (confirmResult.code < 1) {
          if (confirmResult.code === 0) {
            isStop = true
            return
          }
          continue
        }
      }
    }
  }

  /**
   * 提交订单
   * @param {*} trainSecret 车次凭证
   * @param {*} queryInfo 查询信息
   */
  static [_submitOrder] (trainSecret, queryInfo) {
    const currentDate = new Date()
    const formData = {
      secretStr: decodeURIComponent(trainSecret),
      train_date: queryInfo.trainDate,
      back_train_date: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)}-${currentDate.getDate()}`,
      query_from_station_name: queryInfo.fromCityName,
      query_to_station_name: queryInfo.toCityName,
      ticketType: queryInfo.ticketType
    }

    return Vue.api.order.submitOrder(formData)
  }

  /**
   * 检查订单
   * @param {*} passengers 乘客
   * @param {*} token 订单token
   * @param {*} captchCode 验证码
   */
  static [_checkOrderInfo] (passengers, token, captchCode, seatCode) {
    const formData = {
      passengerTicketStr: passengers.passengerTickets.replace(/(seatcode)/gi, seatCode),
      oldPassengerStr: passengers.oldPassengers,
      REPEAT_SUBMIT_TOKEN: token,
      randCode: captchCode
    }

    return Vue.api.order.checkOrderInfo(formData)
  }

  /**
   * 获取提交订单队列信息
   * @param {*} train 车次
   * @param {*} trainDate 乘车日期
   * @param {*} seatCode 座位code
   * @param {*} token token
   */
  static [_getOrderQueueInfo] (train, trainDate, seatCode, token) {
    const currentDate = new Date()
    const arrDate = trainDate.split('-')

    currentDate.setFullYear(arrDate[0], arrDate[1] - 1, arrDate[2])

    const formData = {
      train_date: currentDate.toString(),
      train_no: train.trainNo,
      stationTrainCode: train.trainCode,
      seatType: seatCode,
      fromStationTelecode: train.fromCityCode,
      toStationTelecode: train.toCityCode,
      leftTicket: train.ypInfo,
      train_location: train.locationCode,
      REPEAT_SUBMIT_TOKEN: token
    }
    const seatText = Vue.api.base.getSeatTypeInfo(seatCode)

    return Vue.api.order.getOrderQueueInfo(formData, seatText)
  }

  /**
   * 确认提交订单
   * @param {*} train 车次
   * @param {*} passengers 乘客
   * @param {*} key key
   * @param {*} token token
   * @param {*} seatCode 座位code
   * @param {*} captchCode 验证码
   * @param {*} awaitTime 提交订单的等待时间
   * @param {*} chooseSeats 选择的座位
   */
  static async confirmOrderQueue (train, passengers, key, token, seatCode, captchCode, awaitTime, chooseSeats) {
    const seatText = Vue.api.base.getSeatTypeInfo(seatCode)
    const formData = {
      passengerTicketStr: passengers.passengerTickets.replace(/(seatcode)/gi, seatCode),
      oldPassengerStr: passengers.oldPassengers,
      randCode: captchCode,
      key_check_isChange: key,
      leftTicketStr: train.ypInfo,
      train_location: train.locationCode,
      choose_seats: chooseSeats, // 选座
      seatDetailType: '', // 选铺
      REPEAT_SUBMIT_TOKEN: token
    }

    this[_setStatus](`正在确认提交【${train.trainCode}】车次【${seatText}】...`)
    // 由于12306提交订单的安全周期问题，需要等待一定时间
    await utils.sleep(awaitTime)

    let res = await Vue.api.order.confirmOrderQueue(formData)
    let data = {}

    if (res.code !== 200) {
      this[_setStatus](`【${train.trainCode}】车次【${seatText}】预订失败...`)
      Vue.alert(res.message)

      if (res.message.indexOf('登录') > -1) {
        this[_setStatus]('您的登录状态已失效，请重新登录')
        Vue.eventBus.$emit('openDialog', 'loginModal')
        utils.notification.show('提示', {
          body: '哎呀！！！被挤下线了，请重新登录',
          tag: 'order'
        })

        data.code = 0
        return data
      }

      data.code = -1
      return data
    }

    this[_setStatus](`【${train.trainCode}】车次【${seatText}】等待出票...`)
    // 获取订单出票时间
    return this[_getOrderAwaitTime](train, seatText)
  }

  /**
   * 获取订单出票时间
   * @param {*} train 车次
   * @param {*} seatText 座位
   */
  static [_getOrderAwaitTime] (train, seatText) {
    return new Promise(resolve => {
      let data = {}
      let title = '提示'
      let content = '哎呀！！！被挤下线了，请重新登录'

      this.stopOrderAwaitFunc()

      this.startOrderAwaitFunc = setInterval(async () => {
        const res = await Vue.api.order.getOrderAwaitTime()

        if (res.code !== 200) {
          Vue.alert(res.message)

          if (res.message.indexOf('登录') > -1) {
            this.stopOrderAwaitFunc()

            this[_setStatus]('您的登录状态已失效，请重新登录')
            Vue.eventBus.$emit('openDialog', 'loginModal')
            utils.notification.show(title, {
              body: content,
              tag: 'order'
            })

            data.code = 0
            resolve(data)
          }

          if (res.message.indexOf('出票超时') > -1) {
            this.stopOrderAwaitFunc()

            this[_setStatus](`【${train.trainCode}】车次【${seatText}出票失败...`)
            utils.notification.show(title, {
              body: `【${train.trainCode}】出票失败！原因：${res.message}`,
              tag: 'order'
            })

            data.code = -2
            resolve(data)
          }

          data.code = -1
          resolve(data)
        }

        // 出票成功
        if (res.orderId) {
          const orderNo = res.orderId

          title = 'WOW，恭喜您抢到票了～'
          content = `您的订单号：【${orderNo}】，请在30分钟内完成支付`

          this.stopOrderAwaitFunc()
          utils.speech.textToSpeech(`${title}您的订单号：【${orderNo.replace(/\s*/g, '|')}】，请在30分钟内完成支付`)
          this[_setStatus](`【${train.trainCode}】车次【${seatText}】出票成功...`)
          Vue.swal({
            title: title,
            text: content,
            icon: 'success',
            button: '关闭'
          })
          utils.notification.show(title, {
            body: content
          })

          data.code = 1
          data.orderId = orderNo
          resolve(data)
        }
      }, 500)
    })
  }

  /**
   * 开始提交订单（自动提交）
   * @param {*} trainData 车次
   * @param {*} trainSeats 座位
   * @param {*} taskItem 任务项
   */
  static async [_startAutoSubmitOder] (trainData, trainSeats, taskItem) {
    const queryInfo = taskItem.queryInfo
    const passengers = taskItem.passengers
    let isStop = false // 是否终止提交（当未登录）
    let title = '提示'
    let content = '哎呀！！！被挤下线了，请重新登录'

    for (let train of trainData) {
      if (isStop) return

      for (let seatCode of trainSeats) {
        const seatText = Vue.api.base.getSeatTypeInfo(seatCode)

        // 提交订单
        this[_setStatus](`正在预订【${train.trainCode}】车次的【${seatText}】...`)
        const orderResult = await this[_autoSubmitOrder](train.secret, queryInfo, passengers, seatCode)

        if (orderResult.code !== 200) {
          this[_setStatus](`【${train.trainCode}】车次的【${seatText}】预订失败`)
          Vue.alert(orderResult.message)

          if (orderResult.message.indexOf('登录') > -1) {
            this[_setStatus]('您的登录状态已失效，请重新登录')
            Vue.eventBus.$emit('openDialog', 'loginModal')
            utils.notification.show(title, {
              body: content,
              tag: 'order'
            })

            isStop = true
            return
          }
          continue
        }

        // 获取订单排队信息
        this[_setStatus](`【${train.trainCode}】车次的【${seatText}】正在排队...`)
        const queueResult = await this[_getOrderQueueInfoAsync](train, queryInfo.trainDate, seatCode)

        if (queueResult.code !== 200) {
          this[_setStatus](`队伍太长，【${train.trainCode}】车次的【${seatText}】没能挤进去`)
          Vue.alert(queueResult.message)

          if (queueResult.message.indexOf('登录') > -1) {
            this[_setStatus]('您的登录状态已失效，请重新登录')
            Vue.eventBus.$emit('openDialog', 'loginModal')
            utils.notification.show(title, {
              body: content,
              tag: 'order'
            })

            isStop = true
            return
          }
          continue
        }

        const key = orderResult.ticketData[1]
        const awaitTime = parseInt(orderResult.captchaCodeTime)

        // 是否要验证码
        if (orderResult.isCaptchaCode) {
          // 将确认提交订单的数据存储到store
          const orderData = {
            train,
            seatCode,
            passengers,
            key,
            awaitTime
          }

          Vue.store.dispatch('setConfirmOrderData', orderData)
          content = `正在预订【${train.trainCode}】车次【${seatText}】，请选择验证码`
          this[_setStatus](`正在预订【${train.trainCode}】车次【${seatText}】，等待选择验证码...`)
          Vue.eventBus.$emit('openDialog', 'captchCodeModal')
          utils.notification.show(title, {
            body: content,
            tag: 'order'
          })

          isStop = true
          return
        }

        // 确认提交订单（不需要验证码）
        const confirmResult = await this.confirmOrderQueueAsync(train, seatCode, passengers, key, '', awaitTime)

        if (confirmResult.code < 1) {
          if (confirmResult.code === 0) {
            isStop = true
            return
          }
          continue
        }
      }
    }
  }

  /**
   * 自动提交订单
   * @param {*} trainSecret 车次凭证
   * @param {*} queryInfo 查询信息
   * @param {*} passengers 乘客信息
   * @param {*} seatCode 座位代码
   */
  static [_autoSubmitOrder] (trainSecret, queryInfo, passengers, seatCode) {
    const orderData = {
      secretStr: decodeURIComponent(trainSecret),
      train_date: queryInfo.trainDate,
      query_from_station_name: queryInfo.fromCityName,
      query_to_station_name: queryInfo.toCityName,
      passengerTicketStr: passengers.passengerTickets.replace(/(seatcode)/gi, seatCode),
      oldPassengerStr: passengers.oldPassengers,
      ticketType: queryInfo.ticketType
    }

    return Vue.api.order.autoSubmitOrder(orderData)
  }

  /**
   * 订单排队信息（自动提交）
   * @param {*} train 车次
   * @param {*} trainDate 乘车日期
   * @param {*} seatCode 座位代码
   */
  static [_getOrderQueueInfoAsync] (train, trainDate, seatCode) {
    const currentDate = new Date()
    const arrDate = trainDate.split('-')

    currentDate.setFullYear(arrDate[0], arrDate[1] - 1, arrDate[2])

    const queueData = {
      train_date: currentDate.toString(),
      train_no: train.trainNo,
      stationTrainCode: train.trainCode,
      seatType: seatCode,
      fromStationTelecode: train.fromCityCode,
      toStationTelecode: train.toCityCode,
      leftTicket: train.ypInfo
      // ticketType: queryInfo.ticketType
    }

    return Vue.api.order.getOrderQueueInfoAsync(queueData)
  }

  /**
   * 确认提交订单（自动提交）
   * @param {*} train 车次
   * @param {*} seatCode 座位代码
   * @param {*} passengers 乘客
   * @param {*} key key
   * @param {*} captchCode 验证码
   * @param {*} awaitTime 提交订单的等待时间
   */
  static async confirmOrderQueueAsync (train, seatCode, passengers, key, captchCode, awaitTime) {
    const seatText = Vue.api.base.getSeatTypeInfo(seatCode)
    const passengerTicket = passengers.passengerTickets.replace(/(seatcode)/gi, seatCode)
    const formData = {
      passengerTicketStr: passengerTicket,
      oldPassengerStr: passengers.oldPassengers,
      randCode: captchCode,
      purpose_codes: '',
      key_check_isChange: key,
      leftTicketStr: train.ypInfo,
      train_location: train.locationCode,
      choose_seats: '',
      seatDetailType: ''
    }

    this[_setStatus](`正在确认提交【${train.trainCode}】车次【${seatText}】...`)
    // 由于12306提交订单的安全周期问题，需要等待一定时间
    await this.sleep(awaitTime)

    let res = await Vue.api.order.confirmOrderQueueAsync(formData)
    let data = {}

    if (res.code !== 200) {
      this[_setStatus](`【${train.trainCode}】车次【${seatText}】预订失败...`)
      Vue.alert(res.message)

      if (res.message.indexOf('登录') > -1) {
        this[_setStatus]('您的登录状态已失效，请重新登录')
        Vue.eventBus.$emit('openDialog', 'loginModal')
        utils.notification.show('提示', {
          body: '哎呀！！！被挤下线了，请重新登录',
          tag: 'order'
        })

        data.code = 0
        return data
      }

      data.code = -1
      return data
    }

    this[_setStatus](`【${train.trainCode}】车次【${seatText}】等待出票...`)
    // 获取订单出票时间
    return this[_getOrderAwaitTime](train, seatText)
  }
}

export default OrderTask
