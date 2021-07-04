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
    <textarea rows="10" v-model="project.data.dat" />
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
    <button @click="handleUpdate">保存</button>
    <button @click="handlePak">Pak化</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { dataURL2Blob, dataURL2File, download, postPak } from "../libs";
import FilrReader from "../components/FilrReader.vue";
export default {
  components: { FilrReader },
  name: "Projects",
  data() {
    return {
      project: null,
    };
  },
  created() {
    this.project = this.projects.find((p) => p.id === this.$route.params.id);
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
  },
  methods: {
    ...mapActions(["updateProject"]),
    handleUpdate() {
      this.updateProject(this.project);
    },
    handleAddImages(images) {
      this.project.data.images = Object.assign(
        this.project.data.images,
        images
      );
      this.handleUpdate();
    },
    handleDeleteImage(name) {
      if (confirm("削除してもよろしいでしょうか？")) {
        delete this.project.data.images[name];
        this.handleUpdate();
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
