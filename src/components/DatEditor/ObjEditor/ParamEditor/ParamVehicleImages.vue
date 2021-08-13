<template>
  <param-images
    icon="svguse:/img/vehicle.svg"
    v-model="modelValue"
    :project="project"
    :keyNames="['emptyimage']"
    :directions="directions"
    @update:modelValue="$emit('update:modelValue')"
  />
  <param-images
    v-if="freightimagetypes"
    icon="svguse:/img/vehicle.svg"
    v-model="modelValue"
    :project="project"
    :keyNames="['freightimage']"
    :directions="directions"
    :x="freightimagetypes - 1"
    @update:modelValue="$emit('update:modelValue')"
  />
</template>
<script>
import ParamImages from "./ParamImages.vue";
export default {
  components: { ParamImages },
  props: ["modelValue", "project"],
  computed: {
    directions() {
      return ["s", "n", "e", "w", "ne", "sw", "se", "nw"];
    },
    freightimagetypes() {
      return this.modelValue.findParamsByKeyVal("freightimagetype").length;
    },
  },
};
</script>
