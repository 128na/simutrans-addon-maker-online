<template>
  <q-select
    dense
    multiple
    emit-value
    hide-bottom-space
    input-debounce="0"
    hint="未指定の場合全ての気候"
    label="気候"
    v-model="value"
    :options="options"
  />
</template>
<script>
import { CLIMATES } from "@/constants";
const options = CLIMATES.map((c) =>
  Object.create({
    value: c.value,
    label: `${c.label} (${c.value})`,
  })
);
export default {
  props: ["modelValue", "project"],
  computed: {
    options: () => options,
    value: {
      get() {
        return this.modelValue.findParam("climates")?.value.split(",");
      },
      set(v) {
        v.sort();
        this.modelValue.updateOrCreate("climates", v.join(","));
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
