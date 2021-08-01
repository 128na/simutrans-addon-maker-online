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
    label="積載タイプ"
    v-model="value"
    :options="options"
    :rules="rules"
    @filter="filter"
  />
</template>
<script>
import { required, minEq, maxEq } from "@/services/Validator";
import { FREIGHTS } from "@/services/Simutrans";

const options = FREIGHTS.map((f) =>
  Object.create({
    value: f.name,
    label: `${f.pak ? "[" + f.pak + "]" : ""} ${f.label} (${f.name})`,
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
    rules: () => [required],
    value: {
      get() {
        return this.modelValue.findParamByKey("freight")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("freight", v);
        this.$emit("update:modelValue");
      },
    },
  },
  methods: {
    filter(val, update) {
      const values = val.toLowerCase().split(" ");
      update(() => {
        this.options = options.filter((opt) =>
          values.every((v) => opt.value.includes(v) || opt.label.includes(v))
        );
      });
    },
  },
};
</script>