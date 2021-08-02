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
    catg: f.catg,
    size: f.size,
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
      return this.modelValue.findParamByKey("freight")?.value;
    },
    catg() {
      if (this.freight) {
        return options.find((f) => f.value === this.freight)?.catg;
      }
    },
    freighttypes() {
      console.log(this.catg);
      // 専用貨物の場合、それのみ
      if (this.catg === null) {
        return [
          options.find(
            (f) => f.size == this.project.data.size && f.value === this.freight
          ),
        ];
      }
      // 未選択の場合、すべて
      if (this.catg === undefined) {
        return options;
      }
      // 選択済みの場合、同カテゴリのみ
      return options.filter(
        (f) => f.size == this.project.data.size && f.catg == this.catg
      );
    },
  },
  methods: {
    filter(val, update) {
      const values = val.toLowerCase().split(" ");
      update(() => {
        this.options = this.freighttypes.filter((opt) =>
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