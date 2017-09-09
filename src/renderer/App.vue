<template>
  <div id="app" class="container-fluid">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* CSS */

 ::selection {
  background-color: #81d8d0;
}

body {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
</style>
