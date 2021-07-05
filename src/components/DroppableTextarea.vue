<template>
  <div
    @dragover.prevent="handleDragover"
    @dragleave.prevent="handleDragleave"
    @drop.prevent="handleDrop"
  >
    <textarea
      :id="formId"
      :class="formClass"
      :value="value"
      :rows="rows"
      @input="handleUpdate"
    />
    <common-box class="text-secondary">
      <small v-show="dropping && append">ファイル内容を追加。</small>
      <small v-show="dropping && !append">ファイル内容で上書き。</small>
      <small v-show="!dropping">
        .datファイルをドロップで内容を上書き、Ctrl+ドロップで追加。
      </small>
    </common-box>
  </div>
</template>
<script>
import { asyncTextReader } from "../libs";
import CommonBox from "./CommonBox.vue";

export default {
  components: { CommonBox },
  props: {
    value: {
      type: String,
      default: "",
    },
    formId: {
      type: String,
      default: "",
    },
    formClass: {
      type: String,
      default: "form-control",
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
      const files = await asyncTextReader(
        [...e.dataTransfer.files].filter((f) => f.name.endsWith(".dat"))
      );
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