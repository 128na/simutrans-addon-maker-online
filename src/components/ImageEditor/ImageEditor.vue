<template>
  <file-reader @fileRead="handleAddImages" />

  <!-- tab list -->
  <ul class="nav nav-tabs">
    <li class="nav-item" v-for="image in images">
      <button
        class="nav-link"
        :class="{ active: selected === image.name }"
        data-bs-toggle="tab"
        :data-bs-target="`#image-${image.name}`"
        @click.prevent="handleTab(image.name)"
      >
        {{ image.name }}
      </button>
    </li>
  </ul>

  <!-- tab content -->
  <div class="tab-content">
    <div
      class="tab-pane fade p-3"
      :class="{
        active: selected === image.name,
        show: selected === image.name,
      }"
      :id="`image-${image.name}`"
      v-for="image in images"
    >
      <div class="overflow-auto">
        <img :src="image.src" />
      </div>
      <a
        href="#"
        class="text-primary me-2"
        @click.prevent="handleDownloadImage(image)"
        >ダウンロード</a
      >
      <a
        href="#"
        class="text-danger"
        @click.prevent="handleDeleteImage(image.name)"
        >削除</a
      >
    </div>
  </div>
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
  created() {
    this.selected = this.images.length ? this.images[0].name : "";
  },
  computed: {
    images() {
      const images = [];
      for (const [name, src] of Object.entries(this.value)) {
        images.push({ name, src });
      }
      return images;
    },
  },
  methods: {
    handleTab(name) {
      this.selected = name;
    },
    handleAddImages(images) {
      const value = Object.assign(this.value, images);
      this.$emit("update:value", value);
    },
    handleDeleteImage(name) {
      if (confirm("削除してもよろしいでしょうか？")) {
        const value = Object.assign({}, this.value);
        delete value[name];
        this.$emit("update:value", value);

        this.selected = this.images.length ? this.images[0].name : "";
      }
    },
    handleDownloadImage(image) {
      download(image.src, image.name);
    },
  },
};
</script>