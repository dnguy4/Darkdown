<template>
<div>
  <li v-for="folder in folders" :key="folder.id" class="ml-4 mt-2">
    <folder-item v-bind:name="folder" @openNoteModal="sendModal"/>
  </li>
</div>
</template>

<script>
import { db, auth } from "@/firebaseConfig";
import { doc,onSnapshot } from "firebase/firestore";
import FolderItem from "./FolderItem.vue";

export default {
  components: { FolderItem },
  data: function () {
    return {
      folders: false,
    };
  },
  methods: {
    sendModal: function(name) {
      this.$emit('openNoteModal', name)
    }
  },
  created() {
    onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      if (doc.data())
        this.folders=doc.data().folders;
    });
  },
};
</script>

<style scoped>
</style>