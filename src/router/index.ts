import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'
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
          meta: { role: ['admin', 'user', 'manager'], title: '首页', is_menu: true }
        },
        {
          path: '/validate',
          name: 'Validate',
          component: Validate,
          meta: { role: ['admin', 'user', 'manager'], title: '校验', is_menu: false }
        },
        {
          path: '/settings',
          name: 'Settings',
          component: Settings,
          meta: { role: ['admin', 'user', 'manager'], title: '系统设置', is_menu: true }
        },
        {
          path: '/svgIcon',
          name: 'SvgIcon',
          component: SvgIcon,
          meta: { role: ['admin', 'user', 'manager'], title: 'icon设置', is_menu: false }
        },
        {
          path: '/menulist',
          name: 'MenuList',
          component: MenuList,
          meta: { role: ['admin', 'user', 'manager'], title: '菜单列表', is_menu: true }
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
router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    //1.当前 访问路由
    // console.log(to.meta.role)

    if (to.meta.role) {
      //2.获取当前用户自己的角色
      //3.to.meta.role角色列表['admin',''user]
      let userRole: string = 'user'
      let allowRoleList: string[] = to.meta.role as []
      if (allowRoleList.indexOf(userRole) === -1) {
        next({ name: 'login' })
      } else {
        next()
      }
    } else {
      next()
    }
  },
)
export default router
