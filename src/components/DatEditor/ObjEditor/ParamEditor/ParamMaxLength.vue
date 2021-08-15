<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    label="最大長"
    type="number"
    min="0"
    max="65535"
    suffix="マス"
    hint="建設可能な最大マス数を指定します（0で無制限）"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { required, minEq, maxEq } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [maxEq(65535), minEq(0)],
    value: {
      get() {
        return this.modelValue.findParam("max_length")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("max_length", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
