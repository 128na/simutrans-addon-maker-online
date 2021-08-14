<template>
  <q-select
    dense
    hide-bottom-space
    input-debounce="0"
    emit-value
    label="建物タイプ"
    v-model="value"
    :options="options"
    :rules="rules"
  />
</template>
<script>
import { required, minEq, maxEq, includes } from "@/services/Validator";
import { TYPES } from "@/constants";
const options = TYPES.map((t) =>
  Object.create({
    value: t.value,
    label: `${t.label} (${t.value})`,
  })
);
export default {
  props: ["modelValue"],
  computed: {
    rules() {
      return [required, includes(this.options.map((o) => o.value))];
    },
    options: () => options,
    value: {
      get() {
        return this.modelValue.findParam("type")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("type", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
