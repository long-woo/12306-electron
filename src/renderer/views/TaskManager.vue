<template>
  <div class="task-manager h-100">
    <div class="d-flex flex-column h-100" v-if="taskData">
      <div class="task-manager-header">
        <div class="row text-center bg-info text-white pt-3 pb-2">
          <div class="col-sm-5">
            <h4>{{taskData.currentTrain.fromCityName}}</h4>
            <p>{{taskData.currentTrain.departureTime}}</p>
          </div>
          <div class="col-sm-2">
            <p>{{taskData.currentTrain.trainCode}}</p>
            <p>
              <i class="iconfont icon-long-right-arrow"></i>
            </p>
            <p class="task-manager-time">{{taskData.queryInfo.trainDate}}</p>
          </div>
          <div class="col-sm-5">
            <h4>{{taskData.currentTrain.toCityName}}</h4>
            <p>{{taskData.currentTrain.arrivalTime}}</p>
          </div>
        </div>
        <div class="row text-right bg-info text-white pb-2">
          <div class="col-sm-12">{{taskData.passengers.passengerName}}</div>
        </div>
      </div>
      <div class="task-manager-status m-auto">
        <p class="task-manager-seat">{{taskData.currentTrain.seatText}}</p>
        <p class="task-status-desc">{{taskData.statusText}}</p>
      </div>
    </div>
    <div class="alert alert-warning text-center mt-3" v-else>您还没有
      <strong>添加任务</strong>^~^</div>
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

.task-manager-status .task-manager-seat {
  color: rgba(23, 162, 184, 0.2);
  font-size: 5rem;
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: -1;
}
</style>
