<template>
  <q-select
    dense
    emit-value
    use-input
    hide-selected
    hide-hint
    hide-bottom-space
    input-debounce="0"
    new-value-mode="add-unique"
    fill-input
    label="煙"
    v-model="value"
    :options="options"
    :rules="rules"
    @filter="filter"
  />
</template>
<script>
import {} from "@/services/Validator";
import { SMOKES } from "@/constants";
const options = SMOKES.map((f) =>
  Object.create({
    value: f.value,
    label: `${f.pak ? "[" + f.pak + "]" : ""} ${f.label} (${f.value})`,
  })
);
export default {
  props: ["modelValue"],
  data() {
    return {
      options: options,
    };
  },
  computed: {
    rules: () => [],
    value: {
      get() {
        return this.modelValue.findParamByKey("smoke")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("smoke", v);
        this.$emit("update:modelValue");
      },
    },
  },
  methods: {
    filter(val, update) {
      const values = val.toLowerCase().split(" ");
      update(() => {
        this.options = options.filter((opt) =>
          values.every(
            (v) =>
              opt.value.toLowerCase().includes(v) ||
              opt.label.toLowerCase().includes(v)
          )
        );
      });
    },
  },
};
</script>