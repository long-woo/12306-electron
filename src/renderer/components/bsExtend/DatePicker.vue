<template>
  <b-input-group>
    <b-input-group-button>
      <b-button variant="info" class="no-outline waves-effect" :disabled="prevState" @click="changeDate('-')">&lt;</b-button>
    </b-input-group-button>
    <date-picker :date="date" :option="option" :limit="limit" @change="changeDate">
    </date-picker>
    <b-input-group-button>
      <b-button variant="info" class="no-outline waves-effect" :disabled="nextState" @click="changeDate('+')">&gt;</b-button>
    </b-input-group-button>
  </b-input-group>
</template>

<script>
import moment from 'moment'
import datePicker from 'vue-datepicker/vue-datepicker-es6'

export default {
  name: 'bDatePicker',
  data () {
    return {
      prevState: false,
      nextState: true,
      date: {
        time: this.max
      },
      option: {
        type: 'day',
        SundayFirst: true,
        week: ['日', '一', '二', '三', '四', '五', '六'],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        format: this.format,
        placeholder: this.placeholder,
        buttons: {
          ok: '确定',
          cancel: '取消'
        },
        inputStyle: {
          display: 'block',
          width: '100%',
          padding: '0.5rem 0.75rem',
          fontSize: '1rem',
          lineHeight: 1.25,
          color: '#495057',
          backgroundColor: '#fff',
          backgroundImage: 'none',
          backgroundClip: 'padding-box',
          border: '1px solid rgba(0, 0, 0, 0.15)',
          transition: 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s'
        },
        inputClass: this.inputClass
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
    inputClass: {
      type: String,
      default: 'form-control'
    },
    min: {
      type: String,
      default: moment().format('YYYY-MM-DD')
    },
    max: {
      type: String,
      default: moment().add(29, 'd').format('YYYY-MM-DD')
    },
    limit: {
      type: Array,
      default () {
        return [
          {
            type: 'fromto',
            from: moment().subtract(1, 'd').format('YYYY-MM-DD'),
            to: moment().add(30, 'd').format('YYYY-MM-DD')
          }
        ]
      }
    }
  },
  components: {
    datePicker
  },
  methods: {
    // 更改乘车日期
    changeDate (date) {
      const value = moment(this.date.time)

      if (date === '-') {
        date = value.subtract(1, 'd').format('YYYY-MM-DD')
      } else if (date === '+') {
        date = value.add(1, 'd').format('YYYY-MM-DD')
      }

      if (moment(date) <= moment(this.min)) {
        this.prevState = true
      } else {
        this.prevState = false
      }

      if (moment(date) >= moment(this.max)) {
        this.nextState = true
      } else {
        this.nextState = false
      }

      if (moment(date) < moment(this.min) || moment(date) > moment(this.max)) return

      this.date.time = date
      this.$emit('change', date)
    }
  }
}
</script>

<style>
.cov-vue-date .cov-date-body[data-v-46d671c2] {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  font-weight: normal;
}
</style>
