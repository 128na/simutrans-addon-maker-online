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
import { required } from "@/services/Validator";
import { FREIGHTS } from "@/constants";

const options = FREIGHTS.map((f) =>
  Object.create({
    value: f.name,
    label: `${f.pak ? "[" + f.pak + "]" : ""} ${f.label} (${f.name})`,
    pak: f.pak,
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
    filteredOptions() {
      return this.project.data.pak
        ? options.filter((opt) => opt.pak === this.project.data.pak)
        : options;
    },
  },
  methods: {
    filter(val, update) {
      const values = val.toLowerCase().split(" ");
      update(() => {
        this.options = this.filteredOptions.filter((opt) =>
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
