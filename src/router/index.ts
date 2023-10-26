import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/match',
      component: () => import('@/components/match/MatchList.vue')
    },
    {
      path: '/refreeRoleGroup',
      component: () => import('@/components/refree/refreeRole/RefreeRoleGroup.vue')
    },
    {
      path: '/refreeRole',
      component: () => import('@/components/refree/refreeRole/RefreeRole.vue')
    },
    {
      path: '/eyeRefree',
      component: () => import('@/components/refree/eyeRefree/EyeRefree.vue')
    },
    {
      path: '/aRefree',
      component: () => import('@/components/refree/aRefree/ARefree.vue')
    },
    {
      path: '/dRefree',
      component: () => import('@/components/refree/dRefree/DRefree.vue')
    },
    {
      path: '/eRefree',
      component: () => import('@/components/refree/eRefree/ERefree.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
