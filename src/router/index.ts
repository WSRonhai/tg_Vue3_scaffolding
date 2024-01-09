import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/layout/Login.vue'
import Dashboard from '@/views/layout/Dashboard.vue'
import MenuList from '@/views/layout/MenuList.vue'
import Settings from '@/views/layout/Settings.vue'
import HomeView from '@/views/layout/HomeView.vue'

import SvgIcon from '@/views/demo/SvgIcon.vue'
import Validate from '@/views/demo/Validate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/home',
          name: 'HomeView',
          component: HomeView,
        },
        {
          path: '/validate',
          name: 'Validate',
          component: Validate,
        },
        {
          path: '/settings',
          name: 'Settings',
          component: Settings,
        },
        {
          path: '/svgIcon',
          name: 'SvgIcon',
          component: SvgIcon,
        },
        {
          path: '/menulist',
          name: 'MenuList',
          component: MenuList,
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
})

export default router
