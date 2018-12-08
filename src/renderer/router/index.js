import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {path: '', name: 'NewTask', component: () => import('@/views/NewTask')},
        {path: 'taskmanager', name: 'TaskManager', component: () => import('@/views/TaskManager')},
        {path: 'myorder', name: 'MyOrder', component: () => import('@/views/MyOrder')}
      ]
    }
  ]
})
