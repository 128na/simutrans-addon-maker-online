<template>
  <div :style="boxStyle" class="relative-position">
    <div :style="imageStyle" class="preview" />
    <svg-grid :size="size" :ox="ox" :oy="oy" />
  </div>
</template>
<script>
import SvgGrid from "@/components/Svg/SvgGrid.vue";

export default {
  components: { SvgGrid },
  props: ["param", "project"],
  computed: {
    boxStyle() {
      const width = this.param.isStaticImage ? 32 : this.size;
      const height = width;
      return {
        width: `${width}px`,
        height: `${height}px`,
      };
    },
    imageStyle() {
      const left = -this.size * this.x - this.ox;
      const top = -this.size * this.y - this.oy;
      return {
        "background-image": `url(${this.imageUrl})`,
        "background-position": `left ${left}px top ${top}px`,
      };
    },
    imageUrl() {
      const filename = `${this.param.valueVal}.png`;
      return this.project.data.imageUrls.find((i) => i.filename === filename)
        ?.url;
    },
    size() {
      return this.project.data.size;
    },
    x() {
      return parseInt(this.param.valueParams[1] || 0);
    },
    y() {
      return parseInt(this.param.valueParams[0] || 0);
    },
    ox() {
      return parseInt(this.param.valueParams[2] || 0);
    },
    oy() {
      return parseInt(this.param.valueParams[3] || 0);
    },
  },
};
</script>
<style scoped>
.preview {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-repeat: no-repeat;
}
</style>