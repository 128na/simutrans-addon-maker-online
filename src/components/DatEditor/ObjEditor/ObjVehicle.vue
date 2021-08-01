<template>
  <template v-if="obj">
    <param-name v-model="obj" />
    <param-copyright v-model="obj" />
    <param-way-type v-model="obj" />
    <param-freight v-model="obj" />
    <param-speed v-model="obj" />
    <param-payload v-model="obj" />
    <param-cost v-model="obj" />
    <param-weight v-model="obj" />
    <param-length v-model="obj" />
    <param-power v-model="obj" />
    <param-gear v-model="obj" />
    <param-running-cost v-model="obj" />
  </template>
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