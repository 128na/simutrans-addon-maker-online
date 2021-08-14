<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    hint="ゲーム内で表示される名称"
    label="アドオン名"
    type="text"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import { filename, required } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [required, filename],
    value: {
      get() {
        return this.modelValue.findParam("name")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("name", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
