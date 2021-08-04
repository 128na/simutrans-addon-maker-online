<template>
  <template v-for="k in imageKeys">
    <div>
      <div>{{ k.param?.toString() || "未指定" }}</div>
      <image-preview :param="k.param" :project="project" />
    </div>
  </template>
</template>

<script>
import {} from "@/services/Validator";
import ImagePreview from "./ImagePreview.vue";
export default {
  components: { ImagePreview },
  props: {
    modelValue: {},
    project: {},
    imageNames: {
      type: Array,
      default: () => ["image"],
    },
    directions: {
      type: Array,
      default: () => [],
    },
    x: {
      // 画像座標: 左->右
      type: [Number, null],
      default: null,
    },
    y: {
      // 画像座標: 上->下
      type: [Number, null],
      default: null,
    },
    h: {
      type: [Number, null],
      default: null,
    },
    animation: {
      type: [Number, null],
      default: null,
    },
    snow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
  computed: {
    imageKeys() {
      return this.imageNames
        .map((n) => [n])
        .flatMap((l) => this.directions.map((d) => [...l, d]))
        .flatMap((l) => (this.needX ? this.itemX.map((i) => [...l, i]) : [l]))
        .flatMap((l) => (this.needY ? this.itemY.map((i) => [...l, i]) : [l]))
        .flatMap((l) => (this.needH ? this.itemH.map((i) => [...l, i]) : [l]))
        .flatMap((l) => (this.needA ? this.itemA.map((i) => [...l, i]) : [l]))
        .flatMap((l) => (this.needS ? this.itemS.map((i) => [...l, i]) : [l]))
        .map((l) => {
          const keyVal = l[0];
          const keyParams = l.filter((_, i) => i);
          const param = this.modelValue.findParamByKeyParams(keyVal, keyParams);
          return { keyVal, keyParams, param };
        });
    },
    needX() {
      return this.x !== null || this.needY;
    },
    itemX() {
      return [...Array(1 + this.x)].map((_, i) => i);
    },
    needY() {
      return this.y !== null || this.needH;
    },
    itemY() {
      return [...Array(1 + this.y)].map((_, i) => i);
    },
    needH() {
      return this.h !== null || this.needA;
    },
    itemH() {
      return [...Array(1 + this.h)].map((_, i) => i);
    },
    needA() {
      return this.animation !== null || this.needS;
    },
    itemA() {
      return [...Array(1 + this.animation)].map((_, i) => i);
    },
    needS() {
      return this.snow;
    },
    itemS() {
      return [...Array(this.snow ? 2 : 1)].map((_, i) => i);
    },
  },
};
</script>