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
const options = CLIMATES.map((t) =>
  Object.create({
    value: t.value,
    label: `${t.label} (${t.value})`,
  })
);
export default {
  props: ["modelValue", "project"],
  data() {
    return {
      options: options,
    };
  },
  computed: {
    rules() {
      return [required, includes(this.options.map((o) => o.value))];
    },
    options: () => options,
    value: {
      get() {
        return this.modelValue.findParamByKey("climates")?.value.split(",");
      },
      set(v) {
        this.modelValue.updateOrCreate("climates", v.join(","));
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
