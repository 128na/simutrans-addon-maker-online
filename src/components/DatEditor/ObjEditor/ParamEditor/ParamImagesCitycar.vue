<template>
  <template v-for="keyName in images">
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
import { createKeyPattern } from "@/services/Array";
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
    images() {
      return [...createKeyPattern("image", [DIRECTIONS_VEHICLE])];
    },
  },
};
</script>
