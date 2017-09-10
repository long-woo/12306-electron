<template>
  <div>
    <header class="navbar-dark">
      <div class="navbar-nav-scroll">
        <b-nav class="navbar-nav flex-row justify-content-center text-center bg-info">
          <b-nav-item :active="nav.active" v-for="(nav, index) in navItems" :key="index" :to="nav.to" @click="navChange(nav)">
            <i class="iconfont" :class="`icon-${nav.icon}`"></i>
            <p>{{nav.text}}</p>
          </b-nav-item>
        </b-nav>
      </div>
    </header>
    <main class="container-fluid">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      navItems: [
        { text: '新任务', active: true, icon: 'new-task', to: '/newtask' },
        { text: '任务管理', active: false, icon: 'task-manager', to: '/taskmanager' },
        { text: '我的订单', active: false, icon: 'order-manager', to: '/order' }
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

<style scoped>
.navbar-nav .nav-link {
  padding-left: 1rem;
  padding-right: 1rem;
}

.navbar-nav .nav-link i {
  font-size: 2rem;
}

.navbar-nav .nav-link p {
  margin-bottom: 0;
}

.container-fluid {
  padding-top: 1rem;
}
</style>
