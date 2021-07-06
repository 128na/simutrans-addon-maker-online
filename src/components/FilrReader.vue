<template>
  <droppable-box @fileDropped="handleFileDropped">
    <input
      type="file"
      id="images"
      class="form-control"
      :accept="accept"
      :multiple="multiple"
      @change.prevent="handleFile"
    />
    <common-box class="text-secondary">
      <small> ドロップでファイルを追加。同名ファイルは上書きされます。 </small>
    </common-box>
  </droppable-box>
</template>
<script>
import { asyncFileReader } from "../services/File";
import CommonBox from "../components/CommonBox.vue";
import DroppableBox from "./DroppableBox.vue";
export default {
  components: { DroppableBox, CommonBox },
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
    handleFile(e) {
      this.processFiles([...e.target.files]);
    },
    handleFileDropped({ files }) {
      this.processFiles(files.filter((f) => f.name.endsWith(".png")));
    },
    async processFiles(files) {
      const result = await asyncFileReader(
        files.filter((f) => f.name.endsWith(".png"))
      );
      const images = {};
      result
        .filter((f) => f.result)
        .map((f) => (images[f.file.name] = f.result));
      this.$emit("fileRead", images);
    },
  },
};
</script>