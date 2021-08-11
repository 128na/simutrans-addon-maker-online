<template>
  <h6>基本情報</h6>
  <div class="q-ml-md">
    <param-name v-model="obj" />
    <param-copyright v-model="obj" />
    <param-way-type v-model="obj" />
    <param-engine-type v-model="obj" />
  </div>
  <h6>スペック</h6>
  <div class="q-ml-md">
    <param-speed v-model="obj" />
    <param-payload v-model="obj" />
    <param-weight v-model="obj" />
    <param-power-gear v-model="obj" />
  </div>
  <h6>コスト</h6>
  <div class="q-ml-md">
    <param-cost v-model="obj" />
    <param-running-cost v-model="obj" />
  </div>
  <h6>その他</h6>
  <div class="q-ml-md">
    <param-length v-model="obj" />
    <param-smoke v-model="obj" :project="project" />
    <param-sound v-model="obj" />
    <param-loading-time v-model="obj" />
    <param-intro-retire v-model="obj" />
  </div>
  <h6>連結</h6>
  <div class="q-ml-md">
    <param-constraint v-model="obj" :dat="dat" />
  </div>
  <h6>積載</h6>
  <div class="q-ml-md">
    <param-freight v-model="obj" :project="project" />
    <param-freightimagetype v-model="obj" :project="project" />
  </div>
  <h6>画像</h6>
  <div class="q-ml-md">
    <param-images
      v-model="obj"
      :project="project"
      :imageNames="['emptyimage']"
      :directions="directions"
      icon="svguse:/img/vehicle.svg"
    />
    <param-images
      v-if="freightimagetypes"
      v-model="obj"
      :project="project"
      :imageNames="['freightimage']"
      :directions="directions"
      :x="freightimagetypes - 1"
      icon="svguse:/img/vehicle.svg"
    />
  </div>
</template>
<script>
import Params from "./ParamEditor";

export default {
  icon: "local_shipping",
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
    freightimagetypes() {
      return this.obj.findParamsByKeyVal("freightimagetype").length;
    },
  },
};
</script>
