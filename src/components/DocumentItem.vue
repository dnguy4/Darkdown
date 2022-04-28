<template>
  <div>
    <button type="button" class="doc-button" @click="goTo">
      {{ document.title }}
    </button>
    <i @click="deleteDocument" class="material-icons folder-more-icon"> delete </i>
  </div>
</template>

<script>
import { db, auth } from "@/firebaseConfig";
import { doc, onSnapshot, deleteDoc, getDoc } from "firebase/firestore";

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
  methods: {
    goTo: function () {
      this.$router.push("/editor/" + this.docId);
    },
    deleteDocument: async function () {
      let text = "Are you sure you want to delete this note?";
      if (confirm(text) == true) {
        const docRef = doc(
          db,
          "users",
          auth.currentUser.uid,
          "notes",
          this.docId
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          await deleteDoc(
            doc(db, "users", auth.currentUser.uid, "notes", this.docId)
          );
        } else {
          console.log("No such document!");
        }
      }
    },
  },
};
</script>

<style>
</style>