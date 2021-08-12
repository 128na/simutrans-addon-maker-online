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

    <!-- clusters -->
    <!-- chance -->
    <!-- level -->
    <!-- dims -->
    <!-- build_time -->
    <!-- passengers -->
    <!-- hq_level -->
    <!-- enables_pax -->
    <!-- enables_post -->
    <!-- enables_ware -->
    <!-- allow_underground -->
    <!-- icon -->
    <!-- cursor -->
    <!-- backimage -->
    <!-- frontimage -->
  </div>
  <h6>その他</h6>
  <div class="q-ml-md"></div>
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
  methods: {
    isType(types) {
      return types.dome((t) => this.type === t);
    },
  },
  computed: {
    type() {
      return this.obj.findParamByKey("type")?.value;
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
