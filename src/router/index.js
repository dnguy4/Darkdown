import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView'
import { auth, provider } from '@/firebaseConfig'
import { signInWithRedirect } from "firebase/auth";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../components/TextEditor.vue'),
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
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    signInWithRedirect(auth, provider).then((result) => {
      console.log("success " + result)
    })
    .catch(err => {
      console.log(err);
      next("/")
    });
    next('/'); //requiring login to reach all pages
  }
  else next();
})

export default router
