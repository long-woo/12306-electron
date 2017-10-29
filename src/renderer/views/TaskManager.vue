<template>
  <div>
    <div class="row">
      <div class="col-10 border border-info border-left-0 border-right-0 border-bottom-0 pr-0">
        <div class="task-header border-b-dashed-1 p-2">
          <span>正在查询G2321二等座...</span>
        </div>
        <div class="task-body border-b-dashed-1 p-2">乘客</div>
        <div class="task-footer p-2">车次</div>
      </div>
      <div class="col-2 bg-danger text-white d-flex align-items-center justify-content-center btn-task-del">
        <span>移除</span>
      </div>
    </div>
    <div class="alert alert-warning text-center" v-if="!taskData.length">您还没有<strong>添加任务</strong>^~^</div>
  </div>
</template>

<script>
export default {
  name: 'TaskManager',
  data () {
    return {
      taskData: this.$store.getters.taskData
    }
  },
  methods: {
    // 移除任务
  }
}
</script>

<style scoped>
.btn-task-del {
  cursor: pointer;
}

.btn-task-del.bg-danger:hover,
.btn-task-del.bg-danger:active{
  background-color: rgba(220, 53, 69, 0.8) !important;
}
</style>
