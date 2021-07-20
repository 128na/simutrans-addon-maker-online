<template>
  <li class="list-group-item">
    <div :class="{ 'input-group': value.key.raw }">
      <span class="input-group-text" v-show="value.key.raw">
        <span>{{ value.key.raw }}</span>
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
        return this.value.value.raw;
      },
      set(v) {
        const line = `${this.value.key.raw}${this.value.operator}${v}`;
        this.$emit("lineUpdate", line);
      },
    },
  },
};
</script>