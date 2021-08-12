<template>
  <q-select
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    emit-value
    label="地下での建設"
    v-model="value"
    :options="options"
    :rules="rules"
  />
</template>
<script>
import { required, includes } from "@/services/Validator";
import { ALLOW_UNDERGROUNDS } from "@/constants";
const options = ALLOW_UNDERGROUNDS.map((ug) =>
  Object.create({
    value: ug.value,
    label: `${ug.label} (${ug.value})`,
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
        return this.modelValue.findParamByKey("allow_underground")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("allow_underground", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
