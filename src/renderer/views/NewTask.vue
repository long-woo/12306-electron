<template>
  <div>
    <div class="form-row sticky-top bg-white pt-3">
      <div class="col-sm-6 form-inline mb-3">
        <b-autocomplete class="col pl-0 pr-0" inputClass="br-rounded-0" placeholder="输入出发地" v-model="fromCity" :dropdownData="stationData" @onSelect="selectFromCity"></b-autocomplete>
        <div class="col-auto pl-0 pr-0">
          <b-button variant="info" class="bs-input-center waves-effect" @click="changeCity">
            <i class="iconfont icon-change"></i>
          </b-button>
        </div>
        <b-autocomplete class="col pl-0 pr-0" placeholder="输入目的地" inputClass="bl-rounded-0" v-model="toCity" :dropdownData="stationData" ref="toCity" @onSelect="selectToCity"></b-autocomplete>
      </div>
      <div class="col-sm-4 mb-3">
        <b-date-picker ref="rideDate" @change="changeDate"></b-date-picker>
      </div>
      <div class="col-sm-2 mb-3 text-right">
        <b-button variant="info" class="waves-effect" @click="queryTrain">
          <i class="iconfont icon-search"></i>
          <span>查询</span>
        </b-button>
      </div>
    </div>
    <div class="table-responsive">
      <b-table empty-text="没有找到车次^~^" :fields="fields" :items="ticketData" head-variant="default bg-info text-white" inverse striped hover show-empty  ref="tbTrain" @row-clicked="rowClick">
        <template slot="checkNo" slot-scope="row">
          <div class="checkbox icheck-info waves-effect">
            <input type="checkbox" :id="`chk_${row.index}`" v-model="chkTrains" :value="row.item.trainCode" />
            <label :for="`chk_${row.index}`"></label>
          </div>
        </template>
        <template slot="trainCode" slot-scope="row">{{row.value}}</template>
        <template slot="from" slot-scope="row">
          <p class="mb-0">{{row.item.fromCityName}}</p>
          <p class="mb-0 font-size-14">{{row.item.departureTime}}</p>
        </template>
        <template slot="to" slot-scope="row">
          <p class="mb-0">{{row.item.toCityName}}</p>
          <p class="mb-0 font-size-14">{{row.item.arrivalTime}}</p>
        </template>
        <template slot="useTime" slot-scope="row">{{row.value}}</template>
        <template slot="seatTypes" slot-scope="row">
          <p class="mb-0 font-size-14">{{row.value}}</p>
        </template>
      </b-table>
    </div>
    <task-button ref="taskButton"></task-button>
  </div>
</template>

<script>
import TaskButton from './TaskButton'
import utils from '../scripts/utils'

export default {
  name: 'NewTask',
  data () {
    return {
      stationData: [],
      fromCity: null,
      toCity: null,
      // table option
      fields: {
        checkNo: {label: ' ', class: 'text-center align-middle', thStyle: 'width: 20px;'},
        trainCode: {label: '车次', sortable: true, class: 'align-middle'},
        from: {label: '出发地', class: 'align-middle'},
        to: {label: '目的地', class: 'align-middle'},
        useTime: {label: '用时', sortable: true, class: 'align-middle'},
        seatTypes: {label: '备注', class: 'align-middle', thStyle: 'min-width: 200px;', formatter: this.formatSeatType}
      },
      chkTrains: [],
      ticketData: [],
      seatCodes: []
    }
  },
  computed: {
    trainDate () {
      return this.$refs.rideDate.date.time
    }
  },
  async mounted () {
    // 获取保存过的车次查询信息
    const queryInfo = utils.getQueryInfo()

    if (queryInfo) {
      this.fromCity = queryInfo.fromCity
      this.toCity = queryInfo.toCity
    }

    // 站名
    const {data} = await this.$api.base.getStationName()

    this.$store.dispatch('setStationName', data)
    this.stationData = data

    if (this.$refs.taskButton) {
      this.$refs.taskButton.getPassengers()
    }

    this.$eventBus.$on('clearChooseTrain', () => {
      this.chkTrains = []
    })

    setTimeout(() => {
      this.queryTrain()
    }, 1000)
  },
  methods: {
    // 选择出发地
    selectFromCity (city) {
      this.fromCity = city
      this.$refs.toCity.focus()
    },
    // 选择目的地
    selectToCity (city) {
      this.toCity = city
    },
    // 切换地址
    changeCity () {
      [this.fromCity, this.toCity] = [this.toCity, this.fromCity]
    },
    // 选择乘车日期
    changeDate (date) {
      this.queryTrain()
    },
    // 点击行
    rowClick (item) {
      let seatCode = item.seatTypeCodes.toString().replace(/(,)/g, '-')
      const trainIndex = this.chkTrains.indexOf(item.trainCode)
      let seatItems = []

      if (trainIndex === -1) {
        this.chkTrains.push(item.trainCode)
        this.seatCodes.push(seatCode)
        item._rowVariant = 'success'
      } else {
        this.chkTrains.splice(trainIndex, 1)
        this.seatCodes.splice(trainIndex, 1)
        item._rowVariant = !item.isBuy ? 'danger' : ''
      }

      // 处理座位信息
      const seatCodes = this.seatCodes.toString().replace(/(-)/g, ',').split(',')

      seatCodes.map((code, index) => {
        if (!code) return

        const text = this.$api.base.getSeatTypeInfo(code)

        seatItems.filter((s, i) => {
          if (s.code === code) {
            return seatItems.splice(i, 1)
          }
        })

        seatItems.push({code, text})
      })

      const chkTrainInfo = {
        trains: this.chkTrains,
        seats: seatItems
      }

      this.$refs.tbTrain.refresh()
      this.$eventBus.$emit('changeSelecte', chkTrainInfo)
    },
    // 查询
    async queryTrain () {
      if (!this.fromCity || !this.toCity || this.fromCity === this.toCity) return

      const trainDate = this.$refs.rideDate.date.time
      const {data} = await this.$api.base.getTicket(this.fromCity.value, this.toCity.value, trainDate)

      this.chkTrains = []
      this.ticketData = data
      this.seatCodes = []
      this.$eventBus.$emit('changeSelecte', [])

      // 保存查询车次信息
      const queryInfo = {
        fromCity: this.fromCity,
        toCity: this.toCity
      }

      utils.setQueryInfo(queryInfo)
    },
    // 格式化座位信息
    formatSeatType (data) {
      let seatCount = ''

      data.map(({seatTypeDetail}, indx) => {
        seatCount += seatTypeDetail
      })

      return seatCount
    }
  },
  components: {
    TaskButton
  }
}
</script>

<style scoped>
.bs-input-center {
  border-radius: 0;
}

.bs-input-center:focus {
  box-shadow: 0 0 0 transparent;
}
</style>
