<template>
  <div>
    <input type="text" :value="selectText" :class="inputClass" class="form-control" :placeholder="placeholder" @input="change" @keyup.up="up" @keyup.down="down" @keyup.enter="enter" ref="inputEl" />
    <div class="dropdown-menu" :class="{'show': show}">
      <b-dropdown-header v-if="dropdownHeader">{{dropdownHeader}}</b-dropdown-header>
      <b-dropdown-item :class="{'active': isActive(index)}" v-for="(item, index) in filterData" :key="index" @click="itemClick(index)">{{item.text}}</b-dropdown-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bAutocomplete',
  data () {
    return {
      show: false,
      selectIndex: 0,
      selectText: '',
      selectData: null,
      filterData: []
    }
  },
  props: {
    inputClass: String,
    placeholder: String,
    dropdownHeader: String,
    dropdownData: Array,
    value: Object,
    maxCount: {
      type: Number,
      default: 6
    },
    filterText: Array
  },
  // computed: {
  //   listeners () {
  //     return {
  //       ...this.$listeners,

  //     }
  //   }
  // },
  watch: {
    value (newVal) {
      this.selectData = newVal
      this.selectText = newVal.text
    }
  },
  methods: {
    isActive (index) {
      return index === this.selectIndex
    },
    itemClick (index) {
      this.selectIndex = index
      this.selectData = this.filterData[index]
      this.selectText = this.selectData.text
      this.show = false
      this.$emit('onSelect', this.selectData)
    },
    up () {
      this.selectIndex--

      if (this.selectIndex < 0) {
        this.selectIndex = this.filterData.length - 1
      }
    },
    down () {
      this.selectIndex++

      if (this.selectIndex > this.filterData.length - 1) {
        this.selectIndex = 0
      }
    },
    enter () {
      if (!this.filterData.length) return

      this.selectData = this.filterData[this.selectIndex]
      this.selectText = this.selectData.text
      this.show = false

      this.$emit('onSelect', this.selectData)
    },
    change (e) {
      e = e || window.event

      let value = e.target.value
      this.selectText = value
      this.$emit('inputChange', value)

      if (!value) {
        this.show = false
        return
      }

      let arrData = []
      let index = 0

      this.dropdownData.forEach((val) => {
        if ((val.text.toLowerCase().indexOf(value) > -1 || (val.firstPY && val.firstPY.toLowerCase().indexOf(value) > -1) || (val.fullPY && val.fullPY.toLowerCase().indexOf(value) > -1)) && this.maxCount > index) {
          arrData.push(val)
          index++
        }
      })

      this.filterData = arrData

      if (!this.filterData.length) {
        this.show = false
        return
      }
      this.selectIndex = 0
      this.show = true
    },
    focus () {
      this.$refs.inputEl.focus()
    }
  }
}
</script>

<style scoped>
.form-control {
  width: 100%
}
</style>

