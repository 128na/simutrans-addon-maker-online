<template>
  <input
    type="file"
    :accept="accept"
    :multiple="multiple"
    @change.prevent="handle"
  />
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
  methods: {
    async handle(e) {
      const files = await asyncFileReader([...e.target.files]);
      const images = {};
      files
        .filter((f) => f.result)
        .map((f) => (images[f.file.name.replace(".png", "")] = f.result));
      this.$emit("fileRead", images);
    },
  },
};
</script>