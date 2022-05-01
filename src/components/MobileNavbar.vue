<template>
    <div>
        <div class="mobile-navbar-enable">
            <!-- <button class="open-sidebar-button" @click="openSidebar"> Open Sidebar </button> -->
            <button class="open-sidebar-button material-icons folder-more-icon" @click="openSidebar">
          menu
          </button>
        </div>
        <sidebar-mobile :sidebarOpen="sidebarToggle" @closeSidebar="openSidebar" @openModal="this.$emit('openModal')" @openNoteModal="sendModal"/>
    </div>
</template>

<script>
    import SidebarMobile from './SidebarMobile.vue'
    export default {
        name: 'MobileNavbar',
        components: { SidebarMobile },
        data() {
            return {
                sidebarToggle: false
            }
        },
        methods: {
            openSidebar: function() {
                this.sidebarToggle = !this.sidebarToggle;
                this.$emit('sidebarOpen', this.sidebarToggle)
            },
            sendModal: function(name) {
                this.$emit('openNoteModal', name)
            }
        }
    }
</script>

<style>

</style>