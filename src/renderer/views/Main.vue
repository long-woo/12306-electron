<template>
  <div>
    <b-nav class="justify-content-center">
      <b-nav-item :active-class="nav.active ? 'text-info' : ''" :active="nav.active" v-for="(nav, index) in navItems" :key="index" :to="nav.to" @click="navChange(nav)">{{nav.text}}</b-nav-item>
    </b-nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      navItems: [
        { text: '新任务', active: true, to: '/newtask' },
        { text: '处理中', active: false, to: '/process' },
        { text: '我的订单', active: false, to: '/order' }
      ]
    }
  },
  methods: {
    navChange (nav) {
      nav.active = true

      this.navItems.map((val, index) => {
        if (val.text !== nav.text) val.active = false
      })
    }
  }
}
</script>
