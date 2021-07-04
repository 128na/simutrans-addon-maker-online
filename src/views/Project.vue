<template v-if="project">
  <h1>{{ project.data.title }}</h1>
  <div>
    <label>プロジェクト名</label>
    <input type="text" v-model="project.data.title" />
  </div>
  <div>
    <label>アドオン名</label>
    <input type="text" v-model="project.data.filename" />
  </div>
  <div>
    <label>Pakサイズ</label>
    <input type="number" v-model="project.data.size" />
  </div>
  <div>
    <label>Datデータ</label>
    <droppable-textarea v-model:value="project.data.dat" />
  </div>
  <div>
    <label>画像の追加</label>
    <filr-reader @fileRead="handleAddImages" />

    <div v-for="image in images">
      <img :src="image.src" />
      <div>
        <span>{{ image.name }}</span>
        <button @click="handleDeleteImage(image.name)">削除</button>
      </div>
    </div>
  </div>
  <hr />
  <div>
    <button @click="handleReset()" :disabled="!hasChanged">取消</button>
    <button @click="handleUpdate" :disabled="!hasChanged">保存</button>
    <button @click="handlePak">Pak化</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { dataURL2Blob, dataURL2File, download, postPak } from "../libs";
import FilrReader from "../components/FilrReader.vue";
import DroppableTextarea from "../components/DroppableTextarea.vue";
export default {
  components: { FilrReader, DroppableTextarea },
  name: "Projects",
  data() {
    return {
      project: null,
      original: null,
    };
  },
  created() {
    const prj = this.projects.find((p) => p.id === this.$route.params.id);
    console.log({ prj });
    this.project = JSON.parse(JSON.stringify(prj));
    this.original = JSON.parse(JSON.stringify(prj));
  },
  computed: {
    ...mapGetters(["projects"]),
    images() {
      const images = [];
      for (const [name, src] of Object.entries(this.project.data.images)) {
        images.push({ name, src });
      }
      return images;
    },
    hasChanged() {
      return JSON.stringify(this.project) !== JSON.stringify(this.original);
    },
  },
  methods: {
    ...mapActions(["updateProject"]),
    handleReset() {
      this.project = JSON.parse(JSON.stringify(this.original));
    },
    handleUpdate() {
      this.updateProject(this.project);
      this.original = JSON.parse(JSON.stringify(this.project));
    },
    handleAddImages(images) {
      this.project.data.images = Object.assign(
        this.project.data.images,
        images
      );
    },
    handleDeleteImage(name) {
      if (confirm("削除してもよろしいでしょうか？")) {
        delete this.project.data.images[name];
      }
    },
    async handlePak() {
      const images = this.images.map((image) =>
        dataURL2File(image.src, image.name, ".png")
      );
      const url = await postPak({
        filename: this.project.data.filename,
        size: this.project.data.size,
        dat: this.project.data.dat,
        images,
      });

      download(url);
    },
  },
};
</script>
