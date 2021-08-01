<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="作者"
    type="text"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { required } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [required],
    value: {
      get() {
        return this.modelValue.findParamByKey("copyright")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("copyright", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>