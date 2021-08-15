<template>
  <template v-for="keyName in images">
    <param-image
      :ambiguousKeyName="true"
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
import { DIRECTIONS_TUNNEL, IMAGE_TYPE_SNOW } from "@/constants";

const icon2Keys = ["diagonal", "imageup2"];

export default {
  components: { ParamImage },
  props: ["modelValue", "project"],
  methods: {
    icon(keyName) {
      const matches = keyName.match(regKeyParam);

      return matches ? `svguse:/img/tunnel.svg#${matches[1]}` : null;
    },
  },
  computed: {
    images() {
      return [
        ...createKeyPattern("backimage", [DIRECTIONS_TUNNEL, IMAGE_TYPE_SNOW]),
        ...createKeyPattern("frontimage", [DIRECTIONS_TUNNEL, IMAGE_TYPE_SNOW]),
      ];
    },
  },
};
</script>
