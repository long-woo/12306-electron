<template>
  <div>
    <div class="form-row form-group">
      <div class="col-sm-8">
        <b-input-group class="bs-input-group">
          <b-form-input slot="left" placeholder="输入出发地" class="bs-input-left"></b-form-input>
          <b-button variant="info" class="bs-input-center">
            <i class="iconfont icon-change"></i>
          </b-button>
          <b-form-input slot="right" placeholder="输入目的地" class="bs-input-right"></b-form-input>
        </b-input-group>
      </div>
      <div class="col-sm-3">
        <b-form-input placeholder="乘车日期"></b-form-input>
      </div>
      <div class="col-sm-1">
        <b-button variant="info">
          <i class="iconfont icon-search"></i>
        </b-button>
      </div>
    </div>
    <b-table empty-text="没有找到车次" :fields="fields" head-variant="inverse" striped hover show-empty></b-table>
  </div>
</template>

<script>
export default {
  name: 'NewTask',
  data () {
    return {
      fields: {
        trainNo: {label: '车次', sortable: true},
        fromCity: {label: '出发地'},
        toCity: {label: '目的地'},
        remak: {label: '备注'}
      }
    }
  }
}
</script>

<style scoped>
.bs-input-left {
  border-right: 0;
}

.bs-input-center {
  border-radius: 0;
}

.bs-input-center:focus {
  box-shadow: 0 0 0 transparent;
}

.bs-input-right {
  border-left: 0;
}
</style>
