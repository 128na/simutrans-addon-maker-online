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
    <q-separator v-show="project.data.imageUrls.length" />
    <q-tab-panels v-model="tab" animated>
      <template v-for="(image, index) in project.data.imageUrls">
        <q-tab-panel :name="index" class="q-pa-none">
          <!-- line-height >= 1remだと画像下に空白ができるぞい -->
          <q-card-section>
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
          </q-card-section>
          <q-separator />
          <q-btn
            color="secondary"
            flat
            icon="remove"
            label="プロジェクトから外す"
            @click="handleRemoveImage(index)"
          />
        </q-tab-panel>
      </template>
    </q-tab-panels>
    <q-item v-show="!project.data.imageUrls.length">画像がありません</q-item>
    <q-separator />
    <q-btn
      color="secondary"
      flat
      icon="add"
      label="画像を追加"
      @click="dialog = true"
    />
    <full-dialog v-model="dialog">
      <template v-slot:header>
        <q-toolbar>
          <q-toolbar-title>画像管理</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
      </template>
      <template v-slot:default>
        <image-manager v-slot="slotProps">
          <q-btn
            dense
            no-caps
            color="primary"
            icon="add"
            label="プロジェクトへ追加"
            @click="handleAddImage(slotProps)"
          />
        </image-manager>
      </template>
    </full-dialog>
  </q-card>
</template>
<script>
import ImageManager from "./ImageManager.vue";
import SvgGrid from "../Svg/SvgGrid.vue";
import FullDialog from "../FullDialog.vue";

export default {
  props: ["value", "project"],
  components: { SvgGrid, ImageManager, FullDialog },
  data() {
    return {
      tab: 0,
      dialog: false,
    };
  },
  methods: {
    handleAddImage({ selected, handleClose }) {
      const index = this.project.data.imageUrls.findIndex(
        (i) => i.filename === selected.filename
      );

      if (index === -1) {
        this.project.data.imageUrls.push(selected);
      } else {
        this.project.data.imageUrls.splice(index, 1, selected);
      }
      handleClose();
      this.notifyPositive("画像を追加しました。");
    },
    handleRemoveImage(index) {
      this.project.data.imageUrls.splice(index, 1);
      this.tab = Math.min(this.tab, this.project.data.imageUrls.length - 1);
    },
  },
};
</script>