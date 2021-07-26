<template>
  <a @click="toggleTheme" class="cursor-pointer toggler">
    <q-icon v-if="isDarkTheme" size="sm" name="dark_mode" color="amber" />
    <q-icon v-else size="sm" name="light_mode" color="red" />
  </a>
</template>
<script>
import { themeToggler } from "@/mixins";
export default {
  mixins: [themeToggler],
};
</script>