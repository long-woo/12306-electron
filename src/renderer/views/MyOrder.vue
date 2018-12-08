<template>
  <div class="mt-3">
    <div class="col-md-12" v-for="(item, index) in orderData" :key="index">
      <div class="row bg-info pl-0 pr-0 pt-2 pb-2 text-white">
        <div class="col-sm-6">{{item.sequence_no}}</div>
        <div class="col-sm-6 text-right">{{item.order_date}}</div>
      </div>
      <div class="pl-0 pr-0 pt-2 pb-2" :class="{'border-b-dashed-1': ti < item.tickets.length - 1}" v-for="(tick, ti) in item.tickets" :key="ti">
        <div class="row text-center order-tick-item">
          <div class="col-sm-5">
            <h4>{{tick.stationTrainDTO.from_station_name}}</h4>
            <span>{{tick.stationTrainDTO.start_time.substr(11)}}</span>
          </div>
          <div class="col-sm-2">
            <div>{{tick.stationTrainDTO.station_train_code}}</div>
            <div>
              <i class="iconfont icon-long-right-arrow"></i>
            </div>
          </div>
          <div class="col-sm-5">
            <h4>{{tick.stationTrainDTO.to_station_name}}</h4>
            <span>{{tick.stationTrainDTO.arrive_time.substr(11)}}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">{{tick.passengerDTO.passenger_name}}</div>
          <div class="col-sm-6">{{`${tick.seat_type_name}${tick.coach_name}车厢${tick.seat_name}`}}</div>
          <div class="col-sm-2 text-right text-danger">¥{{tick.str_ticket_price_page}}</div>
        </div>
        <div class="row">
          <div class="col-sm-4 ml-auto">{{tick.train_date.substring(0, tick.train_date.indexOf(' '))}}</div>
          <div class="col-sm-4 text-right text-danger">{{tick.ticket_status_name}}</div>
        </div>
      </div>
      <div class="row pl-0 pr-0 pt-2 pb-2 bg-light text-success">
        <div class="col-md-12 text-right">
          <span>共{{item.ticket_totalnum}}张车票，共¥{{item.ticket_total_price_page}}</span>
        </div>
      </div>
    </div>
    <div class="alert alert-warning text-center" v-if="!orderData.length">没有<strong>待支付的订单</strong>^~^</div>
  </div>
</template>

<script>
export default {
  name: 'MyOrder',
  data () {
    return {
      orderData: []
    }
  },
  mounted () {
    this.getMyOrder()
  },
  methods: {
    // 获取订单列表
    async getMyOrder () {
      const {data} = await this.$api.order.getMyOrder()

      this.orderData = data
      this.$store.dispatch('setOrderCount', data.length)
    }
  }
}
</script>

<style scoped>
.order-tick-item {
  margin-bottom: -2rem;
}

.order-tick-item h4 {
  margin-bottom: 0;
}

.order-tick-item .icon-long-right-arrow {
  font-size: 4.5rem;
  margin-top: -3.3rem;
}
</style>
