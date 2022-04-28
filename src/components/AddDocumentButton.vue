<template>
  <i
    @click="addClick = true"
    class="material-icons folder-more-icon"
  >
    add
  </i>
  <div v-if="addClick" class="add-folder">
      <div class="add-folder-pop-up">
        <h3 class="title">Add Note</h3>
        <div class="newItemInput">
          <textarea
            class="add-folder-text-area"
            name="paragraph_text"
            rows="1"
            placeholder="note title"
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
</template>

<script>
import { auth, db } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
export default {
  props: ["folder"],
  data: function () {
    return {
      addClick: false,
      noteName: null,
    };
  },
  methods: {
    addNote: async function () {
      this.addCLick = true;
      addDoc(collection(db, "users", auth.currentUser.uid, "notes"), {
        folder: this.folder,
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
.Hey {
  background-color: #4caf50;
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