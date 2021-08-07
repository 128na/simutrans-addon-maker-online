<template>
  <q-input
    type="textarea"
    v-model="value"
    borderless
    autogrow
    label="Dat"
    style="min-height: 25vh"
  />
</template>
<script>
export default {
  icon: "mdi-file-question",
  props: ["obj", "dat", "project"],
  emits: ["update"],
  computed: {
    value: {
      get() {
        return this.obj.toString() || "";
      },
      set(v) {
        this.obj.updateFromString(v);
        this.$emit("update");
      },
    },
  },
};
</script>