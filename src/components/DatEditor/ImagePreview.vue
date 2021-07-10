<template>
  <div :style="style" class="preview" />
</template>
<script>
export default {
  props: ["line", "images", "size", "isStatic"],
  computed: {
    style() {
      const name = `${this.line.split(".")[0]}.png`;
      const y = parseInt(this.line.split(".")[1]);
      const x = parseInt(this.line.split(".")[2].split(",")[0]);
      const ox = parseInt(this.line.split(",")[1] || 0);
      const oy = parseInt(this.line.split(",")[2] || 0);

      const left = -this.size * x + ox;
      const top = -this.size * y + oy;
      const width = this.isStatic ? 32 : this.size;
      const height = width;
      return {
        "background-image": `url(${this.images[name]})`,
        "background-position": `left ${left}px top ${top}px`,
        width: `${width}px`,
        height: `${height}px`,
      };
    },
  },
};
</script>
<style scoped>
.preview {
  background-repeat: no-repeat;
}
</style>