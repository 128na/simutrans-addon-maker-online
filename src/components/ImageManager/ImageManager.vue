<template>
  <q-card-section class="q-px-md q-py-xs">
    <q-file
      borderless
      v-model="selectedFiles"
      multiple
      dense
      label="アップロード画像を選択"
      accept=".png"
      @change="handleUpload"
    />
  </q-card-section>
  <q-separator />
  <q-card-section class="q-px-md q-py-xs">
    <q-input v-model.trim="search" borderless dense label="絞り込み" />
  </q-card-section>
  <q-separator />

  <q-tabs
    v-model="col"
    dense
    align="left"
    active-color="primary"
    indicator-color="primary"
  >
    <template v-for="colOption in colOptions">
      <q-tab
        style="justify-content: initial; text-align: left"
        :label="colOption.text"
        :icon="colOption.icon"
        :name="colOption.value"
      />
    </template>
  </q-tabs>
  <q-separator />
  <q-card-section class="q-px-none">
    <div class="scroll q-col-gutter-sm row items-start">
      <template v-for="(image, index) in filteredFiles">
        <div :class="colClass">
          <q-img
            fit="cover"
            :src="image.url"
            :alt="image.filename"
            ratio="1"
            @click="handleSelect(image)"
          >
            <div class="absolute-bottom text-center">
              <small>{{ image.filename }}</small>
            </div>
          </q-img>
        </div>
      </template>
      <template v-if="!filteredFiles.length">
        <q-item>該当なし</q-item>
      </template>
    </div>
  </q-card-section>
  <q-dialog v-model="dialog">
    <q-card bordered v-if="selected" style="max-width: 90vw; max-height: 85vh">
      <q-toolbar>
        <q-toolbar-title>{{ selected.filename }}</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-separator />
      <q-card-section
        class="scroll q-pa-none"
        style="line-height: 0; max-height: 75vh"
      >
        <img loading="lazy" :src="selected.url" :alt="selected.filename" />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-py-xs row q-col-gutter-sm">
        <template v-for="p in getProjectsByFile(selected)">
          <router-link
            :to="{ name: 'Project', params: { id: p.id } }"
            class="text-secondary"
          >
            {{ p.data.title }}
          </router-link>
        </template>
      </q-card-section>
      <q-card-section class="q-py-xs">
        <small>最終更新: <text-date-time v-model="selected.updatedAt" /></small>
      </q-card-section>
      <q-btn
        flat
        color="negative"
        icon="delete"
        label="削除"
        @click="handleDelete(selected)"
      />
      <q-btn
        flat
        color="secondary"
        icon="cloud_download"
        label="ダウンロード"
        @click="handleDownloadImage(selected)"
      />
      <slot :selected="selected" />
    </q-card>
  </q-dialog>
</template>
<script>
import { download } from "@/services/File";
import { mapActions, mapGetters } from "vuex";
import LastModified from "../Text/LastModified.vue";
import TextDateTime from "../Text/TextDateTime.vue";
import SvgGrid from "../Svg/SvgGrid.vue";
import { themeControl } from "@/mixins";
import { rect } from "../../services/Svg";
import { getFirebaseStorageErrorMessage } from "../../services/ErrorMessages";

export default {
  components: { LastModified, TextDateTime, SvgGrid },
  mixins: [themeControl],
  data() {
    return {
      selectedFiles: [],
      search: "",
      col: 4,
      selected: null,
    };
  },
  computed: {
    ...mapGetters(["files", "existsProjectByFile", "getProjectsByFile"]),
    dialog: {
      get() {
        return !!this.selected;
      },
      set(v) {
        if (!v) {
          this.selected = null;
        }
      },
    },
    colClass() {
      return `col-${this.col}`;
    },
    colOptions() {
      return [
        { value: 12, icon: rect(1, 1, 0, this.isDarkTheme) },
        { value: 6, icon: rect(2, 58, 12, this.isDarkTheme) },
        { value: 4, icon: rect(3, 36, 12, this.isDarkTheme) },
        { value: 3, icon: rect(4, 24, 12, this.isDarkTheme) },
        { value: 2, icon: rect(6, 16, 8, this.isDarkTheme) },
      ];
    },
    filteredFiles() {
      const key = this.search.toLowerCase();
      return this.search
        ? this.files.filter((f) => f.filename.toLowerCase().includes(key))
        : this.files;
    },
  },
  methods: {
    ...mapActions(["uploadFiles", "deleteFile"]),
    async handleUpload() {
      try {
        await this.uploadFiles(this.selectedFiles);

        this.selectedFiles = [];
        this.notifyPositive("画像をアップロードしました");
      } catch (e) {
        this.notifyNegative(getFirebaseStorageErrorMessage(e));
      }
    },
    handleSelect(image) {
      this.selected = image;
    },
    async handleDelete(image) {
      try {
        if (confirm("削除しますか？")) {
          await this.deleteFile(image.filename);
          this.selected = null;
          this.notifyPositive("画像を削除しました。");
        }
      } catch (e) {
        this.notifyNegative(getFirebaseStorageErrorMessage(e));
      }
    },
    handleDownloadImage(image) {
      download(image.url, image.filename);
    },
  },
};
</script>