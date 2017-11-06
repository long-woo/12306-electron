<template>
  <div>我的订单</div>
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

      console.log(res)
    }
  }
}
</script>
