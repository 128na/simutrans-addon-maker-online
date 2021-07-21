<template>
  <li class="list-group-item">
    <div :class="{ 'input-group': value.keyWithParam }">
      <span class="input-group-text" v-show="value.keyWithParam">
        <span>{{ value.keyWithParam }}</span>
        <span>{{ value.operator }}</span>
      </span>
      <input class="form-control" v-model="item" />
    </div>
  </li>
</template>
<script>
export default {
  props: ["value", "obj", "project"],
  emits: ["lineUpdate"],
  computed: {
    item: {
      get() {
        return this.value.valueWithParam;
      },
      set(v) {
        const line = `${this.value.keyWithParam}${this.value.operator}${v}`;
        this.$emit("lineUpdate", line);
      },
    },
  },
};
</script>