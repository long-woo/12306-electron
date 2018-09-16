<template>
  <div class="task-manager h-100">
    <div class="d-flex flex-column h-100">
      <!-- <div class="col-10 border border-info border-left-0 border-right-0 border-bottom-0 pr-0">
        <div class="task-header p-2 bg-info text-white row mr-0 d-flex flex-row justify-content-between">
          <div>
            <span>{{taskData.statusText}}</span>
          </div>
          <div>
            <span>{{taskData.queryInfo.trainDate}}</span>
          </div>
        </div>
        <div class="task-body border-b-dashed-1 p-2">
          <span>
            {{taskData.passengers.passengerName}}
          </span>
        </div>
        <div class="task-footer p-2 bg-light row mr-0 pl-3">
          <span>
            {{taskData.trains.toString()}}
          </span>
        </div>
      </div>
      <div class="col-2 bg-danger text-white d-flex align-items-center justify-content-center btn-task-del" @click="removeTask">
        <span>移除</span>
      </div> -->
      <div class="task-manager-header">
        <div class="row text-center bg-info text-white pt-3 pb-2">
          <div class="col-sm-5">
            <h4>昆山南</h4>
            <p>08:15</p>
          </div>
          <div class="col-sm-2">
            <p>G657</p>
            <p>
              <i class="iconfont icon-long-right-arrow"></i>
            </p>
            <p class="task-manager-time">2018-09-09</p>
          </div>
          <div class="col-sm-5">
            <h4>上海虹桥</h4>
            <p>08:30</p>
          </div>
        </div>
        <div class="row text-right bg-info text-white pb-2">
          <div class="col-sm-12">long.woo</div>
        </div>
      </div>
      <div class="task-manager-status m-auto">
        <p class="task-manager-seat">二等座</p>
        <p class="task-status-desc">正在查询...</p>
      </div>
    </div>
    <!-- <div class="alert alert-warning text-center" v-else>您还没有
      <strong>添加任务</strong>^~^</div> -->
  </div>
</template>

<script>
import OrderTask from '../utils/task'

export default {
  name: 'TaskManager',
  data () {
    return {
      taskData: this.$store.getters.taskData
    }
  },
  methods: {
    // 移除任务
    removeTask () {
      OrderTask.stop()
      OrderTask.stopOrderAwaitFunc()
      this.$store.dispatch('deleteTaskData')
    }
  }
}
</script>

<style scoped>
.task-manager h4,
.task-manager p {
  margin-bottom: 0;
}

.task-manager-header .icon-long-right-arrow {
  font-size: 4.5rem;
  margin-top: -3.3rem;
}

.task-manager-time {
  font-size: 0.75rem;
  margin-top: -3rem;
}

.task-manager-status {
}

.task-manager-status .task-manager-seat {
  color: rgba(23, 162, 184, 0.2);
  font-size: 5rem;
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: -1;
}
</style>
