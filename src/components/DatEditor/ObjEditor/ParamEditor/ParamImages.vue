<template>
  <template v-for="imageParam in imageParams">
    <param-image
      v-model="modelValue"
      :keyName="imageParam.keyName"
      :project="project"
      :icon="imageParam.icon"
      :staticSize="staticSize"
      @update:modelValue="$emit('update:modelValue')"
    />
  </template>
</template>
<script>
import ParamImage from "./ParamImage.vue";
export default {
  components: { ParamImage },
  props: {
    modelValue: {},
    project: {},
    staticSize: {
      type: Number,
      default: null,
    },
    keyNames: {
      type: Array,
      default: () => ["image"],
    },
    directions: {
      type: Array,
      default: () => [],
    },
    icon: {
      type: String,
      default: "",
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
  methods: {
    key(keyVal, keyParams) {
      const p = keyParams.map((p) => `[${p}]`).join("");
      return `${keyVal}${p}`;
    },
  },
  computed: {
    imageParams() {
      return this.keyNames
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
          const keyName = this.key(keyVal, keyParams);
          const icon = this.icon ? `${this.icon}#${keyParams[0] || 0}` : null;
          return {
            keyName,
            icon,
          };
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
