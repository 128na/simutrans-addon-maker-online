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
import { DIRECTIONS_STRAIGHT, IMAGE_TYPE_SNOW } from "@/constants";

export default {
  components: { ParamImage },
  props: ["modelValue", "project"],
  methods: {
    icon(keyName) {
      const matches = keyName.match(regKeyParam);

      return matches ? `svguse:/img/crossing.svg#${matches[1]}` : null;
    },
  },
  computed: {
    images() {
      return [
        ...createKeyPattern("openimage", [
          DIRECTIONS_STRAIGHT,
          IMAGE_TYPE_SNOW,
        ]),
        ...createKeyPattern("front_openimage", [
          DIRECTIONS_STRAIGHT,
          IMAGE_TYPE_SNOW,
        ]),
        ...createKeyPattern("closedimage", [
          DIRECTIONS_STRAIGHT,
          IMAGE_TYPE_SNOW,
        ]),
        ...createKeyPattern("front_closedimage", [
          DIRECTIONS_STRAIGHT,
          IMAGE_TYPE_SNOW,
        ]),
      ];
    },
  },
};
</script>
