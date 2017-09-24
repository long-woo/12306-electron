<template>
  <div>
    <b-form-input v-model="selectText" :class="inputClass" :placeholder="placeholder" @input="change"></b-form-input>
    <div class="dropdown-menu" :class="{'show': show}">
      <b-dropdown-header v-if="dropdownHeader">{{dropdownHeader}}</b-dropdown-header>
      <b-dropdown-item :class="{'active': isActive(index)}" v-for="(item, index) in dropdownData" :key="index" @click="itemClick(index)">{{item.text}}</b-dropdown-item>
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
      selectText: this.dropdownData[0].text || '',
      selectData: null
    }
  },
  props: {
    inputClass: String,
    placeholder: String,
    dropdownHeader: String,
    dropdownData: Array
  },
  watch: {
    selectIndex (value) {
      this.selectData = this.dropdownData[value]
    }
  },
  methods: {
    isActive (index) {
      return index === this.selectIndex
    },
    itemClick (index) {
      this.selectIndex = index
      this.show = false
      this.$emit('onSelect', this.selectData)
    },
    up () {
      this.selectIndex = this.selectIndex-- < 0 ? this.dropdownData.length - 1 : this.selectIndex--

      this.$emit('onSelect', this.selectData)
    },
    down () {
      this.selectIndex = this.selectIndex++ > this.dropdownData.length - 1 ? 0 : this.selectIndex++

      this.$emit('onSelect', this.selectData)
    },
    enter () {
      this.selectData = this.dropdownData[this.selectIndex]
      this.show = false

      this.$emit('onSelect', this.selectData)
    },
    change (val, e) {
      e = e || window.event

      if (!this.selectText) {
        this.show = false
        return
      }

      console.log(e)
      this.selectIndex = 0
      this.show = true
      this.$emit('onSelect', this.selectData)
    }
  }
}
</script>

<style scoped>
.form-control {
  width: 100%
}
</style>

