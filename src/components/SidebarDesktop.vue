<template>
  <div class="sidebar-color" :class="fromMobile ? 'sidebar-menu-mobile' : 'sidebar-menu-desktop'">
    <ul class="space-y-3 m-4">
        <li>
            <a href="#" class="sidebar-button">
            <span>Darkdown</span>
            </a>
        </li>
        <li>
            <button type="button" class="sidebar-button w-full" @click="showDocs=!showDocs">
                <span>Folder Example</span>
            </button>
            <ul v-if="showDocs" class="py-2 space-y-2">
                <li>
                    <a href="#" class="doc-button">Doc 1</a>
                </li>
                <li>
                    <a href="#" class="doc-button">Doc 2</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="#" class="sidebar-button">
            <login-button />
            </a>
        </li>
    </ul>
  </div>
</template>

<script>
import loginButton from './loginButton.vue';
export default {
    components: { loginButton },
    name: "SidebarDesktop",
    props: ["fromMobile"],
    data: function() {
        return {
            showDocs: false,
        }
    },
}
</script>

<style>

</style>