<template>
  <div class="sidebar-color" :class="fromMobile ? 'sidebar-menu-mobile' : 'sidebar-menu-desktop'">
    <ul class="space-y-3 h-9/10 max-h-9/10">
        <li class="content-center pt-5">
            <img class="max-w-[50%] mx-auto" alt="TooDoo logo" src="../assets/logo_orange.png" />
        </li>
        <li class="mr-2">
            <add-folder-button />
        </li>
        <folders-layout />
    </ul>
    <ul>
        <add-document-button />
    </ul>
    <ul class="sidebar-logout-container">
        <div class="sidebar-logout-button">
            <login-button />
        </div>
    </ul>
  </div>
</template>


<script>
import AddFolderButton from './AddFolderButton.vue';
import loginButton from './loginButton.vue';
import FoldersLayout from "@/components/FoldersLayout.vue";
import AddDocumentButton from './AddDocumentButton.vue';
export default {
    components: { loginButton, AddFolderButton, FoldersLayout, AddDocumentButton },
    name: "SidebarDesktop",
    props: ["fromMobile"],
}
</script>

<style scoped>
.testing {
    background-color: aqua;
}
</style>