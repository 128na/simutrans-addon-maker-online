<template>
  <template v-for="keyName in emptyImages">
    <param-image
      v-model="modelValue"
      :keyName="keyName"
      :project="project"
      :icon="icon(keyName)"
      @update:modelValue="$emit('update:modelValue')"
    />
  </template>
  <template v-for="keyName in freightImages">
    <param-image
      v-model="modelValue"
      :keyName="keyName"
      :project="project"
      :icon="icon(keyName)"
      @update:modelValue="$emit('update:modelValue')"
    />
  </template>
</template>
<script>
import ParamImage from "./ParamImage.vue";
import { createArray, createKeyPattern } from "@/services/Array";
const directions = ["s", "n", "e", "w", "ne", "sw", "se", "nw"];

export default {
  components: { ParamImage },
  props: ["modelValue", "project"],
  methods: {
    icon(keyName) {
      const matches = keyName.match(/\[([\w\d]+)\]/i);

      return matches.length ? `svguse:/img/vehicle.svg#${matches[1]}` : null;
    },
  },
  computed: {
    emptyImages() {
      return createKeyPattern("emptyimage", [directions]);
    },
    freightImages() {
      if (this.freightimagetypeCount === 0) {
        return [];
      }
      return createKeyPattern("freightimage", [
        directions,
        createArray(this.freightimagetypeCount),
      ]);
    },
    freightimagetypeCount() {
      return this.modelValue.findParamsByKeyVal("freightimagetype").length;
    },
  },
};
</script>
