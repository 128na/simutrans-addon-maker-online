<template>
  <div v-if="project">
    <title-main>{{ project.data.title }}</title-main>
    <q-form class="q-gutter-md">
      <q-input outlined v-model="project.data.title" label="プロジェクト名" />
      <q-input
        outlined
        v-model="project.data.filename"
        label="アドオン名"
        hint="出力されるpakファイル名"
      />
      <q-input
        outlined
        type="number"
        min="16"
        max="65535"
        v-model="project.data.size"
        label="Pakサイズ"
      />

      <dat-editor v-model="project.data.dat" :project="project" />

      <layout-box>
        <image-editor
          v-model:value="project.data.imageUrls"
          :project="project"
        />
      </layout-box>
    </q-form>

    <global-footer>
      <q-btn color="secondary" @click="handleReset()" :disabled="!hasChanged">
        取消
      </q-btn>
      <q-btn color="primary" @click="handleUpdate" :disabled="!hasChanged">
        保存
      </q-btn>
      <q-btn :loading="fetching" color="primary" @click="handlePak">
        Pak化
      </q-btn>
      <q-space />

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
