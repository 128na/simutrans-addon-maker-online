<template>
  <textarea
    :value="value"
    :rows="rows"
    @input="handleUpdate"
    @dragover.prevent="handleDragover"
    @dragleave.prevent="handleDragleave"
    @drop.prevent="handleDrop"
  />
  <div v-show="dropping && append">ドロップ内容を追加</div>
  <div v-show="dropping && !append">ドロップ内容を上書き</div>
  <div v-show="!dropping">ドロップ内容を上書き、Ctrl+ドロップで追加</div>
</template>
<script>
import { asyncTextReader } from "../libs";

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    rows: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      dropping: false,
      append: true,
    };
  },
  methods: {
    handleDragover(e) {
      e.dataTransfer.dropEffect = "copy";
      this.dropping = true;
      this.append = !e.ctrlKey;
    },
    handleDragleave(e) {
      this.dropping = false;
    },
    async handleDrop(e) {
      const files = await asyncTextReader([...e.dataTransfer.files]);
      const value = files.reduce(
        (current, f) => `${current}\n# import from ${f.file.name}\n${f.result}`,
        this.append ? this.value : ""
      );

      this.$emit("update:value", value);
      this.dropping = false;
    },
    handleUpdate(e) {
      this.$emit("update:value", e.target.value);
    },
  },
};
</script>