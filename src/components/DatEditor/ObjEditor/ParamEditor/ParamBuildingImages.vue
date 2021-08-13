<template>
  <param-images
    :icon="icon"
    v-model="modelValue"
    :project="project"
    :keyNames="['backimage']"
    :directions="directions"
    :x="x"
    :y="y"
    @update:modelValue="$emit('update:modelValue')"
  />
  <param-images
    :icon="icon"
    v-model="modelValue"
    :project="project"
    :keyNames="['frontimage']"
    :directions="directions"
    :x="x"
    :y="y"
    @update:modelValue="$emit('update:modelValue')"
  />
</template>
<script>
import ParamImages from "./ParamImages.vue";
import { createArray } from "@/services/Array";
export default {
  components: { ParamImages },
  props: ["modelValue", "project"],
  computed: {
    dims() {
      return this.modelValue.findParam("dims")?.value.split(",") || [];
    },
    type() {
      return this.modelValue.findParam("type")?.value;
    },
    x() {
      return Number(this.dims[1]) || 0;
    },
    y() {
      return Number(this.dims[0]) || 0;
    },
    layout() {
      return Number(this.dims[2]) || 0;
    },
    icon() {
      switch (this.type) {
        case "stop":
        case "depot":
        case "habour":
          return this.layout ? `svguse:/img/stop_${this.layout}.svg` : "";
        default:
          return this.layout ? `svguse:/img/building.svg` : "";
      }
    },
    directions() {
      return createArray(this.layout);
    },
  },
};
</script>
