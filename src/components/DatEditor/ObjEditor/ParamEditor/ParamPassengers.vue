<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="旅客度"
    type="number"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { minEq, maxEq } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [minEq(0), maxEq(65535)],
    value: {
      get() {
        return this.modelValue.findParamByKey("passengers")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("passengers", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
