<template>
  <q-select
    dense
    multiple
    emit-value
    hide-bottom-space
    input-debounce="0"
    label="所属クラスター"
    v-model="value"
    :options="options"
  />
</template>
<script>
import { createArray } from "@/services/Array";
import { sortAsNumber } from "@/services/Sort";

export default {
  props: ["modelValue", "project"],
  computed: {
    options() {
      return createArray(33).map((i) =>
        Object.create({
          value: i,
          label: `クラスタ ${i}`,
        })
      );
    },
    value: {
      get() {
        return this.modelValue.findParam("clusters")?.value.split(",");
      },
      set(v) {
        v.sort(sortAsNumber);
        this.modelValue.updateOrCreate("clusters", v.join(","));
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
