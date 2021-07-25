<template>
  <input
    type="file"
    id="images"
    :accept="accept"
    :multiple="multiple"
    @change.prevent="handleFile"
  />
</template>
<script>
import { asyncFileReader } from "../../services/File";
import DroppableBox from "./../DroppableBox.vue";
import filePersister from "./../../firebase/filePersister";
import { mapGetters } from "vuex";
export default {
  components: { DroppableBox },
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
    projectId: {
      type: String,
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
      const value = await Promise.all(
        files.map(async (f) => {
          return {
            filename: f.name,
            url: await filePersister.upload(this.userId, f),
          };
        })
      );
      this.$emit("fileRead", value);
    },
  },
  computed: {
    ...mapGetters(["userId"]),
  },
};
</script>