<template>
  <div>
    <div
      class="folderItemContainer"
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
      <!-- <i v-if="hover" class="material-icons folder-more-icon"> more_horiz </i> -->
      <i
        v-if="hover"
        @click="deleteFolder"
        class="material-icons folder-more-icon"
      >
        delete
      </i>
    </div>
    <ul v-if="showDocs" class="py-2 space-y-2">
      {{documents}}
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
import { auth } from "@/firebaseConfig";
import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
export default {
  props: ["name"],
  data: function () {
    return {
      showDocs: false,
      hover: false,
      documents: false,
    };
  },
  created() {
    onSnapshot(collection(db, "users", auth.currentUser.uid,"notes"), (dbData) => {
      console.log(auth.currentUser.uid);
      console.log("Current data: ", dbData);
      // this.documents = dbData.data().folders;
    });
  },
  methods: {
    deleteFolder: async function () {
      let text = "Do you want to delete the " + this.name + " folder?";
      if (confirm(text) == true) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          var data = docSnap.data();
          var folders_ = data.folders;
          let newFolderArr = [];
          folders_.forEach((arr) => {
            if (arr != this.name) {
              newFolderArr.push(arr);
            }
          });
          const docRef = doc(db, "users", auth.currentUser.uid);
          await updateDoc(docRef, {
            folders: newFolderArr,
          });
          // delete all the notes that is associated with this folder
        } else {
          console.log("No such document!");
        }
      }
    },
  },
};
</script>

<style scoped>
.folderItemContainer {
  display: flex;
}
</style>