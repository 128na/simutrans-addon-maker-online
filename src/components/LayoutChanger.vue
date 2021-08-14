<template>
  <template v-if="match">
    <slot name="match" />
  </template>
  <template v-else>
    <slot name="not-match" />
  </template>
</template>
<script>
export default {
  props: {
    sizes: {
      type: Array,
      default: () => ["xs", "sm"],
    },
  },
  computed: {
    match() {
      return this.sizes.includes(this.$q.screen.name);
    },
  },
};
</script>
