<template>
  <q-select
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    emit-value
    label="システムタイプ"
    hint="高架や滑走路など軌道の属性を指定します"
    v-model="value"
    :options="options"
    :rules="rules"
  />
</template>
<script>
import { required, includes } from "@/services/Validator";
import { SYSTEM_TYPES } from "@/constants";
const options = SYSTEM_TYPES.map((st) =>
  Object.create({
    value: st.value,
    label: `${st.label} (${st.value})`,
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
        return this.modelValue.findParam("system_type")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("system_type", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
