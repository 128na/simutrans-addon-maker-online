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
import { regKeyParam } from "@/services/RegExp";
import { DIRECTIONS_VEHICLE } from "@/constants";

export default {
  components: { ParamImage },
  props: ["modelValue", "project"],
  methods: {
    icon(keyName) {
      const matches = keyName.match(regKeyParam);

      return matches ? `svguse:/img/vehicle.svg#${matches[1]}` : null;
    },
  },
  computed: {
    emptyImages() {
      return createKeyPattern("emptyimage", [DIRECTIONS_VEHICLE]);
    },
    freightImages() {
      if (this.freightimagetypeCount === 0) {
        return [];
      }
      return createKeyPattern("freightimage", [
        DIRECTIONS_VEHICLE,
        createArray(this.freightimagetypeCount),
      ]);
    },
    freightimagetypeCount() {
      return this.modelValue.findParamsByKeyVal("freightimagetype").length;
    },
  },
};
</script>
