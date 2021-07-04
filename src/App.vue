<template>
  <div v-if="isInitialized">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span v-if="isLoggedIn">
        | {{ userName }} |
        <a href="#" @click="handleLogout">Logout</a>
      </span>
    </div>
    <router-view />
  </div>
  <div v-else>now loading...</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  created() {
    this.watchAuthState({
      onLoggedIn: () => this.$router.push({ name: "Home" }),
      onLoggedOut: () => this.$router.push({ name: "Login" }),
    });
  },
  computed: {
    ...mapGetters(["isInitialized", "isLoggedIn", "userName"]),
  },
  methods: {
    ...mapActions(["watchAuthState", "logout"]),
    handleLogout() {
      this.logout();
    },
  },
};
</script>