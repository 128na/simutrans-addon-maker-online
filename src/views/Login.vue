<template>
  <div class="">
    <h2>Login</h2>
    <button @click="handleLogin">Google Login</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  methods: {
    ...mapActions(["login"]),
    async handleLogin() {
      this.login();
    },
  },
};
</script>
