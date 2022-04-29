<template>
    <div>
        <div class="mobile-navbar">
            <button class="open-sidebar-button" @click="openSidebar"> Open Sidebar </button>
        </div>
        <sidebar-mobile :sidebarOpen="sidebarToggle" @closeSidebar="openSidebar"/>
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
            }
        }
    }
</script>

<style>

</style>