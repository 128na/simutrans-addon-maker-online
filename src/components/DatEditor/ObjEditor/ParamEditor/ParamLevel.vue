<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="レベル"
    type="number"
    min="1"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { required, minEq, maxEq } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [required, minEq(1), maxEq(50)],
    value: {
      get() {
        return this.modelValue.findParam("level")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("level", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
