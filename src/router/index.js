import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView'
import PrintableView from '../views/PrintableView'
import { auth} from '@/firebaseConfig'
import TextEditor from '../components/TextEditor.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: TextEditor,
  },
  // {
  //   path: '/:folder/:doc',
  //   name: 'document',
  //   component: DocumentView,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/settings',
  //   name: 'settings',
  //   component: SettingsView,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  {
    path: '/doc/:id/print',
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
  routes
});

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