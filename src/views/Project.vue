<template v-if="project">
  <common-title>{{ project.data.title }}</common-title>
  <common-box>
    <label for="title" class="form-label">プロジェクト名</label>
    <input
      type="text"
      id="title"
      class="form-control"
      v-model="project.data.title"
    />
  </common-box>
  <common-box>
    <label for="filename" class="form-label">アドオン名</label>
    <input
      type="text"
      id="filename"
      class="form-control"
      v-model="project.data.filename"
    />
  </common-box>
  <common-box>
    <label for="size" class="form-label">Pakサイズ</label>
    <input
      type="number"
      id="size"
      class="form-control"
      min="16"
      max="65535"
      v-model="project.data.size"
    />
  </common-box>
  <common-box>
    <label for="dat" class="form-label">Datデータ</label>
    <droppable-textarea
      formId="dat"
      rows="12"
      v-model:value="project.data.dat"
    />
  </common-box>
  <common-box>
    <label for="images" class="form-label">画像データ</label>
    <filr-reader formId="images" @fileRead="handleAddImages" />
  </common-box>
  <common-box v-for="image in images">
    <img :src="image.src" />
    <div>
      <span class="me-2">{{ image.name }}</span>
      <a
        href="#"
        class="text-danger"
        @click.prevent="handleDeleteImage(image.name)"
        >削除</a
      >
    </div>
  </common-box>
  <div class="p-4" />
  <nav class="navbar fixed-bottom navbar-dark bg-dark">
    <div class="container-fluid">
      <button
        class="btn btn-secondary me-2"
        @click="handleReset()"
        :disabled="!hasChanged"
      >
        変更を取消
      </button>
      <button
        class="btn btn-primary me-2"
        @click="handleUpdate"
        :disabled="!hasChanged"
      >
        変更を保存
      </button>
      <button
        class="btn btn-primary me-2"
        :disabled="fetching"
        @click="handlePak"
      >
        Pak化
      </button>

      <small class="ms-auto text-white"
        >{{ project.data.updatedAt }} 更新</small
      >
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { dataURL2File, download, postPak } from "../libs";
import FilrReader from "../components/FilrReader.vue";
import DroppableTextarea from "../components/DroppableTextarea.vue";
import CommonTitle from "../components/CommonTitle.vue";
import CommonBox from "../components/CommonBox.vue";
export default {
  components: { FilrReader, DroppableTextarea, CommonTitle, CommonBox },
  name: "Projects",
  data() {
    return {
      project: null,
      original: null,
      fetching: false,
    };
  },
  created() {
    const prj = this.projects.find((p) => p.id === this.$route.params.id);
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
      this.fetching = true;
      const images = this.images.map((image) =>
        dataURL2File(image.src, image.name, ".png")
      );
      try {
        const url = await postPak({
          filename: this.project.data.filename,
          size: this.project.data.size,
          dat: this.project.data.dat,
          images,
        });
        download(url);
      } catch (e) {
        alert(e.message);
      } finally {
        this.fetching = false;
      }
    },
  },
};
</script>
