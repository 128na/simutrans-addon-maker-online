<template>
  <h6>基本情報</h6>
  <div class="q-ml-md">
    <param-name v-model="obj" />
    <param-copyright v-model="obj" />
  </div>
  <h6>その他</h6>
  <div class="q-ml-md">
    <param-intro-retire v-model="obj" />
  </div>
  <h6>画像</h6>
  <div class="q-ml-md"></div>
</template>
<script>
import Params from "./ParamEditor";

export default {
  icon: "maps_home_work",
  components: { ...Params },
  props: ["obj", "dat", "project"],
  emits: ["update"],
  watch: {
    obj() {
      this.$emit("update");
    },
  },
  computed: {
    imageNames() {
      return ["emptyimage"];
    },
    directions() {
      return ["s", "n", "e", "w", "ne", "sw", "se", "nw"];
    },
  },
};
</script>
