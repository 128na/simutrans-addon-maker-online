<template>
  <div class="card">
    <image-preview
      v-if="hasImage"
      :line="parsed[3]"
      :images="project.data.images"
      :size="project.data.size"
    />
    <div class="card-body">
      <div class="card-title">{{ value }}</div>
    </div>
  </div>
</template>
<script>
import { parseLine } from "../../services/DatParser";
import ImagePreview from "./ImagePreview.vue";
export default {
  props: ["value", "project"],
  components: { ImagePreview },
  computed: {
    parsed() {
      return parseLine(this.value);
    },
    hasImage() {
      return this.parsed[1].toLowerCase().includes("image");
    },
  },
};
</script>