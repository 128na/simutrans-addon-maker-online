<template>
  <li class="list-group-item">
    <div :class="{ 'input-group': value.keyWithParameter }">
      <span class="input-group-text" v-show="value.keyWithParameter">
        <span>{{ value.keyWithParameter }}</span>
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