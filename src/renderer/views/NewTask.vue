<template>
  <div>
    <div class="form-row form-group">
      <div class="col-sm-8 form-inline">
        <b-autocomplete class="col pl-sm-0 pr-sm-0" inputClass="br-rounded-0" placeholder="输入出发地" :dropdownData="fromCityData" @onSelect="selectFromCity"></b-autocomplete>
        <div class="col-auto pl-sm-0 pr-sm-0">
          <b-button variant="info" class="bs-input-center waves-effect">
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
    <b-table empty-text="没有找到车次" :fields="fields" head-variant="default" striped hover show-empty></b-table>
  </div>
</template>

<script>
export default {
  name: 'NewTask',
  data () {
    return {
      fromCityData: [
        {text: '上海', value: 'SH', firstPY: 'sh', fullPY: 'shanghai'},
        {text: '邵阳', value: 'SY', firstPY: 'sy', fullPY: 'shaoyang'}
      ],
      toCityData: [
        {text: '上海', value: 'SH', firstPY: 'sh', fullPY: 'shanghai'},
        {text: '邵阳', value: 'SY', firstPY: 'sy', fullPY: 'shaoyang'}
      ],
      fromCity: null,
      toCity: null,
      // table option
      fields: {
        trainNo: {label: '车次', sortable: true},
        fromCity: {label: '出发地'},
        toCity: {label: '目的地'},
        useTime: {label: '用时', sortable: true},
        remak: {label: '备注'}
      }
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
    // 查询
    queryTrain () {
      const rideDate = this.$refs.rideDate.date.time
      console.log(rideDate)
      this.$swal('1')
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
