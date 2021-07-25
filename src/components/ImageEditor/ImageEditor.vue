<template>
  <q-card flat bordered>
    <q-tabs
      v-model="tab"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
      inline-label
      dense
    >
      <template v-for="(image, index) in project.data.imageUrls">
        <q-tab :name="index" :label="image.filename" no-caps />
      </template>
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <template v-for="(image, index) in project.data.imageUrls">
        <q-tab-panel :name="index" class="q-pa-none">
          <div>
            <div class="relative-position" style="display: inline-block">
              <img :src="image.url" />
              <svg-grid
                :id="`preview-${index}`"
                :size.number="this.project.data.size"
              />
            </div>
          </div>
          <a
            href="#"
            class="text-primary q-mx-sm"
            @click.prevent="handleDownloadImage(image)"
            >ダウンロード</a
          >
          <a
            href="#"
            class="text-negative"
            @click.prevent="handleDeleteImage(index)"
            >削除</a
          >
        </q-tab-panel>
      </template>
    </q-tab-panels>
    <q-separator />
    <q-card-section>
      <file-reader :projectId="project.id" @fileRead="handleAddImages" />
    </q-card-section>
  </q-card>
</template>
<script>
import { download } from "../../services/File";
import SvgGrid from "../Svg/SvgGrid.vue";
import FileReader from "./FileReader.vue";
export default {
  props: ["value", "project"],
  components: { FileReader, SvgGrid },
  data() {
    return {
      tab: 0,
    };
  },
  methods: {
    handleAddImages(images) {
      images.map((image) => {
        const index = this.project.data.imageUrls.findIndex(
          (i) => i.filename === image.filename
        );

        if (index === -1) {
          this.project.data.imageUrls.push(image);
        } else {
          this.project.data.imageUrls.splice(index, 1, image);
        }
      });
    },
    handleDeleteImage(index) {
      if (confirm("削除してもよろしいでしょうか？")) {
        this.project.data.imageUrls.splice(index, 1);

        this.tab = Math.min(this.tab, this.project.data.imageUrls.length - 1);
      }
    },
    handleDownloadImage(image) {
      download(image.url, image.filename);
    },
  },
};
</script>