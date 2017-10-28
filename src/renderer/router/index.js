import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      component: Main,
      children: [
        {path: '', component: () => import('@/views/NewTask')},
        {path: 'taskmanager', component: () => import('@/views/TaskManager')},
        {path: 'myorder', component: () => import('@/views/MyOrder')}
      ]
    }
  ]
})
