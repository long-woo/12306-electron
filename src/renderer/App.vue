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
  background-color: #17a2b8;
}

body {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
</style>
