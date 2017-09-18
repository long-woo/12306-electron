<template>
  <div>
    <b-form-input v-model="selectText"></b-form-input>
    <div class="dropdown-menu" :class="{'show': show}">
      <b-dropdown-header>{{dropdownHeader}}</b-dropdown-header>
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
      selectText: this.dropdownData[0]
    }
  },
  props: {
    dropdownHeader: String,
    dropdownData: Array,
    selectValue: String
  },
  methods: {
    isActive (index) {
      return index === this.selectIndex
    },
    itemClick (index) {
      this.selectIndex = index
      this.selectData = this.dropdownData[index]
      this.show = false
    }
  }
}
</script>
