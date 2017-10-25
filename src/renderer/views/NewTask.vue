<template>
  <div>
    <div class="form-row form-group sticky-top bg-white">
      <div class="col-sm-8 form-inline">
        <b-autocomplete class="col pl-sm-0 pr-sm-0" inputClass="br-rounded-0" placeholder="输入出发地" v-model="fromCity" :dropdownData="stationData" @onSelect="selectFromCity"></b-autocomplete>
        <div class="col-auto pl-sm-0 pr-sm-0">
          <b-button variant="info" class="bs-input-center waves-effect" @click="changeCity">
            <i class="iconfont icon-change"></i>
          </b-button>
        </div>
        <b-autocomplete class="col pl-sm-0 pr-sm-0" placeholder="输入目的地" inputClass="bl-rounded-0" v-model="toCity" :dropdownData="stationData" ref="toCity" @onSelect="selectToCity"></b-autocomplete>
      </div>
      <div class="col-sm-3">
        <b-date-picker ref="rideDate"></b-date-picker>
      </div>
      <div class="col-sm-1">
        <b-button variant="info" class="waves-effect" @click="queryTrain">
          <i class="iconfont icon-search"></i>
        </b-button>
      </div>
    </div>
    <div>
      <b-table empty-text="没有找到车次" :fields="fields" :items="ticketData" head-variant="default sticky-top" striped hover show-empty ref="tbTrain" @row-clicked="rowClick">
        <template slot="checkNo" scope="row">
          <div class="checkbox icheck-info waves-effect">
            <input type="checkbox" :id="`chk_${row.index}`" v-model="chkTrains" :value="row.item.trainCode" />
            <label :for="`chk_${row.index}`"></label>
          </div>
        </template>
        <template slot="trainCode" scope="row">{{row.value}}</template>
        <template slot="from" scope="row">
          <p class="mb-0">{{row.item.fromCityName}}</p>
          <p class="mb-0 font-size-14">{{row.item.departureTime}}</p>
        </template>
        <template slot="to" scope="row">
          <p class="mb-0">{{row.item.toCityName}}</p>
          <p class="mb-0 font-size-14">{{row.item.arrivalTime}}</p>
        </template>
        <template slot="useTime" scope="row">{{row.value}}</template>
        <template slot="seatTypes" scope="row">
          <p class="mb-0 font-size-14">{{row.value}}</p>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewTask',
  data () {
    return {
      stationData: [],
      fromCity: null,
      toCity: null,
      // table option
      fields: {
        checkNo: {label: '', class: 'text-center align-middle', thStyle: 'width: 20px;'},
        trainCode: {label: '车次', sortable: true, class: 'align-middle'},
        from: {label: '出发地', class: 'align-middle'},
        to: {label: '目的地', class: 'align-middle'},
        useTime: {label: '用时', sortable: true, class: 'align-middle'},
        seatTypes: {label: '备注', class: 'align-middle', thStyle: 'width: 200px;', formatter: this.formatSeatType}
      },
      chkTrains: [],
      ticketData: [],
      captchaCode: '',
      seatItems: []
    }
  },
  async mounted () {
    // 站名
    const stations = await this.$api.getStationName()

    this.$store.dispatch('setStationName', stations)
    this.stationData = stations
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
    // 点击行
    rowClick (item) {
      let seatCodes = item.seatTypeCodes
      const res = this.chkTrains.indexOf(item.trainCode)

      if (res === -1) {
        this.chkTrains.push(item.trainCode)
        item._rowVariant = 'success'
      } else {
        this.chkTrains.splice(res, 1)
        item._rowVariant = !item.isBuy ? 'danger' : ''
      }

      // 处理座位信息
      seatCodes.map((code, index) => {
        const text = this.$api.getSeatTypeInfo(code)

        this.seatItems.filter((s, i) => {
          if (s.code === code) {
            return this.seatItems.splice(i, 1)
          }
        })

        this.seatItems.push({code, text})
      })

      this.$refs.tbTrain.refresh()
      this.$eventBus.$emit('changeSelecte', this.seatItems)
    },
    // 查询
    async queryTrain () {
      if (!this.fromCity || !this.toCity) return

      const trainDate = this.$refs.rideDate.date.time
      // this.$swal('1')
      // this.$alert('1')
      const data = await this.$api.getTicket(this.fromCity.value, this.toCity.value, trainDate)

      console.log(data)
      this.chkTrains = []
      this.ticketData = data
    },
    // 格式化座位信息
    formatSeatType (data) {
      let seatCount = ''

      data.map(({seatTypeDetail}, indx) => {
        seatCount += seatTypeDetail
      })

      return seatCount
    }
  }
}
</script>

<style>
.bs-input-center {
  border-radius: 0;
}

.bs-input-center:focus {
  box-shadow: 0 0 0 transparent;
}

.bl-rounded-0{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.br-rounded-0 {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
