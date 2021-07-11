<template>
  <li class="list-group-item">
    <input class="form-control" v-model="item" />
  </li>
  <li class="list-group-item">
    <small>車両よりも奥に表示される画像<br /> </small>
  </li>
</template>
<script>
export default {
  props: ["value", "project"],
  emits: ["lineUpdate"],
  computed: {
    item: {
      get() {
        return this.value.split("=")[1] || "";
      },
      set(v) {
        const data = this.value.split("=");
        data.splice(1, 1, v);

        this.$emit("lineUpdate", data.join("="));
      },
    },
  },
};
</script>