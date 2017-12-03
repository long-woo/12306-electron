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
    const res = await this.$api.getQueryUrl()
    this.$store.dispatch('setQueryUrl', res)
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

html,body {
  height: 100%;
}

body {
  -webkit-user-select: none;
  -webkit-app-region: drag;
  overflow: hidden;
}

input,
a,
.btn {
  -webkit-app-region: no-drag;
}

a:focus {
  outline: none !important;
}

.table {
  margin-bottom: 0;
}

button {
  cursor: pointer;
}

label {
  margin-bottom: 0 !important;
}

.font-size-14{
  font-size: 0.875rem !important;
}

#nprogress .bar {
  background-color: #17a2b8 !important;
}

#nprogress .spinner,
#nprogress .bar {
  z-index: 999999 !important;
}

#nprogress .spinner-icon {
  border-top-color: #41B883;
  border-left-color: #41B883;
}

.radio, .checkbox {
  margin-bottom: 0 !important;
}

.radio > input[type="radio"]:first-child:checked + label::before,
.checkbox > input[type="checkbox"]:first-child:checked + label::before,
.radio > input[type="radio"]:first-child:checked + input[type="hidden"] + label::before,
.checkbox > input[type="checkbox"]:first-child:checked + input[type="hidden"] + label::before {
  content: "\e7bc" !important;
  font-family: 'iconfont' !important;
  font-size: 1.2rem !important;
}

.iconfont {
  display: inline-block !important;
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

.ani-slide-up {
  animation: slideUp 0.3s ease forwards;
}

.ani-slide-down {
  animation: slideDown 0.3s ease forwards;
}

.form-control:focus,
.sorting,
.close:focus {
  box-shadow: 0 0 0 transparent !important;
  outline: none;
}

.swal-about .swal-icon--custom {
  width: 6rem;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  
  to {
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    transform: translateY(0);
  }
  
  to {
    transform: translateY(100%);
  }
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
