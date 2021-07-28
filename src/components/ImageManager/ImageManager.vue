<template>
  <q-card-section class="q-px-md q-py-xs">
    <q-input v-model.trim="search" borderless dense label="絞り込み" />
  </q-card-section>
  <q-separator />
  <template v-if="filteredFiles.length">
    <q-tabs
      v-model="tab"
      no-caps
      inline-label
      align="left"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
    >
      <template v-for="(image, index) in filteredFiles">
        <q-tab
          style="justify-content: initial; text-align: left"
          :name="index"
          :label="image.filename"
        />
      </template>
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model.number="tab" animated swipeable>
      <template v-for="(image, index) in filteredFiles">
        <q-tab-panel
          :name="index"
          class="q-pa-none scroll"
          style="max-height: 60vh"
        >
          <q-item>
            <q-item-section>
              <q-item-label>
                {{ image.filename }}
              </q-item-label>
              <q-item-label caption>
                <div class="q-mb-xs">
                  利用プロジェクト:
                  <template
                    v-if="existsProjectByFile(image)"
                    v-for="project in getProjectsByFile(image)"
                  >
                    <a
                      class="text-secondary cursor-pointer q-mr-sm"
                      :to="{ name: 'Project', params: { id: project.id } }"
                    >
                      {{ project.data.title }}
                    </a>
                  </template>
                  <template v-else>なし</template>
                </div>
                <div>
                  最終更新: <text-date-time :value="image.updatedAt" />
                  <a
                    class="text-secondary cursor-pointer"
                    @click="handleDownloadImage(image)"
                  >
                    ダウンロード
                  </a>
                  <a
                    class="text-negative cursor-pointer"
                    @click="handleDelete(image)"
                  >
                    削除
                  </a>
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item class="q-pa-none">
            <img :src="image.url" />
          </q-item>
        </q-tab-panel>
      </template>
    </q-tab-panels>
  </template>
  <template v-else>
    <q-item>該当なし</q-item>
  </template>
  <q-separator />
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
  <slot :shownFile="shownFile" />
</template>
<script>
import { download } from "@/services/File";
import { mapActions, mapGetters } from "vuex";
import LastModified from "../Text/LastModified.vue";
import TextDateTime from "../Text/TextDateTime.vue";
import SvgGrid from "../Svg/SvgGrid.vue";
export default {
  components: { LastModified, TextDateTime, SvgGrid },
  data() {
    return {
      tab: 0,
      selectedFiles: [],
      search: "",
    };
  },
  watch: {
    filteredFiles() {
      this.tab = Math.max(0, Math.min(this.tab, this.filteredFiles.length - 1));
    },
  },
  computed: {
    ...mapGetters(["files", "existsProjectByFile", "getProjectsByFile"]),
    filteredFiles() {
      const key = this.search.toLowerCase();
      return this.search
        ? this.files.filter((f) => f.filename.toLowerCase().includes(key))
        : this.files;
    },
    shownFile() {
      return this.filteredFiles[this.tab];
    },
  },
  methods: {
    ...mapActions(["uploadFiles", "deleteFile"]),
    async handleUpload() {
      try {
        await this.uploadFiles(this.selectedFiles);

        this.selectedFiles = [];
      } catch (e) {
        console.error(e);
        alert("アップロードに失敗しました");
      }
    },
    async handleDelete(image) {
      if (confirm("削除しますか？")) {
        await this.deleteFile(image.filename);
      }
    },
    handleDownloadImage(image) {
      download(image.url, image.filename);
    },
  },
};
</script>