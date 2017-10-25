<template>
  <div>
    <div class="task-add-panel position-absolute border border-info border-left-0 border-right-0 border-bottom-0" v-show="showPanel">
      <div class="border-b-dashed-1 d-flex flex-row">
        <div class="bg-info p-2">座位：</div>
        <div class="p-2" v-for="(item, index) in seatTypes" :key="index">
          <div class="checkbox icheck-info">
            <input type="checkbox" :id="`chk_seat_${index}`" v-model="chkSeatTypes" :value="item.code" />
            <label :for="`chk_seat_${index}`">{{item.text}}</label>
          </div>
          <span v-if="!seatTypes.length" class="text-secondary">请先选择车次</span>
        </div>
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
      seatTypes: [],
      chkSeatTypes: []
    }
  },
  watch: {
    showPanel (value) {
      if (this.chkPassengers.length) {
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
    chkPassengers (value) {
      if (value.length > 5) {
        value.pop()
        this.$alert('一次只能选择5位乘客')
        return
      }

      if (value.length) {
        this.buttonIcon = 'icon-check'
        this.buttonText = '确定'
      } else {
        this.buttonIcon = 'icon-close'
        this.buttonText = '关闭'
      }
    }
  },
  mounted () {
    this.getPassengers()

    this.$eventBus.$on('changeSelecte', (seats) => {
      this.seatTypes = seats
    })
  },
  methods: {
    // 获取乘客
    async getPassengers () {
      if (!this.$store.getters.loginModel) return

      const res = await this.$api.getPassengers('', 1, 999)
      console.log(res)

      if (!res.length) return

      this.passengers = res
    },
    addTask () {
      if (this.showPanel && !this.chkPassengers.length) {
        this.showPanel = false
        return
      }

      this.showPanel = true
    }
  }
}
</script>

<style scoped>
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
