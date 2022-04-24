<template>
  <div class="sidebar-color" :class="fromMobile ? 'sidebar-menu-mobile' : 'sidebar-menu-desktop'">
    <ul class="space-y-3 m-4">
        <li class="content-center">
            <img class="max-w-[50%] mx-auto" alt="TooDoo logo" src="../assets/logo_orange.png" />
        </li>
        <li>
            <add-folder-button />
        </li>
        <folders-layout />
        <li>
            <div class="sidebar-button">
            <login-button />
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import AddFolderButton from './AddFolderButton.vue';
import loginButton from './loginButton.vue';
import FoldersLayout from "@/components/FoldersLayout.vue";
export default {
    components: { loginButton, AddFolderButton, FoldersLayout },
    name: "SidebarDesktop",
    props: ["fromMobile"],
}
</script>

<style>

</style>