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
      <div class="truncate ... names1">
        {{ name }}
      </div>
      <div>
        <i
          @click.stop="this.$emit('openNoteModal', name)"
          class="material-icons folder-more-icon"
        >
          add
        </i>
      <i
        v-if="name != 'default'"
        @click.stop="deleteFolder"
        class="material-icons folder-more-icon"
      >
        delete
      </i>
      </div>
      </button>
      
    </div>
    <ul v-if="showDocs" class="py-2 space-y-2">
      <li v-for="docId in documents" :key="docId.id">
        <div v-if="docId.id == this.$route.params.doc">
          <button type='button' @click="goTo(docId.id)" class="truncate ... doc-button "><div class="truncate ... ">{{docId.title}}</div>
          <div><i @click.stop="deleteDocument(docId.id)" class="material-icons folder-more-icon">
          delete
          </i></div>
          </button>
        </div>
        <div v-else>
          <button type='button' @click="goTo(docId.id)" class="truncate ... doc-button-selected "><div class="truncate ... ">{{docId.title}}</div>
          <div><i @click.stop="deleteDocument(docId.id)" class="material-icons folder-more-icon">
          delete
          </i></div>
          </button>
        </div>
      </li>
      <li v-if="!documents || documents.length === 0" class="mt-2">
        <span class="lex w-3/4 mr-5 items-center justify-center p-2 rounded-lg bg-slate-200">No documents here!</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { auth, db, storage } from "@/firebaseConfig";
import { collection, doc, getDoc, updateDoc,
  onSnapshot, where, query, getDocs, deleteDoc} from "firebase/firestore";
import { ref as fsref, deleteObject } from "firebase/storage";

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
    onSnapshot(
      query(
        collection(db, "users", auth.currentUser.uid, "notes"),
        where("folder", "==", this.name),
      ),
      (dbData) => {
        let ids = [];
        dbData.docs.forEach((e) => {
          ids.push({id: e.id, title:e.data().title});
        });
        this.documents = ids;
        this.documents.sort((a, b) => {       return a.title.localeCompare(b.title)     })
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

    deleteDocument: async function (docId) {
      let text = "Are you sure you want to delete this note?";
      if (confirm(text) == true) {
        const docRef = doc(db, "users", auth.currentUser.uid, "notes", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          if(this.$route.params.doc == docId){
            this.$router.push("/editor");
          }
          await this.deleteDocImages(docSnap);
          await deleteDoc(
            doc(db, "users", auth.currentUser.uid, "notes", docId)
          );
        } else {
          console.log("No such document!");
        }
      }
    },

    deleteDocImages: async function (document) {
      const baseUrl =
        "https://firebasestorage.googleapis.com/v0/b/darkdown-44b5e.appspot.com/o/";
      let removedImagesSrc = document.data().imageurls;
      if (removedImagesSrc) {
        removedImagesSrc.forEach((imageUrl) => {
          if (imageUrl.includes("firebasestorage")) {
            console.log("Deleting:", imageUrl);
            let imagePath = imageUrl.replace(baseUrl, "");
            const indexOfEndPath = imagePath.indexOf("?");
            imagePath = imagePath.substring(0, indexOfEndPath).replace(/%2F/g, "/");
            imagePath = imagePath.replace(/%20/g, " ");
            deleteObject(fsref(storage, imagePath)).catch((error) => {
              console.log(error);
            });
          }
        });
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
.doc-button {
  margin-left: 20px;
  margin-right:10px;
  justify-content:space-between;
  text-align: center;
}
.doc-button-selected {
  margin-left: 20px;
  margin-right:10px;
  justify-content:space-between;
  text-align: center;
}

.doc-button{
  background-color: #f87171;
}
.material-icons{
  color:black;
  background-color: transparent;
}

.material-icons:hover{
  color:rgb(143, 28, 28);
}
</style>