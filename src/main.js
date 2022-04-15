import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from "@/firebaseConfig";
import './index.css'
import CKEditor from '@ckeditor/ckeditor5-vue';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).use(CKEditor).mount('#app')
  }
})