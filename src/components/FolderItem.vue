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
      <li v-for="docId in documents" :key="docId.id">
        <!-- <a href="#" class="doc-button">Doc 1</a> -->
        <document-item v-bind:docId="docId" />
      </li>
    </ul>
  </div>
</template>

<script>
import { auth } from "@/firebaseConfig";
import { db } from "@/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  where,
  query,
  getDocs
} from "firebase/firestore";
import DocumentItem from "./DocumentItem.vue";
export default {
  components: { DocumentItem },
  props: ["name"],
  data: function () {
    return {
      showDocs: false,
      hover: false,
      documents: false,
    };
  },
  created() {
    onSnapshot(
      query(
        collection(db, "users", auth.currentUser.uid, "notes"),
        where("folder", "==", this.name)
      ),
      (dbData) => {
        let ids = [];
        dbData.docs.forEach((e) => {
          ids.push(e.id);
        });
        this.documents = ids;
      }
    );
  },
  methods: {
    deleteFolder: async function () {
      let text = "Do you want to delete the " + this.name + " folder?";
      if (confirm(text) == true) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // change the folder of all the notes that is associated with this folder
          const q = query(
            collection(db, "users", auth.currentUser.uid, "notes"),
            where("folder", "==", this.name)
          );
          getDocs(q).then((dbData) => {
            dbData.docs.forEach((e) => {
              const eRef = doc(
                db,
                "users",
                auth.currentUser.uid,
                "notes",
                e.id
              );
              updateDoc(eRef, {
                folder: "default",
              });
            });
          });

          var data = docSnap.data();
          var folders_ = data.folders;
          let newFolderArr = [];
          folders_.forEach((arr) => {
            if (arr != this.name) {
              newFolderArr.push(arr);
            }
          });
          await updateDoc(docRef, {
            folders: newFolderArr,
          });
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