<template>
  <li class="list-group-item">
    <select class="form-select" v-model="item">
      <option
        v-for="o in options"
        :value="o.value"
        :selected="o.value === item"
      >
        {{ o.text }} ({{ o.value }})
      </option>
    </select>
  </li>
  <li class="list-group-item">
    <small v-show="selected.desc">
      {{ selected.desc }}<br />
      <a target="_blank" :href="selected.link">Wiki</a>
    </small>
  </li>
</template>
<script>
import { OBJS } from "../../../constants/index";
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
    options() {
      return OBJS;
    },
    selected() {
      return OBJS.find((o) => o.value === this.item) || {};
    },
  },
};
</script>