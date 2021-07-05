<template >
  <div v-if="isInitialized">
    <global-header />
    <div class="container-fluid my-3">
      <router-view />
    </div>
  </div>
  <common-loading v-else />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import GlobalHeader from "./components/GlobalHeader.vue";
import CommonLoading from "./components/CommonLoading.vue";

export default {
  components: { GlobalHeader, CommonLoading },
  created() {
    this.watchAuthState({
      onLoggedIn: () => this.$router.push({ name: "Home" }),
      onLoggedOut: () => this.$router.push({ name: "Signin" }),
    });
  },
  computed: {
    ...mapGetters(["isInitialized"]),
  },
  methods: {
    ...mapActions(["watchAuthState"]),
  },
};
</script>
<style>
body {
  font-family: "Noto Sans JP", sans-serif;
}
</style>