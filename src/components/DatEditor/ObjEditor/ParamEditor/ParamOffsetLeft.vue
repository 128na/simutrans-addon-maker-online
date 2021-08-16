<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="左通行時の表示オフセット"
    type="number"
    v-model="value"
  />
</template>
<script>
export default {
  props: ["modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue.findParam("offset_left")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("offset_left", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
