<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    label="最大長"
    type="number"
    min="0"
    suffix="マス"
    hint="建設可能な高さの上限を指定します（0で無制限）"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { required, minEq, maxEq } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [maxEq(7), minEq(0)],
    value: {
      get() {
        return this.modelValue.findParam("max_height")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("max_height", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
