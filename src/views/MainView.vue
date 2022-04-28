<template>
  <div>
    <mobile-navbar class="mobile-nav-enable"> </mobile-navbar>
    <div class="desktop-grid">
        <sidebar-desktop :fromMobile="false"> </sidebar-desktop>
        <div class="sm:col-start-2 sm:col-span-4 overflow-auto h-screen">
            <text-editor v-if="!notesEmpty"/>
            <no-documents v-else/>
        </div>
    </div>
  </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import SidebarDesktop from '@/components/SidebarDesktop.vue';
    import MobileNavbar from '@/components/MobileNavbar.vue';
    import TextEditor from '@/components/TextEditor.vue';
    import NoDocuments from '@/components/NoDocuments.vue';
    import {db, auth } from "./../firebaseConfig";
    import { doc, collection, query, getDocs, setDoc } from "firebase/firestore";

    const route = useRoute();
    const docE = route.params['doc'];

    let notesEmpty = false;
    if (!docE) {
        notesEmpty = true;
    }
    
    // IMPORTANT!!!
    const userExists = query(collection(db, "users"));
    getDocs(userExists).then((data) => {
        var found = false;
        data.forEach((d) => {
            if(d.id == auth.currentUser.uid){
                found = true;
            }
        });
        if(!found){
            // if user info is not on database, then add user default data
            const folders_ = ['default'];
            setDoc(doc(db, "users", auth.currentUser.uid), {
                folders : folders_,
            });
        }
    });

</script>

<style>

</style>