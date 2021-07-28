<template>
  <q-btn flat round :icon="icon" :color="color" @click="toggleTheme" />
</template>
<script>
import { themeToggler } from "@/mixins";
export default {
  mixins: [themeToggler],
  computed: {
    icon() {
      return this.isDarkTheme ? "dark_mode" : "light_mode";
    },
    color() {
      return this.isDarkTheme ? "amber" : "red";
    },
  },
};
</script>