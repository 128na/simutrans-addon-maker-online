<template>
  <span>{{ text }}</span>
</template>
<script>
import { DateTime } from "luxon";
export default {
  props: ["value"],
  computed: {
    text() {
      return DateTime.fromHTTP(this.value).toLocaleString(
        DateTime.DATETIME_SHORT
      );
    },
  },
};
</script>