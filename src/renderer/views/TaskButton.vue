<template>
  <div class="fixed-bottom task-button-box">
    <div class="task-add-panel position-absolute border border-info border-left-0 border-right-0 border-bottom-0" v-show="showPanel">
      <div class="row pl-4 pr-4 pt-2 pb-2 border-b-dashed-1">
        <div class="checkbox icheck-info col-sm-2" v-for="(item, index) in seatTypes" :key="index">
          <input type="checkbox" :id="`chk_seat_${index}`" v-model="chkSeatTypes" :value="item.code" />
          <label :for="`chk_seat_${index}`">{{item.text}}</label>
        </div>
        <div v-if="!seatTypes.length" class="text-center text-secondary col-md-12">请先选择车次</div>
      </div>
      <div class="row pl-4 pr-4 pt-2 pb-2">
        <div class="checkbox icheck-info col-sm-2" v-for="(item, index) in passengers" :key="index">
          <input type="checkbox" :id="`chk_user_${item.first_letter}`" v-model="chkPassengers" :value="item" />
          <label :for="`chk_user_${item.first_letter}`">{{item.passenger_name}}</label>
        </div>
        <div class="text-center text-secondary col-md-12" v-if="!passengers.length">请先登录</div>
      </div>
    </div>
    <div class="btn-add-task text-center rounded-circle border border-info waves-effect" @click="addTask">
      <a class="text-white">
        <i class="iconfont" :class="buttonIcon"></i>
        <p>{{buttonText}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskButton',
  data () {
    return {
      showPanel: false,
      buttonIcon: 'icon-add-task',
      buttonText: '添加任务',
      passengers: [],
      chkPassengers: [],
      disabledPassengers: [],
      trains: [],
      seatTypes: [],
      chkSeatTypes: [],
      oldPassengers: [],
      passengerTickets: []
    }
  },
  watch: {
    showPanel (value) {
      if (this.chkPassengers.length || this.chkSeatTypes.length) {
        this.buttonIcon = 'icon-check'
        this.buttonText = '确定'
        return
      }

      if (value) {
        this.buttonIcon = 'icon-close'
        this.buttonText = '关闭'
      } else {
        this.buttonIcon = 'icon-add-task'
        this.buttonText = '添加任务'
      }
    },
    chkSeatTypes (value) {
      this.setButton(value, '5种类型的座位')
    },
    chkPassengers (value) {
      // `${item.PassengerName},${item.PassengerIdTypeCode},${item.PassengerIdNo},${item.PassengerType}_`
      this.setButton(value, '5位乘客')
    }
  },
  mounted () {
    this.getPassengers()

    this.$eventBus.$on('changeSelecte', ({trains, seats}) => {
      this.trains = trains
      this.seatTypes = seats
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
      } else {
        this.buttonIcon = 'icon-close'
        this.buttonText = '关闭'
      }
    },
    // 获取乘客
    async getPassengers () {
      if (!this.$store.getters.loginModel) return

      const res = await this.$api.getPassengers('', 1, 999)
      console.log(res)

      if (!res.length) return

      this.passengers = res
    },
    addTask () {
      if (this.showPanel && !this.chkPassengers.length && !this.chkSeatTypes.length) {
        this.showPanel = false
        return
      }

      this.showPanel = true
    }
  }
}
</script>

<style scoped>
.task-button-box {
  z-index: 2048;
}

.btn-add-task {
  box-shadow: 0 0 0.5rem #17a2b8;
  margin: -4.6rem auto 0;
  width: 4.5rem;
  height: 4.5rem;
  right: 0;
  left: 0;
  background-color: rgba(23, 162, 184, 1);
  position: absolute;
}

.btn-add-task:hover {
  background-color: rgba(23, 162, 184, 0.8);
}

.btn-add-task i {
  font-size: 2rem;
}

.btn-add-task p {
  font-size: 0.8rem;
  margin-top: -0.3rem;
  margin-bottom: 0;
}

.task-add-panel {
  background-color: rgba(255, 255, 255, 0.9);
  height: 15rem;
  margin-top: -15rem;
  padding-bottom: 2.9rem;
}

.border-b-dashed-1 {
  border-bottom: 0.01rem dashed #17a2b8;
}

.checkbox {
  margin-top: 0;
}
</style>
