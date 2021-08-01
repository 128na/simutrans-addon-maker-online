<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="積み込み時間"
    type="number"
    suffix="msec"
    hint="2000~ (未指定の場合1000)"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { minEq } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [minEq(2000)],
    value: {
      get() {
        return this.modelValue.findParamByKey("loading_time")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("loading_time", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>