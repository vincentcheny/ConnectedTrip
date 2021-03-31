import Vue from 'vue'
import Router from 'vue-router'
import searchbar from '@/components/SearchBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'searchbar',
      component: searchbar
    }
  ]
})
