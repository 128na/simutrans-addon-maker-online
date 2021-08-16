<template>
  <q-select
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    emit-value
    label="架線属性"
    hint="電化・非電化を指定します。"
    v-model="value"
    :options="options"
    :rules="rules"
  />
</template>
<script>
import { required, includes } from "@/services/Validator";
import { OWN_WAYTYPES } from "@/constants";
const options = OWN_WAYTYPES.map((wt) =>
  Object.create({
    value: wt.value,
    label: `${wt.label} (${wt.value})`,
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
        return this.modelValue.findParam("own_waytype")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("own_waytype", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
