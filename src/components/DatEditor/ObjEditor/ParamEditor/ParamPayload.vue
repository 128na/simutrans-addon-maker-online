<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="積載量"
    type="number"
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
        return this.modelValue.findParamByKey("payload")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("payload", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>