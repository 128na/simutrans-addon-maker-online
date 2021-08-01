<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="出力"
    type="number"
    suffix="kW"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { minEq } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [minEq(0)],
    value: {
      get() {
        return this.modelValue.findParamByKey("power")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("power", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>