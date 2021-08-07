<template>
  <svg xmlns="http://www.w3.org/2000/svg" v-if="size">
    <defs>
      <pattern
        :id="subGridId"
        :width="subGrid"
        :height="subGrid"
        patternUnits="userSpaceOnUse"
      >
        <path
          v-if="subGridSize"
          :d="subPattern"
          fill="none"
          stroke="gray"
          stroke-width="0.5"
        />
      </pattern>
      <pattern
        :id="gridId"
        :width="size"
        :height="size"
        :x="-ox"
        :y="-oy"
        patternUnits="userSpaceOnUse"
      >
        <rect :width="size" :height="size" :fill="fillSubGrid" />
        <path :d="pattern" fill="none" stroke="gray" stroke-width="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="fillGrid" />
  </svg>
</template><script>
export default {
  props: {
    size: {
      type: [String, Number],
      default: 64,
    },
    subGridSize: {
      type: Number,
      default: 4,
    },
    ox: {
      type: Number,
      default: 0,
    },
    oy: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    // パターン要素のID重複が発生するとパターン同士が干渉するので注意
    uid() {
      return crypto.getRandomValues(new Uint32Array(1)).join("");
    },
    gridId() {
      return `${this.uid}`;
    },
    subGridId() {
      return `${this.uid}-sub`;
    },
    fillSubGrid() {
      return `url(#${this.subGridId})`;
    },
    fillGrid() {
      return `url(#${this.gridId})`;
    },
    subGrid() {
      if (this.subGridSize) {
        return this.size / this.subGridSize;
      }
    },
    subPattern() {
      if (this.subGridSize) {
        const s = this.subGrid;
        return `M ${s} 0 L 0 0 0 ${s}`;
      }
    },
    pattern() {
      const s = this.size;
      return `M ${s} 0 L 0 0 0 ${s}`;
    },
  },
};
</script><style scoped>
svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>