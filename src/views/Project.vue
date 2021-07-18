<template>
  <div v-if="project">
    <title-main>{{ project.data.title }}</title-main>
    <layout-box>
      <label for="title" class="form-label">プロジェクト名</label>
      <input
        type="text"
        id="title"
        class="form-control"
        v-model="project.data.title"
      />
    </layout-box>
    <layout-box>
      <label for="filename" class="form-label">アドオン名</label>
      <div class="input-group">
        <input
          type="text"
          id="filename"
          class="form-control"
          v-model="project.data.filename"
        />
        <span class="input-group-text">.pak</span>
      </div>
    </layout-box>
    <layout-box>
      <label for="size" class="form-label">Pakサイズ</label>
      <input
        type="number"
        id="size"
        class="form-control"
        min="16"
        max="65535"
        v-model="project.data.size"
      />
    </layout-box>
    <layout-box>
      <label for="dat" class="form-label">Datデータ</label>
      <dat-editor v-model:value="project.data.dat" :project="project" />
    </layout-box>
    <layout-box>
      <label for="images" class="form-label">画像データ</label>
      <image-editor v-model:value="project.data.imageUrls" :project="project" />
    </layout-box>
    <global-footer>
      <button
        class="btn btn-secondary me-2"
        @click="handleReset()"
        :disabled="!hasChanged"
      >
        取消
      </button>
      <button
        class="btn btn-primary me-2"
        @click="handleUpdate"
        :disabled="!hasChanged"
      >
        保存
      </button>
      <button-loading
        :loading="fetching"
        class="btn btn-primary me-2"
        @click="handlePak"
      >
        Pak化
      </button-loading>

      <last-modified>
        <text-date-time :value="project.data.updatedAt" />
      </last-modified>
    </global-footer>
  </div>
  <layout-loading v-else />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { dataURL2File, download } from "../services/File";
import { postPak } from "../services/ApiMakeobj";
import ImageEditor from "../components/ImageEditor/ImageEditor.vue";
import TitleMain from "../components/Text/TitleMain.vue";
import LayoutBox from "../components/LayoutBox.vue";
import LayoutLoading from "../components/LayoutLoading.vue";
import DatEditor from "../components/DatEditor/DatEditor.vue";
import LastModified from "../components/Text/LastModified.vue";
import GlobalFooter from "../components/GlobalFooter.vue";
import ButtonLoading from "../components/Buttons/ButtonLoading.vue";
import TextDateTime from "../components/Text/TextDateTime.vue";
export default {
  components: {
    ImageEditor,
    TitleMain,
    LayoutBox,
    LayoutLoading,
    DatEditor,
    LastModified,
    GlobalFooter,
    ButtonLoading,
    TextDateTime,
  },
  name: "Project",
  data() {
    return {
      project: null,
      original: null,
      fetching: false,
    };
  },
  watch: {
    projectLoaded() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(["projectLoaded", "getProject"]),
    hasChanged() {
      return JSON.stringify(this.project) !== JSON.stringify(this.original);
    },
  },
  methods: {
    ...mapActions(["updateProject"]),
    init() {
      if (!this.projectLoaded) {
        return;
      }
      const prj = this.getProject(this.$route.params.id);
      if (!prj) {
        return;
      }
      this.project = JSON.parse(JSON.stringify(prj));
      this.original = JSON.parse(JSON.stringify(prj));
    },
    handleReset() {
      this.project = JSON.parse(JSON.stringify(this.original));
    },
    async handleUpdate() {
      try {
        this.updateProject(this.project);
        this.original = JSON.parse(JSON.stringify(this.project));
      } catch (e) {
        alert("プロジェクトの更新に失敗しました");
      }
    },
    async handlePak() {
      this.fetching = true;
      try {
        const url = await postPak({
          filename: this.project.data.filename,
          size: this.project.data.size,
          dat: this.project.data.dat,
          imageUrls: this.project.data.imageUrls,
        });
        download(url, `${this.project.data.filename}.pak`);
      } catch (e) {
        alert(e.message);
      } finally {
        this.fetching = false;
      }
    },
  },
};
</script>
