<template>
  <div class="q-gutter-md row items-start">
    <q-input
      dense
      hide-hint
      hide-bottom-space
      input-debounce="0"
      label="登場年"
      type="number"
      class="col"
      suffix="年"
      min="0"
      max="2999"
      v-model="introYear"
      :rules="yearRules"
    />
    <q-input
      dense
      hide-hint
      hide-bottom-space
      input-debounce="0"
      label="登場月"
      type="number"
      class="col"
      suffix="月"
      min="1"
      max="12"
      v-model="introMonth"
      :rules="monthRules"
    />
  </div>
  <div class="q-gutter-md row items-start">
    <q-input
      dense
      hide-hint
      hide-bottom-space
      input-debounce="0"
      label="引退年"
      type="number"
      class="col"
      suffix="年"
      min="0"
      max="2999"
      v-model="retireYear"
      :rules="yearRules"
    />
    <q-input
      dense
      hide-hint
      hide-bottom-space
      input-debounce="0"
      label="引退月"
      type="number"
      class="col"
      suffix="月"
      min="1"
      max="12"
      v-model="retireMonth"
      :rules="monthRules"
    />
  </div>
</template>
<script>
import { betweenEq } from "@/services/Validator";
export default {
  props: ["modelValue"],
  computed: {
    yearRules: () => [betweenEq(0, 2999)],
    monthRules: () => [betweenEq(1, 12)],
    introYear: {
      get() {
        return this.modelValue.findParamByKey("intro_year")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("intro_year", v);
        this.$emit("update:modelValue");
      },
    },
    introMonth: {
      get() {
        return this.modelValue.findParamByKey("intro_month")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("intro_month", v);
        this.$emit("update:modelValue");
      },
    },
    retireYear: {
      get() {
        return this.modelValue.findParamByKey("retire_year")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("retire_year", v);
        this.$emit("update:modelValue");
      },
    },
    retireMonth: {
      get() {
        return this.modelValue.findParamByKey("retire_month")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("retire_month", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>