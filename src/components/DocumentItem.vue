<template>
  <a href="#" class="doc-button">{{document.title}}</a>
</template>

<script>
import { db, auth } from "@/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

export default {
  props: ["docId"],
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
};
</script>

<style>
</style>