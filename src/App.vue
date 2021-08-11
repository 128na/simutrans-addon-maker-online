<template>
  <q-layout view="hHh LpR fFf" class="q-px-md">
    <global-header />
    <q-page-container v-if="isInitialized">
      <router-view />
    </q-page-container>
    <layout-loading v-else />
  </q-layout>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader.vue";
import LayoutLoading from "@/components/LayoutLoading.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { GlobalHeader, LayoutLoading },
  created() {
    window.$q = this.$q;
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
  computed: {
    ...mapGetters(["isInitialized"]),
  },
  methods: {
    ...mapActions(["watchAuthState"]),
  },
};
</script>
