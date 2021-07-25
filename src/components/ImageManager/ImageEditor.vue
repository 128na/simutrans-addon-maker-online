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
          <div class="q-pa-xs">
            <a
              href="#"
              class="text-secondary"
              @click.prevent="handleRemoveImage(index)"
            >
              プロジェクトから外す
            </a>
          </div>
        </q-tab-panel>
      </template>
    </q-tab-panels>
    <q-separator />
    <div class="q-pa-xs">
      <a href="#" class="text-secondary" @click.prevent="dialog = true">
        画像の追加
      </a>
      <q-dialog v-model="dialog">
        <q-card style="min-width: 75vw">
          <image-manager v-slot="slotProps">
            <q-separator />
            <q-toolbar>
              <span v-if="slotProps.shownFile">
                選択中の画像: {{ slotProps.shownFile.filename }}
              </span>
              <q-space />
              <q-btn
                color="primary"
                no-caps
                @click="handleAddImage(slotProps.shownFile)"
                :disable="!slotProps.shownFile"
                label="選択画像をプロジェクトへ追加"
              />
            </q-toolbar>
          </image-manager>
        </q-card>
      </q-dialog>
    </div>
  </q-card>
</template>
<script>
import SvgGrid from "../Svg/SvgGrid.vue";
import ImageManager from "./ImageManager.vue";
export default {
  props: ["value", "project"],
  components: { SvgGrid, ImageManager },
  data() {
    return {
      tab: 0,
      dialog: false,
    };
  },
  methods: {
    handleAddImage(image) {
      const index = this.project.data.imageUrls.findIndex(
        (i) => i.filename === image.filename
      );

      if (index === -1) {
        this.project.data.imageUrls.push(image);
      } else {
        this.project.data.imageUrls.splice(index, 1, image);
      }
      this.dialog = false;
    },
    handleRemoveImage(index) {
      this.project.data.imageUrls.splice(index, 1);
      this.tab = Math.min(this.tab, this.project.data.imageUrls.length - 1);
    },
  },
};
</script>