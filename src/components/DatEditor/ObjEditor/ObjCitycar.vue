<template>
  <h6>基本情報</h6>
  <param-name v-model="obj" />
  <param-copyright v-model="obj" />
  <param-distribution-weight v-model="obj" />
  <param-speed v-model="obj" />

  <h6>画像</h6>
  <param-images-citycar v-model="obj" :project="project" />
</template>
<script>
import Params from "./ParamEditor";

export default {
  icon: "mdi-car-hatchback",
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
