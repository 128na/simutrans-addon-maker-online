<template>
  <h6>基本情報</h6>
  <param-name v-model="obj" />
  <param-copyright v-model="obj" />
  <param-type v-model="obj" />
  <param-animation-time v-model="obj" />
  <param-climates v-model="obj" />
  <param-intro-retire v-model="obj" />
  <param-noinfo v-model="obj" />
  <param-noconstruction v-model="obj" />
  <param-needs-ground v-model="obj" />

  <h6>タイプ別設定</h6>
  <template v-if="isType(['res', 'com', 'ind'])">
    <param-clusters v-model="obj" />
    <param-chance v-model="obj" />
    <param-level v-model="obj" />
    <param-dims v-model="obj" />
  </template>
  <template v-if="isType(['cur', 'mon'])">
    <param-chance v-model="obj" />
    <param-level v-model="obj" />
    <param-dims v-model="obj" />
    <param-build-time v-model="obj" />
    <param-passengers v-model="obj" />
  </template>
  <template v-if="isType(['tow'])">
    <param-level v-model="obj" />
    <param-dims v-model="obj" />
    <param-build-time v-model="obj" />
  </template>
  <template v-if="isType(['hq'])">
    <param-level v-model="obj" />
    <param-dims v-model="obj" />
    <param-build-time v-model="obj" />
    <param-hq-level v-model="obj" />
  </template>
  <template v-if="isType(['stop'])">
    <param-waytype v-model="obj" />
    <param-level v-model="obj" />
    <param-enables-pax v-model="obj" />
    <param-enables-post v-model="obj" />
    <param-enables-ware v-model="obj" />
    <param-allow-underground v-model="obj" />
    <param-icon v-model="obj" :project="project" />
    <param-cursor v-model="obj" :project="project" />
  </template>
  <template v-if="isType(['extension'])">
    <param-waytype v-model="obj" />
    <param-level v-model="obj" />
    <param-dims v-model="obj" />
    <param-enables-pax v-model="obj" />
    <param-enables-post v-model="obj" />
    <param-enables-ware v-model="obj" />
    <param-icon v-model="obj" :project="project" />
    <param-cursor v-model="obj" :project="project" />
  </template>
  <template v-if="isType(['depot'])">
    <param-waytype v-model="obj" />
    <param-icon v-model="obj" :project="project" />
    <param-cursor v-model="obj" :project="project" />
  </template>
  <template v-if="isType(['harbour'])">
    <param-level v-model="obj" />
    <param-dims v-model="obj" />
    <param-enables-pax v-model="obj" />
    <param-enables-post v-model="obj" />
    <param-enables-ware v-model="obj" />
    <param-icon v-model="obj" :project="project" />
    <param-cursor v-model="obj" :project="project" />
  </template>

  <h6>画像</h6>
  <param-images-building v-model="obj" :project="project" />
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
      return types.some((t) => this.type === t);
    },
  },
  computed: {
    type() {
      return this.obj.findParam("type")?.value;
    },
  },
};
</script>
