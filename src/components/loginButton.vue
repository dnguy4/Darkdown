<template>
  <div class="auth">
    <template v-if="!user">
      <div class="signInContainer">
        <button @click="signInWithGoogle" class="signIn">Sign In</button>
      </div>
    </template>
    <template v-if="user">
      <!-- <button id="signOutBtn" @click="signOut">Sign Out</button> -->
      
      <button class="sidebar-logout-button" id="signOutBtn" @click="signOut"><img
        class="avatar"
        :src="user.photoURL"
        alt="avatar"
        referrerpolicy="no-referrer"
      />
      Logout</button>
      <!-- <i class="material-icons" id="signOutBtn" @click="signOut"> logout </i> -->
      <!-- google is real paranoid about hotlinking images I guess the referrerpolicy seems to fix it
        https://stackoverflow.com/questions/40570117/http403-forbidden-error-when-trying-to-load-img-src-with-google-profile-pic -->
    </template>

    <!-- <pre>{{ user }}</pre> -->
  </div>
</template>

<script>
import { auth, provider } from "@/firebaseConfig";
import { onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
export default {
  components: {},
  name: "LoginButton",
  data() {
    return {
      user: null,
    };
  },
  beforeCreate: function () {
    onAuthStateChanged(auth, (user) => {
      // uncomment above to check out which user properties are available.
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    signInWithGoogle: function () {
      signInWithRedirect(auth, provider)
        .then((result) => {
          this.user = result.user;
        })
        .catch((err) => console.log(err));
    },
    signOut: function () {
      signOut(auth)
        .then(() => {
          this.user = null;
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 2em;
  height: 2em;
  margin-right: 2em;
  border-radius: 50%;
}

#signOutBtn {
  border-radius: 10px;
  margin-right: 1em;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  width: 100%;
  height: 100%;
}

#signOutBtn:hover {
  cursor: pointer;
}

.auth {
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: auto;

}

.signInContainer {
  margin-left: auto;
  margin-right: auto;
}

.signIn {
  background-color: #C5D8D1;
  color: #12263A;
  padding-left: 2em;
  padding-right: 2em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  /* padding: 50%; */
  border-radius: 10px;
  width: 100%;
  height: 100%;
}
.signIn:hover {
  background-color: #F6FCFE ;
  cursor: pointer;
}
</style>