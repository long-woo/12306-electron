import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:nav',
      component: Main,
      children: [
        {path: 'newtask', component: () => import('@/views/NewTask')},
        {path: 'taskmanager', component: () => import('@/views/TaskManager')}
      ]
    }
  ]
})
