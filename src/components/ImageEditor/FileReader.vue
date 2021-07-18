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
    <div class="text-secondary">
      <small> ドロップでファイルを追加。同名ファイルは上書きされます。 </small>
    </div>
  </droppable-box>
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
            url: await filePersister.project.upload(
              this.userId,
              this.projectId,
              f
            ),
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