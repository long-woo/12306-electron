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
  /* overflow: hidden; */
}

/* table {
  margin-bottom: 0;
} */

button {
  cursor: pointer;
}

label {
  margin-bottom: 0;
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

.radio, .checkbox {
  margin-bottom: 0;
}

.radio > input[type="radio"]:first-child:checked + label::before,
.checkbox > input[type="checkbox"]:first-child:checked + label::before,
.radio > input[type="radio"]:first-child:checked + input[type="hidden"] + label::before,
.checkbox > input[type="checkbox"]:first-child:checked + input[type="hidden"] + label::before {
  content: "\e7bc";
  font-family: 'iconfont';
  font-size: 1.2rem;
}
</style>
