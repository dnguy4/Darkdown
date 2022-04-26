<template>
  <div>
    <mobile-navbar class="mobile-nav-enable" @sidebarOpen="editorReadOnly"> </mobile-navbar>
    <div class="desktop-grid">
        <sidebar-desktop :fromMobile="false"> </sidebar-desktop>
        <div class="sm:col-start-2 sm:col-span-4 overflow-auto h-screen">
            <text-editor v-if="!notesEmpty" :sidebarOpen="sidebarToggle"/>
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

    const route = useRoute();
    const doc = route.params['doc'];

    let notesEmpty = false;
    let sidebarToggle = false;
    if (!doc) {
        notesEmpty = true;
    }

    function editorReadOnly(value) {
      sidebarToggle = value;
    }
    

</script>

<style>

</style>