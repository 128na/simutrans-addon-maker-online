<template>
  <h6>基本情報</h6>
  <param-name v-model="obj" />
  <param-copyright v-model="obj" />
  <param-waytype v-model="obj" />
  <param-system-type v-model="obj" />
  <param-topspeed v-model="obj" />

  <h6>コスト</h6>
  <param-cost v-model="obj" />
  <param-maintenance v-model="obj" />

  <h6>その他</h6>
  <param-draw-as-ding v-model="obj" />
  <param-intro-retire v-model="obj" />

  <h6>画像</h6>
  <param-icon v-model="obj" :project="project" />
  <param-cursor v-model="obj" :project="project" />
  <param-images-way v-model="obj" :project="project" />
</template>
<script>
import Params from "./ParamEditor";

export default {
  icon: "mdi-road",
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
