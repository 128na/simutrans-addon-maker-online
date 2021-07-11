<template >
  <div v-if="isInitialized">
    <global-header />
    <div class="container-fluid my-3">
      <router-view v-slot="{ Component }">
        <transition name="scale-slide">
          <component :is="Component" class="bg-white" />
        </transition>
      </router-view>
    </div>
  </div>
  <common-loading v-else class="mt-5" />
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import GlobalHeader from "./components/GlobalHeader.vue";
import CommonLoading from "./components/CommonLoading.vue";

export default {
  components: { GlobalHeader, CommonLoading },
  created() {
    this.watchAuthState({
      onLoggedIn: () => this.$router.push({ name: "Projects" }),
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
ul {
  padding-left: 0rem;
}
li {
  list-style: none;
}
.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.35s ease-in-out;
  width: 100%;
  height: 100%;
}

.scale-slide-enter-from {
  left: -100%;
}

.scale-slide-enter-to {
  left: 0%;
}

.scale-slide-leave-from {
  transform: scale(1);
}

.scale-slide-leave-to {
  transform: scale(0.8);
}
</style>