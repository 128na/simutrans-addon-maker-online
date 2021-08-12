<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="出現確率"
    type="number"
    suffix="%"
    min="1"
    max="100"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { required, betweenEq } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [required, betweenEq(1, 100)],
    value: {
      get() {
        return this.modelValue.findParamByKey("chance")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("chance", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
