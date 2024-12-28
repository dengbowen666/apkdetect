import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import staticPage from '../views/staticPage.vue'
import dynamicPage from '../views/dynamicPage.vue'
import systemPage from '../views/systemPage.vue'
import dynamicContent from '../views/dynamicContent.vue'
import codeView  from '../views/codeView.vue'
import helperPage from '../views/helperComponent.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/static',
      name: 'static',
      component: staticPage,
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: dynamicPage,
      // children: [
      //   {
      //     path: ':id',
      //     name: 'dynamicContent',
      //     component: dynamicContent
      //   }
      // ]
    },
    {
      path: '/dynamicContent/:id',
      name: 'dynamicContent',
      component: dynamicContent
    },
    {
      path: '/system',
      name: 'system',
      component: systemPage
    },
    {
      path: '/helper',
      name: 'helper',
      component: helperPage
    },
    {
      path: '/codeView/:id',
      name: 'codeView',
      component: codeView,
    }
  ]
})

export default router
