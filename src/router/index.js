import Vue from 'vue'
import Router from 'vue-router'
import searchbar from '@/components/SearchBar'
import ChildOne from '@/components/childOne'
import ChildTwo from '@/components/childTwo'
import Log from '@/components/log'
import contact from '@/components/contact'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'searchbar',
      component: searchbar
    },
    {
      path: '/one',
      name: 'ChildOne',
      component: ChildOne,
      children: [
        {
          path: 'log',
          component: Log
        }
      ]
    },
    {
      path: '/two',
      name: 'ChildTwo',
      component: ChildTwo
    },
    {
      path: '/About Us',
      name: 'contact',
      component: contact
    }
  ]
})
