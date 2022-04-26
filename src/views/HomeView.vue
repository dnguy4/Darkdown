<template>
  <div v-if="!user" class="home">
    <img class="center" alt="TooDoo logo" src="../assets/logo_orange.png" />
    <div class="login">
      <login-button />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth } from "@/firebaseConfig";
import LoginButton from "@/components/loginButton.vue";
export default {
  name: "HomeView",
  components: {
    LoginButton,
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
  text-align: center;
  background-color: #003637;
  min-height: 100vh;
}
</style>
