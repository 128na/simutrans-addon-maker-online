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

      <dat-editor :project="project" />

      <image-editor :project="project" />
    </q-form>

    <global-footer>
      <q-btn
        label="取消"
        color="secondary"
        :disabled="!hasChanged"
        @click="handleReset"
      />
      <q-btn
        label="保存"
        color="primary"
        :disabled="!hasChanged"
        @click="handleUpdate"
      />
      <q-btn
        label="Pak化"
        color="primary"
        no-caps
        :loading="fetching"
        @click="handlePak"
      />
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
import { dataURL2File, download } from "@/services/File";
import { postPak } from "@/services/ApiMakeobj";
import TitleMain from "@/components/Text/TitleMain.vue";
import LayoutBox from "@/components/LayoutBox.vue";
import LayoutLoading from "@/components/LayoutLoading.vue";
import DatEditor from "@/components/DatEditor/DatEditor.vue";
import LastModified from "@/components/Text/LastModified.vue";
import GlobalFooter from "@/components/GlobalFooter.vue";
import ButtonLoading from "@/components/Buttons/ButtonLoading.vue";
import TextDateTime from "@/components/Text/TextDateTime.vue";
import ImageEditor from "@/components/ImageManager/ImageEditor.vue";
import { confirmBeforeLeave } from "@/mixins";
import { getFirestoreErrorMessage } from "@/services/ErrorMessages";
import { getPakErrorMessage } from "../services/ErrorMessages";
export default {
  components: {
    TitleMain,
    LayoutBox,
    LayoutLoading,
    DatEditor,
    LastModified,
    GlobalFooter,
    ButtonLoading,
    TextDateTime,
    ImageEditor,
    ImageEditor,
  },
  mixins: [confirmBeforeLeave],
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
    hasChanged() {
      if (this.hasChanged) {
        this.setLeaveDialog();
      } else {
        this.clearLeaveDialog();
      }
    },
  },
  created() {
    this.init();
  },
  beforeRouteLeave(to, from, next) {
    next(this.handleBeforeLeave());
  },
  beforeRouteUpdate(to, from, next) {
    if (this.handleBeforeLeave()) {
      this.init(to);
      next();
    } else {
      next(false);
    }
  },
  computed: {
    ...mapGetters(["projectLoaded", "getProject"]),
    hasChanged() {
      return JSON.stringify(this.project) !== JSON.stringify(this.original);
    },
  },
  methods: {
    ...mapActions(["updateProject"]),
    init(route = this.$route) {
      if (!this.projectLoaded) {
        return;
      }
      const prj = this.getProject(route.params.id);
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
        this.notifyPositive("更新しました。");
      } catch (e) {
        this.notifyNegative(getFirestoreErrorMessage(e));
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
        this.notifyPositive("Pak化しました。");
      } catch (e) {
        this.notifyNegative(getPakErrorMessage(e));
      } finally {
        this.fetching = false;
      }
    },
  },
};
</script>
