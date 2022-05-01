<template>
  <div class="sidebar-color" :class="fromMobile ? 'sidebar-menu-mobile' : 'sidebar-menu-desktop'">
    <ul class="space-y-3 h-85% max-h-9/10 overflow-auto">
        <li class="content-center pt-5">
            <img class="max-w-[50%] mx-auto" alt="TooDoo logo" src="../assets/logo_orange.png" />
        </li>
        <li class="mr-2">
            <div class="add-folder-button-container">
                <button class="new-folder-button" @click="this.$emit('openModal')">
                    New Folder
                </button>
            </div>
        </li>
        <folders-layout @openNoteModal="sendModal"/>
    </ul>
    <ul class="sidebar-logout-container">
            <login-button />
    </ul>
  </div>
</template>


<script>
//import AddFolderButton from './AddFolderButton.vue';
import loginButton from './loginButton.vue';
import FoldersLayout from "@/components/FoldersLayout.vue";
export default {
    components: { loginButton, FoldersLayout },
    name: "SidebarDesktop",
    props: ["fromMobile"],
    methods: {
    sendModal: function(name) {
      this.$emit('openNoteModal', name)
    }
  },
}
</script>

<style scoped>
.testing {
    background-color: aqua;
}
</style>