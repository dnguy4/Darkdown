<template>
  <div v-if="!user" class="home flex h-screen justify-center items-center">
    <div class="m-auto">
      <img alt="Darkdown Logo" src="../assets/logo_orange.png" />
      <div class="mt-2">
        <login-button/>
        <!-- <PWAPrompt class="mt-4" /> -->
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth } from "@/firebaseConfig";
import LoginButton from "@/components/loginButton.vue";
// import PWAPrompt from '../components/PWAPrompt.vue';
export default {
  name: "HomeView",
  components: {
    LoginButton,
    // PWAPrompt,
  },
  beforeCreate: function () {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$router.push("/editor");
      }
    });
  },
  data: function () {
    return {
      user: null,
    };
  },
};
</script>

<style scoped>
.login {
  margin-top: 2em;
}

.center {
  padding-top: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.home {
  background-color: #1e293b;
}
</style>
