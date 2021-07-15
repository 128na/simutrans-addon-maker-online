<template>
  <button :disabled="loading">
    <div v-show="loading" class="spinner-border spinner-border-sm" />
    <slot>Loading</slot>
  </button>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>