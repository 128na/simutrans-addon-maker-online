<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="高さ"
    type="number"
    min="1"
    hint="縦方向のタイル数を指定します。"
    v-model="height"
  />
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="アニメーションフレーム数"
    type="number"
    min="1"
    hint="切り替える画像数を指定します。固定画像の場合は１"
    v-model="animations"
  />
  <q-item tag="label" v-ripple class="q-pa-none">
    <q-item-section side>
      <q-checkbox dense v-model="snow" />
    </q-item-section>
    <q-item-section>
      <q-item-label>降雪画像</q-item-label>
      <q-item-label caption> 降雪時の画像を追加します </q-item-label>
    </q-item-section>
  </q-item>
  <template v-for="keyName in backImages">
    <param-image
      ambiguousKeyName="1"
      v-model="modelValue"
      :keyName="keyName"
      :project="project"
      @update:modelValue="$emit('update:modelValue')"
    />
  </template>
  <template v-for="keyName in frontImages">
    <param-image
      ambiguousKeyName="1"
      v-model="modelValue"
      :keyName="keyName"
      :project="project"
      @update:modelValue="$emit('update:modelValue')"
    />
  </template>
</template>
<script>
import ParamImage from "./ParamImage.vue";
import { createArray, createKeyPattern } from "@/services/Array";
export default {
  components: { ParamImage },
  props: ["modelValue", "project"],
  data() {
    return {
      height: 1,
      animations: 1,
      snow: false,
    };
  },
  created() {
    const keys = ["frontimage", "backimage"];
    this.height = this.modelValue.findMaxParamKeyVal(keys, 3);
    this.animations = this.modelValue.findMaxParamKeyVal(keys, 4);
    this.snow = this.modelValue.findMaxParamKeyVal(keys, 5, 0) > 0;
  },
  computed: {
    dims() {
      return this.modelValue.findParam("dims")?.value.split(",") || [];
    },
    size() {
      return Math.max(Number(this.dims[0]) || 0, Number(this.dims[1]) || 0);
    },
    type() {
      return this.modelValue.findParam("type")?.value;
    },
    layout() {
      return Number(this.dims[2]) || 0;
    },
    params() {
      return [
        createArray(this.layout),
        createArray(this.size),
        createArray(this.size),
        createArray(this.height),
        createArray(this.animations),
        createArray(this.snow ? 2 : 1),
      ];
    },
    backImages() {
      return createKeyPattern("backimage", this.params);
    },
    frontImages() {
      return createKeyPattern("frontimage", this.params);
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
  },
};
</script>
