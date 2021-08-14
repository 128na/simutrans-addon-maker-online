<template>
  <q-select
    dense
    use-input
    use-chips
    multiple
    emit-value
    hide-hint
    hide-bottom-space
    input-debounce="0"
    new-value-mode="add-unique"
    fill-input
    label="積載画像タイプ"
    v-model="value"
    :options="options"
    @filter="filter"
  />
</template>
<script>
import { FREIGHTS } from "@/constants";

const options = FREIGHTS.map((f) =>
  Object.create({
    value: f.name,
    label: `${f.pak ? "[" + f.pak + "]" : ""} ${f.label} (${f.name})`,
    catg: f.catg,
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
    value: {
      get() {
        return this.modelValue
          .findParamsByKeyVal("freightimagetype")
          .map((p) => p.value);
      },
      set(value) {
        this.modelValue.deleteByKeyVal("freightimagetype");
        value.map((v, index) =>
          this.modelValue.updateOrCreate(`freightimagetype[${index}]`, v)
        );
        this.$emit("update:modelValue");
      },
    },
    freight() {
      return this.modelValue.findParam("freight")?.value;
    },
    catg() {
      if (this.freight) {
        return options.find((f) => f.value === this.freight)?.catg;
      }
    },
    pakFilteredOptions() {
      return this.project.data.pak
        ? options.filter((opt) => opt.pak === this.project.data.pak)
        : options;
    },
    filteredOptions() {
      // 専用貨物の場合、それのみ
      if (this.catg === 0) {
        return [this.pakFilteredOptions.find((f) => f.value === this.freight)];
      }
      if (this.catg === undefined) {
        return this.pakFilteredOptions;
      }
      // 選択済みの場合、同カテゴリのみ
      return this.pakFilteredOptions.filter((f) => f.catg === this.catg);
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
