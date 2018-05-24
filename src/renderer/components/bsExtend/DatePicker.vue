<template>
  <b-input-group>
    <b-input-group-prepend>
      <b-button variant="info" class="no-outline waves-effect" :disabled="prevState" @click="changeDate('-')">&lt;</b-button>
    </b-input-group-prepend>
    <input ref="dateEl" class="form-control col pl-0 pr-0 " :placeholder="placeholder" />
    <b-input-group-append>
      <b-button variant="info" class="no-outline waves-effect" :disabled="nextState" @click="changeDate('+')">&gt;</b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
function getNowDate () {
  const nowDate = new Date()
  const year = nowDate.getFullYear()
  const month = nowDate.getMonth() + 1
  const date = nowDate.getDate()

  return `${year}-${month}-${date}`
}

function getMaxDate (day) {
  const nowDate = new Date().getTime()
  const maxDate = new Date(nowDate + day * 24 * 60 * 60 * 1000)
  const year = maxDate.getFullYear()
  const month = maxDate.getMonth() + 1
  const date = maxDate.getDate()

  return `${year}-${month}-${date}`
}

export default {
  name: 'bDatePicker',
  data () {
    return {
      prevState: false,
      nextState: true,
      date: {
        time: this.max
      }
    }
  },
  props: {
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    placeholder: {
      type: String,
      default: '乘车日期'
    },
    min: {
      type: String,
      default: getNowDate()
    },
    max: {
      type: String,
      default: getMaxDate(29)
    }
  },
  mounted () {
    this.initLayDate()
  },
  methods: {
    // 初始化日期组件
    initLayDate () {
      window.laydate.render({
        elem: this.$refs.dateEl,
        min: this.min,
        max: this.max,
        calendar: true,
        theme: '#17a2b8'
      })
    },
    // 更改乘车日期
    changeDate (date) {
      // const value = moment(this.date.time)

      // if (date === '-') {
      //   date = value.subtract(1, 'd').format('YYYY-MM-DD')
      // } else if (date === '+') {
      //   date = value.add(1, 'd').format('YYYY-MM-DD')
      // }

      // if (moment(date) <= moment(this.min)) {
      //   this.prevState = true
      // } else {
      //   this.prevState = false
      // }

      // if (moment(date) >= moment(this.max)) {
      //   this.nextState = true
      // } else {
      //   this.nextState = false
      // }

      // if (moment(date) < moment(this.min) || moment(date) > moment(this.max)) return

      // this.date.time = date
      // this.$emit('change', date)
    }
  }
}
</script>
