<template>
  <div>
    <button type="button" class="doc-button" @click="goTo">
      {{ document.title }}
    </button>
    <i @click="deleteDocument" class="material-icons folder-more-icon">
      delete
    </i>
  </div>
</template>

<script>
import { db, auth, storage } from "@/firebaseConfig";
import { doc, onSnapshot, deleteDoc, getDoc } from "firebase/firestore";
import { ref as fsref, deleteObject } from "firebase/storage";

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
          if(this.$route.params.doc == this.docId){
            this.$router.push("/editor");
          }
          await this.deleteDocImages(docSnap);
          await deleteDoc(
            doc(db, "users", auth.currentUser.uid, "notes", this.docId)
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
            imagePath = imagePath.substring(0, indexOfEndPath);
            imagePath = imagePath.replace(/%2F/g, "/");
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

<style>
</style>