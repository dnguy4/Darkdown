<template>
  <i @click="deleteDocument" class="material-icons"> delete </i>
</template>

<script>
import { db, auth } from "@/firebaseConfig";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
export default {
  props: ["docId"],
  methods: {
    deleteDocument: async function () {
      let text = "Are you sure you want to delete this note?";
      if (confirm(text) == true) {
        const docRef = doc(db, "users", auth.currentUser.uid, "notes", this.docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await deleteDoc(doc(db, "users", auth.currentUser.uid, "notes", this.docId));        
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