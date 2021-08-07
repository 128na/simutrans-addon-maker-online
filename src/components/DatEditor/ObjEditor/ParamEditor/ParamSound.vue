<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="走行音"
    type="text"
    hint="pakxxx/soundフォルダ内のwavファイル名を指定します"
    v-model="value"
    :rules="rules"
  />
</template>
<script>
import {} from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [],
    value: {
      get() {
        return this.modelValue.findParamByKey("sound")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("sound", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>