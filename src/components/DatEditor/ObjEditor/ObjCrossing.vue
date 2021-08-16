<template>
  <h6>基本情報</h6>
  <param-name v-model="obj" />
  <param-copyright v-model="obj" />

  <h6>遮断される側</h6>
  <param-waytype v-model="obj" param="0" />
  <param-speed v-model="obj" param="0" />

  <h6>遮断する側</h6>
  <param-waytype v-model="obj" param="1" />
  <param-speed v-model="obj" param="1" />

  <h6>その他</h6>
  <param-sound v-model="obj" />
  <param-intro-retire v-model="obj" />

  <h6>画像</h6>
  <param-images-crossing v-model="obj" :project="project" />
</template>
<script>
import Params from "./ParamEditor";

export default {
  icon: "mdi-railroad-light",
  components: { ...Params },
  props: ["obj", "dat", "project"],
  emits: ["update"],
  watch: {
    obj() {
      this.$emit("update");
    },
  },
};
</script>
