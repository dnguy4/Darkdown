<template>
  <div>
    <mobile-navbar class="mobile-nav-enable" @sidebarOpen="editorReadOnly"> </mobile-navbar>
    <div class="desktop-grid">
        <sidebar-desktop :fromMobile="false"> </sidebar-desktop>
        <div class="sm:col-start-2 sm:col-span-4 overflow-auto h-screen" :key="notesEmpty">
            <text-editor v-if="!notesEmpty" :sidebarOpen="sidebarToggle"/>
            <no-documents v-else/>
        </div>
    </div>
  </div>
</template>

<script setup>
    import {watch, ref} from 'vue';
    import { useRoute } from 'vue-router'
    import SidebarDesktop from '@/components/SidebarDesktop.vue';
    import MobileNavbar from '@/components/MobileNavbar.vue';
    import TextEditor from '@/components/TextEditor.vue';
    import NoDocuments from '@/components/NoDocuments.vue';
    import {db, auth } from "./../firebaseConfig";
    import { doc, collection, query, getDocs, setDoc } from "firebase/firestore";

    const route = useRoute();
    const docE = route.params['doc'];

    let notesEmpty = ref(false);
    let sidebarToggle = ref(false);
    if (!docE) {
        notesEmpty.value = true;
    }

    // eslint-disable-next-line 
    watch(() => route.params,(toParams, previousParams) => { 
      if (route.path.includes("editor")  &&  "doc" in toParams) 
        notesEmpty.value = false;
      else
        notesEmpty.value = true;
    })
    
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

    function editorReadOnly(value) {
      sidebarToggle.value = value;
    }
</script>

<style>

</style>