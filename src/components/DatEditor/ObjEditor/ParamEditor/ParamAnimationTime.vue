<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="アニメーション画像切替間隔"
    type="number"
    suffix="msec"
    hint="未指定の場合300"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { minEq } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [minEq(1)],
    value: {
      get() {
        return this.modelValue.findParam("animation_time")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("animation_time", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
