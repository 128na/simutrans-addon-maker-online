<template>
  <q-card-section class="q-px-md q-py-xs">
    <q-file
      borderless
      v-model="selectedFiles"
      multiple
      dense
      label="アップロード画像を選択"
      accept=".png"
      @update:model-value="handleUpload"
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
    class="text-grey"
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
  <q-card-section>
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
        <q-item>該当なし </q-item>
      </template>
    </div>
  </q-card-section>
  <dialog-full v-model="dialog">
    <template v-slot:header>{{ selected.filename }}</template>
    <template v-slot:default>
      <q-card-section class="row justify-center">
        <img loading="lazy" :src="selected.url" :alt="selected.filename" />
      </q-card-section>
    </template>
    <template v-slot:footer>
      <q-card-section class="q-py-none">
        <template v-for="p in getProjectsByFile(selected)">
          <router-link
            :to="{ name: 'Project', params: { id: p.id } }"
            class="text-secondary"
          >
            {{ p.data.title }}
          </router-link>
        </template>
      </q-card-section>
      <q-card-section class="q-py-none">
        <small>最終更新: <text-date-time v-model="selected.updatedAt" /></small>
      </q-card-section>
      <q-toolbar class="q-gutter-x-sm">
        <q-btn
          dense
          color="negative"
          icon="delete"
          label="削除"
          @click="handleDelete(selected)"
        />
        <q-btn
          dense
          color="secondary"
          icon="cloud_download"
          label="DL"
          @click="handleDownloadImage(selected)"
        />
        <slot :selected="selected" :handleClose="handleSelect" />
      </q-toolbar>
    </template>
    <template v-slot:extra>
      <q-drawer
        side="left"
        class="row"
        :width="36"
        :breakpoint="0"
        :model-value="true"
      >
        <q-btn
          flat
          dense
          color="primary"
          icon="mdi-chevron-left"
          class="col"
          :disable="!prevItem"
          @click="selected = prevItem"
        />
      </q-drawer>
      <q-drawer
        side="right"
        class="row"
        :width="36"
        :breakpoint="0"
        :model-value="true"
      >
        <q-btn
          flat
          dense
          color="primary"
          icon="mdi-chevron-right"
          class="col"
          :disable="!nextItem"
          @click="selected = nextItem"
        />
      </q-drawer>
    </template>
  </dialog-full>
</template>
<script>
import LastModified from "../Text/LastModified.vue";
import SvgGrid from "../Svg/SvgGrid.vue";
import TextDateTime from "../Text/TextDateTime.vue";
import { download } from "@/services/File";
import { getFirebaseStorageErrorMessage } from "@/services/ErrorMessages";
import { mapActions, mapGetters } from "vuex";
import { themeControl } from "@/mixins";
import DialogFull from "../DialogFull.vue";

export default {
  components: { LastModified, TextDateTime, SvgGrid, DialogFull },
  mixins: [themeControl],
  data() {
    return {
      selectedFiles: [],
      search: "",
      col: 4,
      selected: null,
    };
  },
  watch: {
    col(v) {
      localStorage.setItem("ImageManager.col", v);
    },
  },
  created() {
    this.col = Number(localStorage.getItem("ImageManager.col")) || 4;
  },
  computed: {
    ...mapGetters([
      "files",
      "existsProjectByFile",
      "getProjectsByFile",
      "existsFile",
    ]),
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
        { value: 12, icon: "svguse:/img/rect.svg#1x1" },
        { value: 6, icon: "svguse:/img/rect.svg#2x2" },
        { value: 4, icon: "svguse:/img/rect.svg#3x3" },
        { value: 3, icon: "svguse:/img/rect.svg#4x4" },
        { value: 2, icon: "svguse:/img/rect.svg#6x6" },
      ];
    },
    filteredFiles() {
      const key = this.search.toLowerCase();
      return this.search
        ? this.files.filter((f) => f.filename.toLowerCase().includes(key))
        : this.files;
    },
    selectedIndex() {
      return this.filteredFiles.findIndex(
        (f) => f.filename === this.selected.filename
      );
    },
    nextItem() {
      return this.filteredFiles[this.selectedIndex + 1] || null;
    },
    prevItem() {
      return this.filteredFiles[this.selectedIndex - 1] || null;
    },
    existsFiles() {
      return this.selectedFiles.some((f) => this.existsFile(f.name));
    },
  },
  methods: {
    ...mapActions(["uploadFiles", "deleteFile"]),
    async handleUpload() {
      try {
        if (
          this.existsFiles &&
          !confirm(
            "既にアップロード済みのファイルが含まれています。上書きしますか？"
          )
        ) {
          this.selectedFiles = [];
          return;
        }
        await this.uploadFiles(this.selectedFiles);

        this.selectedFiles = [];
        this.notifyPositive("画像をアップロードしました");
      } catch (e) {
        this.notifyNegative(getFirebaseStorageErrorMessage(e));
      }
    },
    handleSelect(image = null) {
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
