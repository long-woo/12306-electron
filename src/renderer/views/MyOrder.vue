<template>
  <div>
    <div v-for="(item, index) in orderData" :key="index">
      
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

      this.orderData = res.data
    }
  }
}
</script>
