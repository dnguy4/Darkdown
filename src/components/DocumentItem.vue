<template>
<div>
  <a href="#" class="doc-button">{{document.title}}</a>
  <i
        @click="deleteFolder"
        class="material-icons folder-more-icon"
      >
        delete
      </i>
  </div>
</template>

<script>
import { db, auth } from "@/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

import DocumentDeleteButton from "./DocumentDeleteButton.vue";

export default {
  props: ["docId"],
  component: {DocumentDeleteButton},
  data: function () {
    return {
      document: false,
    };
  },
  mounted() {
    onSnapshot(
      doc(db, "users", auth.currentUser.uid, "notes", this.docId),
      (doc) => {
        this.document = doc.data();
      }
    );
  },
   methods: {
    
    }
};
</script>

<style>
</style>