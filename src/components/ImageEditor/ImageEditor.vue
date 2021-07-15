<template>
  <!-- tab list -->
  <ul class="nav nav-tabs">
    <li class="nav-item" v-for="(image, index) in value">
      <button
        class="nav-link"
        :class="{ active: selected === index }"
        data-bs-toggle="tab"
        :data-bs-target="`#image-${index}`"
        @click.prevent="handleTab(index)"
      >
        {{ image.filename }}
      </button>
    </li>
  </ul>

  <!-- tab content -->
  <div class="tab-content">
    <div
      class="tab-pane fade p-3"
      :class="{
        active: selected === index,
        show: selected === index,
      }"
      :id="`image-${index}`"
      v-for="(image, index) in value"
    >
      <div class="overflow-auto">
        <img :src="image.url" />
      </div>
      <a
        href="#"
        class="text-primary me-2"
        @click.prevent="handleDownloadImage(image)"
        >ダウンロード</a
      >
      <a href="#" class="text-danger" @click.prevent="handleDeleteImage(index)"
        >削除</a
      >
    </div>
  </div>
  <file-reader :projectId="project.id" @fileRead="handleAddImages" />
</template>
<script>
import { download } from "../../services/File";
import FileReader from "./FileReader.vue";
export default {
  props: ["value", "project"],
  components: { FileReader },
  data() {
    return {
      selected: 0,
    };
  },
  methods: {
    handleTab(index) {
      this.selected = index;
    },
    handleAddImages(images) {
      console.log({ images });
      const tmp = {};
      [...this.value, ...images].map((i) => (tmp[i.filename] = i.url));

      const value = Object.entries(tmp).map(([filename, url]) => {
        return { filename, url };
      });
      this.$emit("update:value", value);
    },
    handleDeleteImage(index) {
      if (confirm("削除してもよろしいでしょうか？")) {
        this.value.splice(index, 1);
        this.$emit("update:value", this.value);

        this.selected =
          this.selected > this.value.length - 1
            ? this.value.length - 1
            : this.selected;
      }
    },
    handleDownloadImage(image) {
      download(image.url, image.filename);
    },
  },
};
</script>