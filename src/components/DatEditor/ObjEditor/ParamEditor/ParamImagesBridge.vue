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
  DIRECTIONS_STRAIGHT,
  IMAGE_TYPE_SNOW,
  DIRECTIONS_NEWS,
  DIRECTIONS_SW,
} from "@/constants";

export default {
  components: { ParamImage },
  props: ["modelValue", "project"],
  methods: {
    icon(keyName) {
      const keyVal = keyName.split("[")[0];
      const matches = keyName.match(regKeyParam);
      const icon = this.iconFile(keyVal);

      return matches ? `svguse:${icon}#${matches[1]}` : null;
    },
    iconFile(keyVal) {
      if (["backstart", "frontstart"].includes(keyVal)) {
        return "/img/bridge_s.svg";
      }
      if (["backstart2", "frontstart2"].includes(keyVal)) {
        return "/img/bridge_s2.svg";
      }
      if (["backramp", "frontramp"].includes(keyVal)) {
        return "/img/bridge_r.svg";
      }
      if (["backramp2", "frontramp2"].includes(keyVal)) {
        return "/img/bridge_r2.svg";
      }
      return "/img/way.svg";
    },
  },
  computed: {
    images() {
      return [
        ...c("backimage", [DIRECTIONS_STRAIGHT, IMAGE_TYPE_SNOW]),
        ...c("backimage2", [DIRECTIONS_STRAIGHT, IMAGE_TYPE_SNOW]),
        ...c("backstart", [DIRECTIONS_NEWS, IMAGE_TYPE_SNOW]),
        ...c("backstart2", [DIRECTIONS_NEWS, IMAGE_TYPE_SNOW]),
        ...c("backramp", [DIRECTIONS_NEWS, IMAGE_TYPE_SNOW]),
        ...c("backramp2", [DIRECTIONS_NEWS, IMAGE_TYPE_SNOW]),
        ...c("backPillar", [DIRECTIONS_SW, IMAGE_TYPE_SNOW]),
        ...c("backPillar2", [DIRECTIONS_SW, IMAGE_TYPE_SNOW]),
        ...c("frontimage", [DIRECTIONS_STRAIGHT, IMAGE_TYPE_SNOW]),
        ...c("frontimage2", [DIRECTIONS_STRAIGHT, IMAGE_TYPE_SNOW]),
        ...c("frontstart", [DIRECTIONS_NEWS, IMAGE_TYPE_SNOW]),
        ...c("frontstart2", [DIRECTIONS_NEWS, IMAGE_TYPE_SNOW]),
        ...c("frontramp", [DIRECTIONS_NEWS, IMAGE_TYPE_SNOW]),
        ...c("frontramp2", [DIRECTIONS_NEWS, IMAGE_TYPE_SNOW]),
        ...c("frontPillar", [DIRECTIONS_SW, IMAGE_TYPE_SNOW]),
        ...c("frontPillar2", [DIRECTIONS_SW, IMAGE_TYPE_SNOW]),
      ];
    },
  },
};
</script>
