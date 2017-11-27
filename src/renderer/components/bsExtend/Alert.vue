<<template>
  <div class="bs-alert text-center text-white" :class="className" v-show="show">{{content}}</div>
</template>

<style scoped>
.bs-alert {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 0.3rem 1rem;
  z-index: 666666;
}
</style>

<script>
export default {
  name: 'bAlert',
  data () {
    return {
      show: false,
      className: 'bg-warning',
      content: '',
      timeout: 2000,
      onHide: false
    }
  }
}
</script>
