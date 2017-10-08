<template>
  <div class="bs-toast"></div>
</template>

<style scoped>
.bs-toast {

}
</style>

<script>
export default {
  name: 'bToast',
  data () {
    return {
      show: false,
      content: '',
      onHide: false
    }
  }
}
</script>
