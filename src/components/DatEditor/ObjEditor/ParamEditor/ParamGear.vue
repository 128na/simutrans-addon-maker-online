<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    hint="ゲーム内では1/100の値になります"
    label="ギア比"
    type="number"
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
        return this.modelValue.findParamByKey("gear")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("gear", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>