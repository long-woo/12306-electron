<template>
  <div>
    <input type="text" v-model="selectText" :class="inputClass" class="form-control" :placeholder="placeholder" @input="change" @keyup.up="up" @keyup.down="down" @keyup.enter="enter" />
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
    dropdownData: Array
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
      this.selectData = this.filterData[this.selectIndex]
      this.selectText = this.selectData.text
      this.show = false

      this.$emit('onSelect', this.selectData)
    },
    change (e) {
      e = e || window.event

      let value = this.selectText

      if (!this.selectText) {
        this.show = false
        return
      }

      this.filterData = this.dropdownData.filter(val =>
        val.text.toLowerCase().indexOf(value) > -1 || val.firstPY.toLowerCase().indexOf(value) > -1 || val.fullPY.toLowerCase().indexOf(value) > -1
      )

      if (!this.filterData.length) return
      this.selectIndex = 0
      this.show = true
    }
  }
}
</script>

<style scoped>
.form-control {
  width: 100%
}
</style>

