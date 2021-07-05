<template>
  <div
    @dragover.prevent="handleDragover"
    @dragleave.prevent="handleDragleave"
    @drop.prevent="handleDrop"
  >
    <input
      type="file"
      :id="formId"
      :class="formClass"
      :accept="accept"
      :multiple="multiple"
      @change.prevent="handle"
    />
    <common-box class="text-secondary">
      <small> ドロップでファイルを追加。同名ファイルは上書きされます。 </small>
    </common-box>
  </div>
</template>
<script>
import { asyncFileReader } from "../libs";
export default {
  name: "FileReader",
  props: {
    accept: {
      type: String,
      default: "image/png",
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    formId: {
      type: String,
      default: "",
    },
    formClass: {
      type: String,
      default: "form-control",
    },
  },
  data() {
    return {
      dropping: false,
    };
  },
  methods: {
    handleDragover(e) {
      e.dataTransfer.dropEffect = "copy";
      this.dropping = true;
    },
    handleDragleave(e) {
      this.dropping = false;
    },
    handleDrop(e) {
      this.processFiles([...e.dataTransfer.files]);
      this.dropping = false;
    },
    handle(e) {
      this.processFiles([...e.target.files]);
    },
    async processFiles(files) {
      const result = await asyncFileReader(files);
      const images = {};
      result
        .filter((f) => f.result)
        .map((f) => (images[f.file.name] = f.result));
      this.$emit("fileRead", images);
    },
  },
};
</script>