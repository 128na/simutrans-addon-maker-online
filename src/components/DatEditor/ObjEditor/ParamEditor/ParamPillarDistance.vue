<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    label="橋脚間隔"
    type="number"
    min="1"
    suffix="マス"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { required, minEq, maxEq } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [minEq(1)],
    value: {
      get() {
        return this.modelValue.findParam("pillar_distance")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("pillar_distance", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
