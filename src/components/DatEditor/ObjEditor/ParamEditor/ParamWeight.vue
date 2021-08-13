<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="自重"
    type="number"
    suffix="t"
    min="0"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { required, minEq, maxEq } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [required, maxEq(65535), minEq(1)],
    value: {
      get() {
        return this.modelValue.findParam("weight")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("weight", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
