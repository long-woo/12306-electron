<template>
  <div>
    <div class="form-row form-group">
      <div class="col-sm-8 form-inline">
        <b-autocomplete class="col pl-sm-0 pr-sm-0" inputClass="br-rounded-0" placeholder="输入出发地" :dropdownData="fromCityData" @onSelect="selectFromCity"></b-autocomplete>
        <div class="col-auto pl-sm-0 pr-sm-0">
          <b-button variant="info" class="bs-input-center waves-effect" @click="changeCity">
            <i class="iconfont icon-change"></i>
          </b-button>
        </div>
        <b-autocomplete class="col pl-sm-0 pr-sm-0" placeholder="输入目的地" inputClass="bl-rounded-0" :dropdownData="toCityData" @onSelect="selectToCity"></b-autocomplete>
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
      <b-table empty-text="没有找到车次" :fields="fields" :items="ticketData" head-variant="default" striped hover show-empty @row-clicked="rowClick">
        <template slot="checkNo" scope="row">
          <div class="checkbox icheck-info" v-if="row.item.isBuy">
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
      fromCityData: [
        {text: '上海', value: 'SHH', firstPY: 'sh', fullPY: 'shanghai'},
        {text: '长沙', value: 'CSQ', firstPY: 'cs', fullPY: 'changsha'}
      ],
      toCityData: [
        {text: '上海', value: 'SHH', firstPY: 'sh', fullPY: 'shanghai'},
        {text: '长沙', value: 'CSQ', firstPY: 'cs', fullPY: 'changsha'}
      ],
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
      ticketData: []
    }
  },
  methods: {
    // 选择出发地
    selectFromCity (city) {
      this.fromCity = city
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
      if (!item.isBuy) return

      const res = this.chkTrains.indexOf(item.trainCode)

      if (res === -1) {
        this.chkTrains.push(item.trainCode)
        item._rowVariant = 'success'
      } else {
        this.chkTrains.splice(res, 1)
        item._rowVariant = ''
      }
    },
    // 查询
    async queryTrain () {
      const trainDate = this.$refs.rideDate.date.time
      // this.$swal('1')
      // this.$alert('1')
      const {data} = await this.$api.getTicket(this.fromCity.value, this.toCity.value, trainDate)
      const result = data.result || []
      const stationNames = data.map || []
      let ticketData = []

      result.map((val, inx) => {
        const arrTrain = val.split('|')
        const trainCode = arrTrain[3]

        ticketData.push({
          _rowVariant: arrTrain[11] !== 'Y' ? 'danger' : '',
          tranType: trainCode.substr(0, 1),
          trainNo: arrTrain[2],
          trainCode: trainCode,
          fromCityCode: arrTrain[6],
          fromCityName: stationNames[arrTrain[6]],
          toCityCode: arrTrain[7],
          toCityName: stationNames[arrTrain[7]],
          departureTime: arrTrain[8],
          arrivalTime: arrTrain[9],
          useTime: arrTrain[10],
          isBuy: arrTrain[11] === 'Y',
          ypInfo: arrTrain[12],
          locationCode: arrTrain[15],
          seatTypeCodes: this.getSeatTypeCode(arrTrain[35]),
          seatTypes: this.getSeatTypes(arrTrain),
          secret: arrTrain[0],
          remark: arrTrain[1]
        })
      })

      console.log(ticketData)
      this.ticketData = ticketData
    },
    // 格式化座位信息
    formatSeatType (data) {
      let seatCount = ''
      // const [{seatTypeDetail}] = data

      data.map(({seatTypeDetail}, indx) => {
        seatCount += seatTypeDetail
      })

      return seatCount
    },
    // 获取座位代码
    getSeatTypeCode (seatTypeCodes) {
      // 存在两个“1”时，第一个“1”改成“W”
      const seatCodes = seatTypeCodes.replace(/(1)/, 'W').split('')

      return seatCodes
    },
    // 获取座位信息
    getSeatTypes (trains) {
      const seatCodes = this.getSeatTypeCode(trains[35])
      let arrSeatInfo = []

      seatCodes.map((val, idx) => {
        const seatDetail = this.getSeatTypeInfo(val, trains)

        arrSeatInfo.push({ seatTypeCode: val, seatTypeDetail: seatDetail })
      })

      return arrSeatInfo
    },
    // 获取座位类型
    getSeatTypeInfo (seatTypeCode, seatTypes) {
      switch (seatTypeCode) {
        case 'Q':
          return seatTypes ? `观光座（${seatTypes[20]}）` : '观光座'
        case '9':
          return seatTypes ? `商务座（${seatTypes[32]}）` : '商务座'
        case 'P':
          return seatTypes ? `特等座（${seatTypes[25]}）` : '特等座'
        case 'S':
          return seatTypes ? `一等包座（${seatTypes[27]}）` : '一等包座'
        case 'M':
          return seatTypes ? `一等座（${seatTypes[31]}）` : '一等座'
        case 'O':
          return seatTypes ? `二等座（${seatTypes[30]}）` : '二等座'
        case '6':
          return seatTypes ? `高级软卧（${seatTypes[21]}）` : '高级软卧'
        case '4':
          return seatTypes ? `软卧（${seatTypes[23]}）` : '软卧'
        case '3':
          return seatTypes ? `硬卧（${seatTypes[28]}）` : '硬卧'
        case '2':
          return seatTypes ? `软座（${seatTypes[24]}）` : '软座'
        case '1':
          return seatTypes ? `硬座（${seatTypes[29]}）` : '硬座'
        case 'W':
          return seatTypes ? `无座（${seatTypes[26]}）` : '无座'
        default:
          return seatTypes ? `其他（${seatTypes[22]}）` : '其他'
      }
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
