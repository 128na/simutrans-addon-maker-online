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
  props: ["value", "obj", "project"],
  emits: ["lineUpdate"],
  computed: {
    item: {
      get() {
        return this.value.valueWithParameter;
      },
      set(v) {
        const line = `${this.value.keyWithParameter}${this.value.operator}${v}`;
        this.$emit("lineUpdate", line);
      },
    },
  },
};
</script>