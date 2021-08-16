<template>
  <template v-for="(keyName, index) in images">
    <param-image
      v-model="modelValue"
      :keyName="keyName"
      :project="project"
      @update:modelValue="$emit('update:modelValue')"
    />
  </template>
</template>
<script>
import ParamImage from "./ParamImage.vue";
import { createArray, createKeyPattern } from "@/services/Array";

export default {
  components: { ParamImage },
  props: ["modelValue", "project"],
  methods: {
    icon(index) {
      return `svguse:/img/vehicle.svg#${index}`;
    },
  },
  computed: {
    isSignal() {
      return !!this.modelValue.findParam("is_signal")?.value;
    },
    isPrePra() {
      return (
        this.modelValue.findParam("is_presignal")?.value == "1" ||
        this.modelValue.findParam("is_prioritysignal")?.value == "1"
      );
    },
    images() {
      if (this.isPrePra) {
        return createKeyPattern("image", [createArray(24)]);
      }
      if (this.isSignal) {
        return createKeyPattern("image", [createArray(16)]);
      }
      return createKeyPattern("image", [createArray(4)]);
    },
  },
};
</script>
