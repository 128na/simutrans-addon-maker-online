<template>
  <li class="list-group-item">
    <input class="form-control" v-model="item" />
  </li>
  <li class="list-group-item">
    <small>
      作者名。<br />
      元にしたアドオンがある場合、原作者名を連ねて書くことが多い。
    </small>
  </li>
</template>
<script>
export default {
  props: ["value", "obj", "project"],
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