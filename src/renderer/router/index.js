import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:nav',
      name: 'Main',
      component: Main,
      children: [
        {path: '', component: () => import('@/views/NewTask')}
      ]
    },
    {
      path: '*',
      redirect: '/newtask'
    }
  ]
})
