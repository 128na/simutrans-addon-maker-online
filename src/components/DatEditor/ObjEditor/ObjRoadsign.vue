<template>
  <h6>基本情報</h6>
  <param-name v-model="obj" />
  <param-copyright v-model="obj" />
  <param-waytype v-model="obj" />

  <h6>信号タイプ</h6>
  <param-min-speed v-model="obj" />
  <param-single-way v-model="obj" />
  <param-free-route v-model="obj" />
  <param-is-private v-model="obj" />
  <param-is-signal v-model="obj" />
  <param-is-presignal v-model="obj" />
  <param-is-longblocksignal v-model="obj" />
  <param-is-prioritysignal v-model="obj" />
  <param-end-of-choose v-model="obj" />

  <h6>その他</h6>
  <param-cost v-model="obj" />
  <param-offset-left v-model="obj" />
  <param-intro-retire v-model="obj" />

  <h6>画像</h6>
  <param-icon v-model="obj" :project="project" />
  <param-cursor v-model="obj" :project="project" />
  <param-images-roadsign v-model="obj" :project="project" />
</template>
<script>
import Params from "./ParamEditor";

export default {
  icon: "mdi-traffic-light",
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
