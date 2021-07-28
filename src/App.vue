<template>
  <q-layout view="hHh LpR fFf" class="q-px-md">
    <global-header />
    <q-page-container v-if="isInitialized">
      <router-view />
    </q-page-container>
    <layout-loading v-else class="mt-5" />
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import GlobalHeader from "./components/GlobalHeader.vue";
import LayoutLoading from "./components/LayoutLoading.vue";

export default {
  components: { GlobalHeader, LayoutLoading },
  created() {
    this.watchAuthState({
      onLoggedIn: () => {
        if (this.$route.name === "Signin") {
          this.$router.push({ name: "Projects" });
        }
      },
      onLoggedOut: () => {
        if (this.$route.meta.requiresAuth) {
          this.$router.push({ name: "Signin" });
        }
      },
    });
  },
  watch: {
    message() {
      if (!this.message) {
        return;
      }

      switch (this.message.type) {
        case "error":
          return this.$q.notify({
            type: "negative",
            message: this.message.text,
            actions: [{ icon: "close", color: "white" }],
            timeout: 0,
          });
        case "success":
          return this.$q.notify({
            type: "positive",
            message: this.message.text,
          });
        default:
          return this.$q.notify({
            type: "info",
            message: this.message.text,
          });
      }
    },
  },
  computed: {
    ...mapGetters(["isInitialized", "message"]),
  },
  methods: {
    ...mapActions(["watchAuthState"]),
  },
};
</script>
