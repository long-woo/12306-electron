<template>
  <!-- <ul class="nav justify-content-center">
    <li class="nav-item" :class="{'active' : nav.active}" v-for="(nav, index) in navItems" :key="index">
      <a class="nav-link" href="javascript:;">{{nav.text}}</a>
    </li>
  </ul> -->
  <b-nav class="justify-content-center">
    <b-nav-item :active="nav.active" v-for="(nav, index) in navItems" :key="index">{{nav.text}}</b-nav-item>
  </b-nav>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      navItems: [
        {text: '新任务', active: true, to: ''},
        {text: '处理中', active: false, to: ''},
        {text: '待支付', active: false, to: ''}
      ]
    }
  }
}
</script>
