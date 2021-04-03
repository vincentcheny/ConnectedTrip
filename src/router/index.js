import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Result from '@/components/Result'
import Contact from '@/components/Contact'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Result/:numDays',
      name: 'Result',
      component: Result
    },
    {
      path: '/Recommend',
      name: 'Result',
      component: Result
    },
    {
      path: '/About Us',
      name: 'Contact',
      component: Contact
    }
  ]
})
