<template>
  <div>
    <div class="add-folder-button-container">
      <button class="Hey" @click="addClick = true">
        Add Notes
      </button>
    </div>
    <div v-if="addClick" class="add-folder">
      <div class="add-folder-pop-up">
        <h3 class="title">Add Note</h3>
        <div>
          <select v-model="selectedFolder">
            <option v-for="folder in folders" v-bind:key="folder.id" v-bind:value="folder">
              {{ folder }}
            </option>
          </select>
        </div>
        <div class="newItemInput">
          <textarea
            class="add-folder-text-area"
            name="paragraph_text"
            rows="1"
            placeholder="note name"
            v-model="noteName"
            required
          />
          <button class="add-folder-button-confirm" @click="cancelFolder">
            Cancel
          </button>
          <button class="add-folder-button-confirm" @click="addNote">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/firebaseConfig";
import { doc, collection, addDoc, onSnapshot } from "firebase/firestore";
export default {
  created() {
    onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      this.folders = doc.data().folders;
    });
  },
  data: function () {
    return {
      addClick: false,
      noteName: null,
      folders: false,
      selectedFolder: false,
    };
  },
  methods: {
    addNote: async function () {
      this.addCLick = true;

      addDoc(collection(db, "users", auth.currentUser.uid, "notes"), {
        folder: this.selectedFolder,
        title: this.noteName,
        data: "",
      });
      this.cancelFolder();
    },
    cancelFolder: function () {
      this.addClick = false;
      this.noteName = null;
    },
  },
};
</script>

<style scoped>
.Hey{
background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
}
</style>