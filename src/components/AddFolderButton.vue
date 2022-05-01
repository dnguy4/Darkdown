<template>
  <div>
    <div class="add-folder">
      <div class="add-folder-pop-up">
        <h3 class="title">Add Folder</h3>
        <div class="newItemInput">
          <textarea
            class="add-folder-text-area"
            name="paragraph_text"
            rows="1"
            placeholder="Folder name"
            v-model="folderName"
            required
            @keyup.enter="addFolder"
          />
          <button class="add-folder-button-confirm" @click="cancelFolder">
            Cancel
          </button>
          <button class="add-folder-button-confirm" @click="addFolder">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebaseConfig";
import { db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
export default {
  data: function () {
    return {
      folderName: null,
    };
  },
  methods: {
    addFolder: async function () {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        var data = docSnap.data();
        var folders_ = data.folders;
        folders_.forEach((arr) => {
          if (arr == this.folderName) {
            alert("[!] Folder name exists!");
            return;
          }
        });
        if (this.folderName.trim()) {
          folders_.push(this.folderName);
          //console.log(folders_);
          const docRef = doc(db, "users", auth.currentUser.uid);
          await updateDoc(docRef, {
            folders: folders_,
          });
          this.cancelFolder();
        } else {
          alert("Invalid Folder Name!");
        }
      } else {
        console.log("No such document!");
      }
    },
    cancelFolder: function () {
      this.$emit("closeModal");
      this.folderName = null;
    },
  },
};
</script>

<style scoped>
</style>