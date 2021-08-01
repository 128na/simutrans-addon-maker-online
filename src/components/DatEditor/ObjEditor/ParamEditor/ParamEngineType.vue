<template>
  <q-select
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    emit-value
    label="動力タイプ"
    v-model="value"
    :options="options"
    :rules="rules"
  />
</template>
<script>
import { required } from "@/services/Validator";
import { ENGINE_TYPES } from "@/services/Simutrans";
const options = ENGINE_TYPES.map((wt) =>
  Object.create({
    value: wt.value,
    label: `${wt.label} (${wt.value})`,
  })
);
export default {
  props: ["modelValue"],
  computed: {
    rules: () => [required],
    options: () => options,
    value: {
      get() {
        return this.modelValue.findParamByKey("engine_type")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("engine_type", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>