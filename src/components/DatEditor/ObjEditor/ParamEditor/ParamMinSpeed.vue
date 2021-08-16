<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="最低速度"
    type="number"
    min="0"
    max="65535"
    hint="通過できる車両の最高速度の最低値を指定します。（0で無制限）"
    suffix="km/h"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { minEq, maxEq } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [maxEq(65535), minEq(0)],
    value: {
      get() {
        return this.modelValue.findParam("min_speed")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("min_speed", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
