<template>
  <div id="app">
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
  color: #fff;
}

body {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

button {
  cursor: pointer;
}

.font-size-14{
  font-size: 0.875rem;
}
</style>
