<template>
  <q-layout view="hHh LpR fFf" class="q-px-md" v-if="isInitialized">
    <global-header />

    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- 
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
  <layout-loading v-else class="mt-5" />
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
  font-weight: 300;
}
ul {
  padding-left: 0rem;
}
li {
  list-style: none;
}
#title {
  font-weight: 700;
}
</style>