<template>
  <transition enter-active-class="ani-slide-left" leave-active-class="ani-slide-right">
    <div class="position-fixed container task-panel" v-show="showPanel">
      <div class="row p-2 border-b-dashed-1">
        <div class="checkbox icheck-info col-sm-4 pr-0" v-for="(item, index) in seatTypes" :key="index">
          <input type="checkbox" :id="`chk_seat_${index}`" v-model="chkSeatTypes" :value="item.code" />
          <label :for="`chk_seat_${index}`">{{item.text}}</label>
        </div>
        <div v-if="!seatTypes.length" class="text-center text-secondary col-md-12">请先选择车次</div>
      </div>
      <div class="row p-2">
        <div class="checkbox icheck-info col-sm-4 pr-0" v-for="(item, index) in passengers" :key="index">
          <input type="checkbox" :id="`chk_user_${item.first_letter}`" v-model="chkPassengers" :value="item" :disabled="passengerName.length > 4 && passengerName.indexOf(item.passenger_name) < 0" />
          <label :for="`chk_user_${item.first_letter}`" :title="item.passenger_name" v-b-tooltip.hover>{{item.passenger_name}}</label>
        </div>
        <div class="text-center text-secondary col-md-12" v-if="!passengers.length">请先登录</div>
      </div>
      <div class="task-panel-bottom">
        <div class="text-warning text-center tip-info">提示：选座功能仅支持C、D、G字头的动车组列车</div>
        <div class="d-flex flex-wrap text-center p-2 border-b-dashed-1">
          <div class="flex-fill" :class="{'ml-4': index === 3}" v-for="(item, index) in seatItem" :key="index">
            <a href="javascript:;" class="seat-item waves-effect" :class="{'active': item.checked}" @click="chooseSeat(item)">
              <i class="iconfont" :class="`icon-seat-${item.name}`"></i>
            </a>
          </div>
        </div>
        <div class="d-flex">
          <div class="checkbox icheck-info flex-fill p-2">
            <input type="checkbox" id="chk_ticket_type" v-model="chkTicketType" />
            <label for="chk_ticket_type">学生票</label>
          </div>
          <div class="flex-fill">
            <a href="javascript:;" class="btn btn-success rounded-0 btn-start-task waves-effect" @click="confirmTask">确认&开始任务</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import OrderTask from '../utils/task'

export default {
  name: 'TaskPanel',
  data () {
    return {
      chkPassengers: [],
      chkTrainCodes: [],
      seatTypes: [],
      chkSeatTypes: [],
      passengerName: [],
      seatItem: [
        { name: 'a', checked: false, value: '1A' },
        { name: 'b', checked: false, value: '1B' },
        { name: 'c', checked: false, value: '1C' },
        { name: 'd', checked: false, value: '1D' },
        { name: 'f', checked: false, value: '1F' }
      ],
      chooseSeats: [],
      chkTicketType: false,
      // 提交订单所需参数
      oldPassengers: [],
      passengerTickets: []
    }
  },
  props: {
    showPanel: {
      type: Boolean,
      default: false
    },
    passengers: Array
  },
  watch: {
    chkTrainCodes (value) {
      if (!value.length) this.chkSeatTypes = []
    },
    chkPassengers (value) {
      this.passengerName = []
      this.oldPassengers = []
      this.passengerTickets = []

      value.map(item => {
        this.passengerName.push(item.passenger_name)

        this.oldPassengers.push(
          `${item.passenger_name},${item.passenger_id_type_code},${
            item.passenger_id_no
          },${item.passenger_type}`
        )

        this.passengerTickets.push(
          `seatcode,0,${item.passenger_type},${item.passenger_name},${
            item.passenger_id_type_code
          },${item.passenger_id_no},${item.mobile_no},N`
        ) // 提交订单时，需要在前面添加座位code
      })

      // 根据选择乘客人数，自动选座
      this.chooseSeat(this.seatItem, false)
    }
  },
  mounted () {
    // 监听选择车次事件
    this.$eventBus.$on('changeSelecte', data => {
      this.chkTrainCodes = data.trains || []
      this.seatTypes = data.seats || []
    })

    // 监听退出登录事件
    this.$eventBus.$on('loginOff', () => {
      this.passengers = []
    })
  },
  methods: {
    // 选座
    chooseSeat (seats, isAutoUpdate = true) {
      const passengersCount = this.chkPassengers.length

      if (isAutoUpdate) {
        seats.checked = !seats.checked
      } else {
        seats.map((item, index) => {
          item.checked = false

          if (passengersCount === 1 && index === seats.length - 1) {
            item.checked = true
          } else if (passengersCount === 2 && index > passengersCount) {
            item.checked = true
          } else if (passengersCount >= 3 && index < passengersCount) {
            item.checked = true
          }
        })
      }

      // 已选的座
      const chooseSeatValue = this.seatItem.reduce((prev, current) => {
        if (current.checked) {
          prev.push(current.value)
        }

        return prev
      }, [])

      if (chooseSeatValue.length > passengersCount) {
        const value = chooseSeatValue.pop()

        this.$alert('请先选择乘客')
        this.seatItem.map(item => {
          if (item.value === value) {
            item.checked = false
          }
        })
      }

      this.chooseSeats = chooseSeatValue
    },

    confirmTask () {
      if (!this.chkPassengers.length && !this.chkSeatTypes.length) {
        this.$alert('还没有选择席别和乘客')
        return
      }

      const oldTaskData = this.$store.getters.taskData
      const queryInfo = this.$store.getters.queryInfo
      const taskData = {
        trains: this.chkTrainCodes,
        seats: this.chkSeatTypes,
        passengers: {
          passengerName: this.passengerName.toString(),
          oldPassengers: this.oldPassengers.join('_'),
          passengerTickets: this.passengerTickets.join('_')
        },
        statusText: '等待启动任务...',
        currentTrain: {
          trainCode: '',
          fromCityName: queryInfo.fromCity.text,
          toCityName: queryInfo.toCity.text,
          departureTime: '00:00',
          arrivalTime: '00:00',
          useTime: '00:00',
          seatText: ''
        },
        queryInfo: {
          fromCityCode: queryInfo.fromCity.value,
          fromCityName: queryInfo.fromCity.text,
          toCityCode: queryInfo.toCity.value,
          toCityName: queryInfo.toCity.text,
          trainDate: queryInfo.trainDate,
          ticketType: this.chkTicketType ? '0X00' : 'ADULT'
        },
        chooseSeats: this.chooseSeats.toString().replace(/(,)/g, '') // 选中的座
      }

      if (!oldTaskData) {
        this.startTask(taskData)
        return
      }

      this.$swal('已经存在一个任务', {
        icon: 'warning',
        title: '确定要替换？',
        buttons: ['取消', '确定']
      }).then(res => {
        if (res) {
          this.startTask(taskData)
        }
      })
    },

    // 启动任务
    startTask (taskData) {
      // 停止任务
      OrderTask.stop()

      this.chkPassengers = []
      this.chkSeatTypes = []
      this.chkTrainCodes = []
      this.$store.dispatch('setTaskData', taskData)

      this.$eventBus.$emit('clearChooseTrain')
      this.$emit('addTaskSuccess')

      // 执行任务
      // OrderTask.start()
    }
  }
}
</script>

<style scoped>
.task-panel {
  background-color: var(--white);
  box-shadow: 0 0 1.8rem var(--cyan);
  bottom: 0;
  border-left: 0.05rem solid var(--cyan);
  top: 0;
  right: 0;
  width: 18rem;
  z-index: 1031;
}

.task-panel-bottom {
  position: fixed;
  bottom: 0;
  border-top: 0.05rem solid var(--cyan);
  right: 0;
  width: 18rem;
  padding-top: 0.5rem;
}

.task-panel-bottom .iconfont {
  font-size: 1.5rem;
}

.task-panel-bottom .checkbox {
  margin: 0;
}

.task-panel-bottom .seat-item:hover,
.task-panel-bottom .seat-item.active {
  color: var(--green);
}

.btn-start-task {
  display: inline-block;
  width: 100%;
  color: #fff !important;
  text-align: center;
  height: 100%;
}

.btn-start-task:focus {
  box-shadow: 0 0 0 transparent !important;
  outline: none;
}

.checkbox label {
  display: inherit;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
}
</style>
