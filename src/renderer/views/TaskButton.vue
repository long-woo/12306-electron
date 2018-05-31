<template>
  <transition enter-active-class="ani-slide-left" leave-active-class="ani-slide-right">
    <div class="position-fixed container task-panel" v-show="showPanel">
      <div class="row p-2 border-b-dashed-1">
        <div class="checkbox icheck-info col-sm-6" v-for="(item, index) in seatTypes" :key="index">
          <input type="checkbox" :id="`chk_seat_${index}`" v-model="chkSeatTypes" :value="item.code" />
          <label :for="`chk_seat_${index}`">{{item.text}}</label>
        </div>
        <div v-if="!seatTypes.length" class="text-center text-secondary col-md-12">请先选择车次</div>
      </div>
      <div class="row d-flex flex-wrap p-2 border-b-dashed-1">
        <div class="m-auto text-warning text-center tip-info">提示：选座功能仅支持C、D、G字头的动车组列车</div>
        <div class="">1</div>
        <div class="">1</div>
        <div class="">1</div>
        <div class="">1</div>
        <div class="">1</div>
      </div>
      <div class="row p-2">
        <div class="checkbox icheck-info col-sm-4" v-for="(item, index) in passengers" :key="index">
          <input type="checkbox" :id="`chk_user_${item.first_letter}`" v-model="chkPassengers" :value="item" />
          <label :for="`chk_user_${item.first_letter}`">{{item.passenger_name}}</label>
        </div>
        <div class="text-center text-secondary col-md-12" v-if="!passengers.length">请先登录</div>
      </div>
    </div>
  </transition>
</template>

<script>
import utils from '../utils/utils'

export default {
  name: 'TaskButton',
  data () {
    return {
      showPanelAnimate: 'task-add-panel-hide',
      buttonIcon: 'icon-add-task',
      buttonText: '添加任务',
      passengers: [],
      chkPassengers: [],
      chkTrainCodes: [],
      seatTypes: [],
      chkSeatTypes: [],
      passengerName: [],
      // 提交订单所需参数
      oldPassengers: [],
      passengerTickets: []
    }
  },
  props: {
    showPanel: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showPanel (value) {
      if (value) {
        this.buttonIcon = 'icon-close'
        this.buttonText = '关闭'
        this.showPanelAnimate = 'ani-slide-up'
      } else {
        this.buttonIcon = 'icon-add-task'
        this.buttonText = '添加任务'
        this.showPanelAnimate = 'ani-slide-down'
      }
    },
    chkSeatTypes (value) {
      this.setButton(value, '5种类型的座位')
    },
    chkTrainCodes (value) {
      if (!value.length) this.chkSeatTypes = []
    },
    chkPassengers (value) {
      this.passengerName = []
      this.oldPassengers = []
      this.passengerTickets = []

      value.filter(item => {
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

      this.setButton(value, '5位乘客')
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
    // 动态操作按钮
    setButton (value, text) {
      if (value.length > 5) {
        value.pop()
        this.$alert(`一次只能选择${text}`)
        return
      }

      if (value.length) {
        this.buttonIcon = 'icon-check'
        this.buttonText = '确定'
      }
    },
    // 获取乘客
    async getPassengers () {
      if (!this.$store.getters.loginModel) return

      const { data } = await this.$api.account.getPassengers('', 1, 999)

      if (!data.length) return

      this.passengers = data
    },
    addTask () {
      if (
        this.showPanel &&
        !this.chkPassengers.length &&
        !this.chkSeatTypes.length
      ) {
        this.showPanel = false
        return
      }

      this.showPanel = true

      if (this.chkPassengers.length && this.chkSeatTypes.length) {
        const $parentData = this.$parent
        const taskData = {
          trains: this.chkTrainCodes,
          seats: this.chkSeatTypes,
          passengers: {
            passengerName: this.passengerName.toString(),
            oldPassengers: this.oldPassengers.join('_'),
            passengerTickets: this.passengerTickets.join('_')
          },
          statusText: '等待启动任务...',
          queryInfo: {
            fromCityCode: $parentData.fromCity.value,
            fromCityName: $parentData.fromCity.text,
            toCityCode: $parentData.toCity.value,
            toCityName: $parentData.toCity.text,
            trainDate: $parentData.trainDate
          }
        }

        this.showPanel = false
        this.chkPassengers = []
        this.chkSeatTypes = []
        this.chkTrainCodes = []
        this.$store.dispatch('setTaskData', taskData)
        // 添加成功后，清除选择车次
        this.$eventBus.$emit('clearChooseTrain')

        // 执行任务
        utils.task.start()
      }
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
</style>
