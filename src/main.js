import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from "@/firebaseConfig";
import './index.css'
let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount('#app')
  }
})