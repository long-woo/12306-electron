<template>
  <b-input-group>
    <b-input-group-prepend>
      <b-button variant="info" class="no-outline waves-effect" :disabled="prevState" @click="changeDate('-')">&lt;</b-button>
    </b-input-group-prepend>
    <input ref="dateEl" class="form-control" :value="date" :placeholder="placeholder" />
    <b-input-group-append>
      <b-button variant="info" class="no-outline waves-effect" :disabled="nextState" @click="changeDate('+')">&gt;</b-button>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
/**
 * 转date
 * {*} params date
 */
const getDate = (date) => {
  if (date) {
    date = typeof date === 'string' ? date.replace(/-|[.]/ig, '/') : date

    return new Date(date)
  }

  return new Date()
}

/**
 * 格式化日期
 * {*} params date
 */
const formatDate = (date) => {
  date = getDate(date)

  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let d = date.getDate().toString()

  month = month.toString().padStart(2, '0')
  d = d.padStart(2, '0')

  return `${year}-${month}-${d}`
}

/**
 * 添加天数
 * {day} params 天数
 * {date} params 日期
 */
const addDay = (day, date) => {
  const nowDate = date ? getDate(date).getTime() : getDate().getTime()
  const newDate = getDate(nowDate + day * 24 * 60 * 60 * 1000)

  return newDate
}

/**
 * 减去天数
 * {day} params 天数
 * {date} params 日期
 */
const subtractDay = (day, date) => {
  const nowDate = date ? getDate(date).getTime() : getDate().getTime()
  const newDate = getDate(nowDate - day * 24 * 60 * 60 * 1000)

  return newDate
}

/**
 * 当前日期
 */
const getNowDate = () => {
  const nowDate = getDate()

  return formatDate(nowDate)
}

/**
 * 最大日期
 */
const getMaxDate = (day) => {
  const maxDate = addDay(day)

  return formatDate(maxDate)
}

export default {
  name: 'bDatePicker',
  data () {
    return {
      prevState: false,
      nextState: true,
      date: this.max
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
        theme: '#17a2b8',
        done: (value) => {
          this.changeDate(getDate(value))
        }
      })
    },
    // 更改乘车日期
    changeDate (date) {
      const value = this.date

      if (date === '-') {
        date = subtractDay(1, value)
      } else if (date === '+') {
        date = addDay(1, value)
      }

      this.prevState = date <= getDate(this.min)
      this.nextState = date >= getDate(this.max)

      if (date < getDate(this.min) || date > getDate(this.max)) return

      date = formatDate(date)
      this.date = date
      this.$emit('change', date)
    }
  }
}
</script>
