<template>
  <h6>基本情報</h6>
  <div class="q-ml-md">
    <param-name v-model="obj" />
    <param-copyright v-model="obj" />
    <param-type v-model="obj" />
    <param-animation-time v-model="obj" />
    <param-climates v-model="obj" />
    <param-intro-retire v-model="obj" />
    <param-noinfo v-model="obj" />
    <param-noconstruction v-model="obj" />
    <param-needs-ground v-model="obj" />

    <param-way-type v-model="obj" />
    <param-clusters v-model="obj" />
    <param-chance v-model="obj" />
    <param-level v-model="obj" />
    <param-build-time v-model="obj" />
    <param-passengers v-model="obj" />
    <param-hq-level v-model="obj" />
    <param-enables-pax v-model="obj" />
    <param-enables-post v-model="obj" />
    <param-enables-ware v-model="obj" />
    <param-allow-underground v-model="obj" />
    <param-dims v-model="obj" />
  </div>
  <h6>その他</h6>
  <div class="q-ml-md"></div>
  <h6>画像</h6>
  <div class="q-ml-md">
    <param-icon v-model="obj" :project="project" />
    <param-cursor v-model="obj" :project="project" />
    <param-building-images v-model="obj" :project="project" />
  </div>
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
  methods: {
    isType(types) {
      return types.dome((t) => this.type === t);
    },
  },
  computed: {
    type() {
      return this.obj.findParam("type")?.value;
    },
    imageNames() {
      return ["emptyimage"];
    },
    directions() {
      return ["s", "n", "e", "w", "ne", "sw", "se", "nw"];
    },
  },
};
</script>
