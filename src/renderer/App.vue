<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  async created () {
    // 查票url
    const {c_url} = await this.$api.getQueryUrl()
    this.$store.dispatch('setQueryUrl', c_url)
  }
}
</script>

<style>
/* CSS */
* {
  transition: all 0.3s ease;
}

::selection {
  background-color: #17a2b8;
  color: #fff;
}

body {
  -webkit-user-select: none;
  -webkit-app-region: drag;
  overflow: hidden;
}

a:focus {
  outline: none;
}

.table {
  margin-bottom: 0;
}

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

.iconfont {
  display: inline-block;
  transition: all 0.3s ease;
}

.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
}

.rotate-enter,
.rotate-leave-to {
  display: inline-block;
  transform: rotateZ(180deg);
  -webkit-transform: rotateZ(180deg);
}

.border-b-dashed-1 {
  border-bottom: 0.01rem dashed #17a2b8;
}

@-webkit-keyframes ani-hue {
  from {
    -webkit-filter: hue-rotate(0);
  }

  to {
    -webkit-filter: hue-rotate(-360deg);
  }
}

@keyframes ani-hue {
  from {
    filter: hue-rotate(0);
  }

  to {
    filter: hue-rotate(-360deg);
  }
}
</style>
