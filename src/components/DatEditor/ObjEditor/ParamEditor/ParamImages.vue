<template></template>
<script>
import { required } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [required],
    value: {
      get() {
        return this.modelValue.findParamByKey("name")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("name", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>