<template>
  <template v-for="keyName in images">
    <param-image
      v-model="modelValue"
      :ambiguousKeyName="true"
      :keyName="keyName"
      :project="project"
      :icon="icon(keyName)"
      @update:modelValue="$emit('update:modelValue')"
    />
  </template>
</template>
<script>
import ParamImage from "./ParamImage.vue";
import { createKeyPattern as c } from "@/services/Array";
import { regKeyParam } from "@/services/RegExp";
import {
  DIRECTIONS_DIAGONAL,
  DIRECTIONS_UP_DOWN,
  DIRECTIONS_WAY,
  DIRECTIONS_WAY_TOGGLE,
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
        ...c("image", [DIRECTIONS_WAY, IMAGE_TYPE_SNOW]),
        ...c("image", [DIRECTIONS_WAY_TOGGLE, IMAGE_TYPE_SNOW]),
        ...c("imageup", [DIRECTIONS_UP_DOWN, IMAGE_TYPE_SNOW]),
        ...c("diagonal", [DIRECTIONS_DIAGONAL, IMAGE_TYPE_SNOW]),
        ...c("imageup2", [DIRECTIONS_UP_DOWN, IMAGE_TYPE_SNOW]),
      ];
    },
  },
};
</script>
