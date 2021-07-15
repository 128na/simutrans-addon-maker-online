<template>
  <div :style="style" class="preview" />
</template>
<script>
export default {
  props: ["line", "imageUrl", "size", "isStatic"],
  computed: {
    style() {
      const left = -this.size * this.x - this.ox;
      const top = -this.size * this.y - this.oy;
      const width = this.isStatic ? 32 : this.size;
      const height = width;
      return {
        "background-image": `url(${this.imageUrl})`,
        "background-position": `left ${left}px top ${top}px`,
        width: `${width}px`,
        height: `${height}px`,
      };
    },
    x() {
      return parseInt(this.line.split(".")[2].split(",")[0]);
    },
    y() {
      return parseInt(this.line.split(".")[1]);
    },
    ox() {
      return parseInt(this.line.split(",")[1] || 0);
    },
    oy() {
      return parseInt(this.line.split(",")[2] || 0);
    },
  },
};
</script>
<style scoped>
.preview {
  background-repeat: no-repeat;
}
</style>