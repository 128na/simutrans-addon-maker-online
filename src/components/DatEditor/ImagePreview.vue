<template>
  <div :style="boxStyle" class="position-relative">
    <div :style="imageStyle" class="preview" />
    <svg-grid :size="size" :ox="ox" :oy="oy" />
  </div>
</template>
<script>
import SvgGrid from "../Svg/SvgGrid.vue";
export default {
  components: { SvgGrid },
  props: ["line", "imageUrl", "size", "isStatic"],
  computed: {
    boxStyle() {
      const width = this.line.isStaticImage ? 32 : this.size;
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
    x() {
      return parseInt(this.line.valueParameters[1] || 0);
    },
    y() {
      return parseInt(this.line.valueParameters[0] || 0);
    },
    ox() {
      return parseInt(this.line.valueParameters[2] || 0);
    },
    oy() {
      return parseInt(this.line.valueParameters[3] || 0);
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