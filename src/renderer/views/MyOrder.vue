<template>
  <div>
    <div class="col-md-12">
      <div class="row bg-info pl-0 pr-0 pt-2 pb-2 text-white">
        <div class="col-sm-6">E842185692</div>
        <div class="col-sm-6 text-right">2015-04-01 09:06:40</div>
      </div>
      <div class="pl-0 pr-0 pt-2 pb-2" :class="{'border-b-dashed-1': ti < 1}" v-for="(tick, ti) in [1, 2]" :key="ti">
        <div class="row text-center" style="margin-bottom:-2rem;">
          <div class="col-sm-5">
            <h4 style="margin-bottom: 0;">上海虹桥</h4>
            <span>09:00</span>
          </div>
          <div class="col-sm-2">
            <div>G1234</div>
            <div>
              <i class="iconfont icon-long-right-arrow" style="font-size: 4.5rem;margin-top: -3.3rem;"></i>
            </div>
          </div>
          <div class="col-sm-5">
            <h4 style="margin-bottom: 0;">邵阳</h4>
            <span>17:00</span>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">long.woo</div>
          <div class="col-sm-6">二等座06车厢12C号</div>
          <div class="col-sm-2 text-right">¥546.5</div>
        </div>
        <div class="row">
          <div class="col-sm-4 ml-auto">2015-05-20</div>
          <div class="col-sm-4 text-right">待支付</div>
        </div>
      </div>
      <div class="pl-0 pr-0 pt-2 pb-2 text-right">
        <span>共1张车票，共¥546.5</span>
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
  methods: {
    // 获取订单列表
    async getMyOrder () {
      const res = await this.$api.getMyOrder()

      if (res.code !== 1) {
        this.$alert(res.message)
        return
      }
      // v-for="(item, index) in orderData" :key="index"
      this.orderData = res.data
      this.$store.dispatch('setOrderCount', res.data.length)
    }
  }
}
</script>
