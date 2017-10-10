<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  async created () {
    const {c_url} = await this.$api.getQueryUrl()

    this.$store.dispatch('setQueryUrl', c_url)
  }
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

#nprogress .bar {
  background-color: #35495E;
}

#nprogress .spinner-icon {
  border-top-color: #41B883;
  border-left-color: #41B883;
}
</style>
