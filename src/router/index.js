import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView'
import PrintableView from '../views/PrintableView'
import { auth} from '@/firebaseConfig'
import MainView from '../views/MainView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/editor',
    name: 'editor',
    component: MainView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/editor/:doc',
    name: 'document',
    props: true,
    component: MainView,
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: '/settings',
  //   name: 'settings',
  //   component: SettingsView,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  {
    path: '/editor/:doc/print',
    name: 'printable',
    component: PrintableView,
    props: true,
    meta: {
          requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/')
    // could also just fire off a redirect login here, or redirect based on a meta property!
  } else {
    next()
  }
})

export default router