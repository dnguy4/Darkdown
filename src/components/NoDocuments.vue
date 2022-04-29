<template>
  <div class="flex flex-col justify-center items-center h-1/2">
      <div class="m-10 text-5xl">
        No documents currently selected.
      </div>
      <button class="large-button">
            Create a new document?
      </button>
  </div>
</template>

<script>
import { auth, db } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default {
  methods: {
    addNote: async function () {
      addDoc(collection(db, "users", auth.currentUser.uid, "notes"), {
        folder: this.folder,
        title: this.noteName,
        data: "",
      });
    },
  }
}
</script>

<style>

</style>