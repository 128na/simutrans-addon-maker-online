<template>
  <span>{{ text }}</span>
</template>
<script>
import { DateTime } from "luxon";
export default {
  props: ["modelValue"],
  computed: {
    text() {
      return DateTime.fromHTTP(this.modelValue)
        .setLocale("ja")
        .toLocaleString(DateTime.DATETIME_SHORT);
    },
  },
};
</script>