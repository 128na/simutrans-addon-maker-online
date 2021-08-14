<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="本社レベル"
    type="number"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { required, minEq } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [required, minEq(0)],
    value: {
      get() {
        return this.modelValue.findParam("hq_level")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("hq_level", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
