<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="最高速度"
    type="number"
    min="1"
    max="65535"
    suffix="km/h"
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
        return this.modelValue.findParam("topspeed")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("topspeed", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
