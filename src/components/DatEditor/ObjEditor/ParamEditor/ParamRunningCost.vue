<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    hint="ゲーム内では1/100の値になります"
    label="運行費"
    type="number"
    suffix="￠"
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
        return this.modelValue.findParamByKey("runningcost")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("runningcost", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>