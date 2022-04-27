<template>
  <div class="sidebar-color" :class="fromMobile ? 'sidebar-menu-mobile' : 'sidebar-menu-desktop'">
    <ul class="space-y-3 m-4">
        <li class="content-center">
            <img class="max-w-[50%] mx-auto" alt="TooDoo logo" src="../assets/logo_orange.png" />
        </li>
        <li>
            <button type="button" class="sidebar-button w-full" @click="showDocs=!showDocs">
                <span>Default</span>
            </button>
            <ul v-if="showDocs" class="py-2 space-y-2">
                <li v-for="doc in docArray" :key="doc.title">
                    <a @click="goToDoc(doc.id)" class="doc-button">{{doc.title}}</a>
                </li>
            </ul>
        </li>
        <li>
            <div class="sidebar-button">
            <login-button />
            </div>
        </li>
    </ul>
  </div>
</template>

<script setup>
import loginButton from './loginButton.vue';
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import {db, auth } from "./../firebaseConfig";
import {useRouter} from "vue-router"
import {defineProps, ref} from 'vue'
defineProps({
"fromMobile": Boolean
})
const router = useRouter()
let showDocs = ref(false)
let docArray = ref([])
let goToDoc = (id) => {
    router.push(`/editor/${id}`)
}
const q = query(collection(db, "users", auth.currentUser.uid, "notes"), orderBy("timestamp", "desc"), );
    getDocs(q).then((data) => {
        let dArr = []
        data.forEach((d) => {
            dArr.push({title:d.data().title, data:d.data().data, id: d.id})
        })
        docArray.value = dArr
    })
</script>

<style>

</style>