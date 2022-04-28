<template>
  <div>
    <mobile-navbar class="mobile-nav-enable"> </mobile-navbar>
    <div class="desktop-grid">
        <sidebar-desktop :fromMobile="false"> </sidebar-desktop>
        <div class="sm:col-start-2 sm:col-span-4 overflow-auto h-screen" :key="notesEmpty">
            <text-editor v-if="!notesEmpty"/>
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

    const route = useRoute();
    const doc = route.params['doc'];

    let notesEmpty = ref(false);
    if (!doc) {
        notesEmpty.value = true;
    }

    // eslint-disable-next-line 
    watch(() => route.params,(toParams, previousParams) => { 
      if (route.path.includes("editor")  &&  "doc" in toParams) 
        notesEmpty.value = false;
      else
        notesEmpty.value = true;
    })

</script>

<style>

</style>