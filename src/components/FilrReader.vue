<template>
  <input
    type="file"
    :accept="accept"
    :multiple="multiple"
    @change.prevent="handle"
    @dragover.prevent="handleDragover"
    @dragleave.prevent="handleDragleave"
    @drop.prevent="handleDrop"
  />
  <div v-show="dropping">ドロップでファイルを追加</div>
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
        .map((f) => (images[f.file.name.replace(".png", "")] = f.result));
      this.$emit("fileRead", images);
    },
  },
};
</script>