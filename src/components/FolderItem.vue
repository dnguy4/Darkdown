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
      <div class="names1">
        {{ name }}
      </div>
      <div>
        <add-document-button v-bind:folder=name />
      <i
        v-if="name != 'default'"
        @click="deleteFolder"
        class="material-icons folder-more-icon"
      >
        delete
      </i>
      </div>
      </button>
      
    </div>
    <ul v-if="showDocs" class="py-2 space-y-2">
      <li v-for="docId in documents" :key="docId.id">
        <button type='button' @click="goTo(docId.id)" class="doc-button"><div>{{docId.title}}</div>
        <div><i @click="deleteDocument" class="material-icons folder-more-icon">
      delete
    </i></div>
        </button>
        
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
import AddDocumentButton from "./AddDocumentButton.vue";
export default {
  components: { AddDocumentButton },
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
          ids.push({id: e.id, title:e.data().title});
        });
        this.documents = ids;
      }
    );
  },
  methods: {
    goTo: function (id) {
      this.$router.push("/editor/" + id);
    },
    
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
.names1{
font-weight: bold;
}
.sidebar-button{
  justify-content:space-between;
}
.doc-button{
  margin-left: 20px;
  margin-right:10px;
  justify-content:space-between;
  background-color: lightblue;
  text-align: center;
}
.material-icons{
  color:black;
}
</style>