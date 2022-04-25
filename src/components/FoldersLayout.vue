<template>
  <li
    v-for="folder in folders"
    :key="folder.id"
    class="ml-4"
  >
    <folder-item v-bind:name="folder" />
  </li>
</template>

<script>
import FolderItem from "./FolderItem.vue";

const folders_ = ["Folder Example 1", "Folder Example 2", "something"];

export default {
  components: { FolderItem },
  data: function () {
    return {
      folders: folders_,
    };
  },
};
</script>

<style scoped>
</style>