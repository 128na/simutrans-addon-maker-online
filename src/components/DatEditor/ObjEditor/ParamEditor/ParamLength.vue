<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="車両長"
    type="number"
    hint="1~16 (デフォルト:8)"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { required, betweenEq } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [required, betweenEq(1, 16)],
    value: {
      get() {
        return this.modelValue.findParamByKey("length")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("length", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
