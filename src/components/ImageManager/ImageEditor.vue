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
          <!-- line-height >= 1remだと画像下に空白ができるぞい -->
          <div style="line-height: 0">
            <div
              class="relative-position"
              style="display: inline-block; line-height: 0"
            >
              <img :src="image.url" />
              <svg-grid
                :id="`preview-${index}`"
                :size.number="this.project.data.size"
              />
            </div>
          </div>
          <q-separator />
          <q-btn
            color="secondary"
            flat
            icon="remove"
            label="プロジェクトから外す"
            @click.prevent="handleRemoveImage(index)"
          />
        </q-tab-panel>
      </template>
    </q-tab-panels>
    <q-separator />
    <q-btn
      color="secondary"
      flat
      icon="add"
      label="プロジェクトへ追加"
      @click.prevent="dialog = true"
    />
    <q-dialog v-model="dialog">
      <q-card style="min-width: 75vw">
        <q-toolbar>
          <q-toolbar-title>画像管理</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-separator />
        <image-manager v-slot="slotProps">
          <q-separator />
          <q-toolbar>
            <q-space />
            <q-btn
              color="primary"
              no-caps
              @click="handleAddImage(slotProps.shownFile)"
              :disable="!slotProps.shownFile"
              icon="add"
              label="プロジェクトへ追加"
            />
          </q-toolbar>
        </image-manager>
      </q-card>
    </q-dialog>
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