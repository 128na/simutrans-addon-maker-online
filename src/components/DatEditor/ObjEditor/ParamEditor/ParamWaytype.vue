<template>
  <q-select
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    emit-value
    label="軌道タイプ"
    v-model="value"
    :options="options"
    :rules="rules"
  />
</template>
<script>
import { required, includes } from "@/services/Validator";
import { WAYTYPES } from "@/constants";
const options = WAYTYPES.map((wt) =>
  Object.create({
    value: wt.value,
    label: `${wt.label} (${wt.value})`,
  })
);
export default {
  props: ["modelValue", "param"],
  computed: {
    rules() {
      return [required, includes(this.options.map((o) => o.value))];
    },
    options: () => options,
    key() {
      return this.param ? `waytype[${this.param}]` : "waytype";
    },
    value: {
      get() {
        return this.modelValue.findParam(this.key)?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate(this.key, v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
