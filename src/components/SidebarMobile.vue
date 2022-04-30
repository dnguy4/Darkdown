<template>
    <div>
        <aside class="sidebar-menu-mobile" :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'">
            <sidebar-desktop :fromMobile="true" @openModal="this.$emit('openModal')" @openNoteModal="sendModal"> </sidebar-desktop>
        </aside>

        <div>
            <button class="sidebar-overlay" :class="sidebarOpen ? 'opacity-50' : 'opacity-0'">
            </button>
            <div v-if="sidebarOpen" class="overlay-closer"  @click="closeSidebar">
            </div>
        </div>
    </div>
</template>

<script>
import SidebarDesktop from './SidebarDesktop.vue'
export default {
    components: { SidebarDesktop },
    name: 'SidebarMenu',
    props: ["sidebarOpen"],
    emits: ["closeSidebar"],
    methods: {
        closeSidebar() {
            this.$emit('closeSidebar');
        },
        sendModal: function(name) {
            this.$emit('openNoteModal', name)
        }
    }
}
</script>

<style>
</style>