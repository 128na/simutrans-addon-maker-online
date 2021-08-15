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
import {
  DIRECTIONS_DIAGONAL,
  DIRECTIONS_UP_DOWN,
  DIRECTIONS_WAY,
  IMAGE_TYPE_SNOW,
} from "@/constants";

const icon2Keys = ["diagonal", "imageup2"];

export default {
  components: { ParamImage },
  props: ["modelValue", "project"],
  methods: {
    icon(keyName) {
      const keyVal = keyName.split("[")[0];
      const matches = keyName.match(regKeyParam);
      const icon = icon2Keys.includes(keyVal)
        ? "/img/way_d.svg"
        : "/img/way.svg";

      return matches ? `svguse:${icon}#${matches[1]}` : null;
    },
  },
  computed: {
    images() {
      return [
        ...createKeyPattern("frontimage", [DIRECTIONS_WAY, IMAGE_TYPE_SNOW]),
        ...createKeyPattern("frontimageup", [
          DIRECTIONS_UP_DOWN,
          IMAGE_TYPE_SNOW,
        ]),
        ...createKeyPattern("frontdiagonal", [
          DIRECTIONS_DIAGONAL,
          IMAGE_TYPE_SNOW,
        ]),
        ...createKeyPattern("frontimageup2", [
          DIRECTIONS_UP_DOWN,
          IMAGE_TYPE_SNOW,
        ]),
        ...createKeyPattern("backimage", [DIRECTIONS_WAY, IMAGE_TYPE_SNOW]),
        ...createKeyPattern("backimageup", [
          DIRECTIONS_UP_DOWN,
          IMAGE_TYPE_SNOW,
        ]),
        ...createKeyPattern("backdiagonal", [
          DIRECTIONS_DIAGONAL,
          IMAGE_TYPE_SNOW,
        ]),
        ...createKeyPattern("backimageup2", [
          DIRECTIONS_UP_DOWN,
          IMAGE_TYPE_SNOW,
        ]),
      ];
    },
  },
};
</script>
