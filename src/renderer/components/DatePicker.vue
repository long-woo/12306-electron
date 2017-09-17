<template>
  <date-picker :date="date" :option="option" :limit="limit">
  </date-picker>
</template>

<script>
import moment from 'moment'
import datePicker from 'vue-datepicker/vue-datepicker-es6'

export default {
  name: 'bDatePicker',
  data () {
    return {
      date: {
        time: moment().format('YYYY-MM-DD')
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
          borderRadius: '0.25rem',
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
    limit: {
      type: Array,
      default () {
        return [
          {
            type: 'fromto',
            from: new Date()
          }
        ]
      }
    }
  },
  components: {
    datePicker
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
