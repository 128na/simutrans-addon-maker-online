<template>
  <h6>基本情報</h6>
  <param-name v-model="obj" />
  <param-copyright v-model="obj" />
  <param-way-type v-model="obj" />
  <param-engine-type v-model="obj" />

  <h6>スペック</h6>
  <param-speed v-model="obj" />
  <param-payload v-model="obj" />
  <param-weight v-model="obj" />
  <param-power-gear v-model="obj" />

  <h6>コスト</h6>
  <param-cost v-model="obj" />
  <param-running-cost v-model="obj" />

  <h6>その他</h6>
  <param-length v-model="obj" />
  <param-smoke v-model="obj" :project="project" />
  <param-sound v-model="obj" />
  <param-loading-time v-model="obj" />
  <param-intro-retire v-model="obj" />

  <h6>連結</h6>
  <param-constraint v-model="obj" :dat="dat" />

  <h6>積載</h6>
  <param-freight v-model="obj" :project="project" />
  <param-freightimagetype v-model="obj" :project="project" />

  <h6>画像</h6>
  <param-vehicle-images v-model="obj" :project="project" />
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
};
</script>
