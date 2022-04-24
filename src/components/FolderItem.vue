<template>
  <div>
    <div class="folderItemContainer"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    >
      <button
        type="button"
        class="sidebar-button"
        @click="showDocs = !showDocs"
      >
        {{ name }}
      </button>
      <i v-if="hover" class="material-icons folder-more-icon"> more_horiz </i>
    </div>
    <ul v-if="showDocs" class="py-2 space-y-2">
      <li>
        <a href="#" class="doc-button">Doc 1</a>
      </li>
      <li>
        <a href="#" class="doc-button">Doc 2</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["name"],
  data: function () {
    return {
      showDocs: false,
      hover: false
    };
  },
};
</script>

<style scoped>
.folderItemContainer {
  display: flex;
}
</style>