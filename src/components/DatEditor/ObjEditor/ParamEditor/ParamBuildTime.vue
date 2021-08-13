<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="登場人口"
    hint="建物が建設される都市の人口を指定します。建設される確率はchanceの値に依存します。"
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
    rules: () => [minEq(0), maxEq(65535)],
    value: {
      get() {
        return this.modelValue.findParam("build_time")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("build_time", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
