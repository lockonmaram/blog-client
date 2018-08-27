import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '/:articleId',
        name: 'article',
        component: () => import(/* webpackChunkName: "article" */ './components/Article.vue'),
        props: true
      }]
    },
    {
      path: '/user/form',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ './views/User.vue'),
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem('token')
        if (!token) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/article/add',
      name: 'AddArticle',
      component: () => import(/* webpackChunkName: "addarticle" */ './views/AddArticle.vue'),
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem('token')
        if (token) {
          next()
        } else {
          next('/')
        }
      }
    },
  ]
})
