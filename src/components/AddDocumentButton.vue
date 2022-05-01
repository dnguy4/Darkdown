<template>
  <div class="grid place-items-center">
    <div class="add-folder">
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
            @keyup.enter="addNote"
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
import { collection, addDoc, Timestamp } from "firebase/firestore";
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
      if (this.noteName.trim()) {
        addDoc(collection(db, "users", auth.currentUser.uid, "notes"), {
          folder: this.folder,
          title: this.noteName,
          data: "",
          timestamp: Timestamp.fromDate(new Date()),
        }).then((x) => {
          this.cancelFolder();
          this.$router.push("/editor/" + x.id);
        });
      } else {
        alert("Invalid Note Name!");
      }
    },
    cancelFolder: function () {
      this.$emit("closeModal");
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
.material-icons {
  color: black;
}
</style>
