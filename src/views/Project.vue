<template>
  <div v-if="editing">
    <h3 class="q-mb-lg">{{ editing.data.title }}</h3>
    <q-form class="q-gutter-md">
      <q-input
        dense
        outlined
        v-model="editing.data.title"
        label="プロジェクト名"
      />
      <q-input
        outlined
        dense
        v-model="editing.data.filename"
        label="アドオン名"
        hint="出力されるpakファイル名"
      />
      <q-input
        outlined
        dense
        type="number"
        min="16"
        max="65535"
        v-model="editing.data.size"
        label="Pakサイズ"
      />
      <q-select
        outlined
        dense
        emit-value
        :options="paksets"
        v-model="editing.data.pak"
        label="Pakセット"
        hint="産業や貨車の貨物種類指定といった特定のpakセットのみで使用可能なアドオンの場合のみ選択してください"
      />

      <dat-editor :project="editing" />

      <image-editor :project="editing" />
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
        <text-date-time v-model="editing.data.updatedAt" />
      </last-modified>
    </global-footer>
  </div>
  <layout-loading v-else />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { download } from "@/services/File";
import { postPak } from "@/services/ApiMakeobj";
import LayoutLoading from "@/components/LayoutLoading.vue";
import DatEditor from "@/components/DatEditor/DatEditor.vue";
import LastModified from "@/components/Text/LastModified.vue";
import GlobalFooter from "@/components/GlobalFooter.vue";
import TextDateTime from "@/components/Text/TextDateTime.vue";
import ImageEditor from "@/components/ImageManager/ImageEditor.vue";
import { confirmBeforeLeave } from "@/mixins";
import {
  getFirestoreErrorMessage,
  getPakErrorMessage,
} from "@/services/ErrorMessages";
import { PAKSETS } from "@/constants";
import { clone, equals } from "@/services/Object";
export default {
  components: {
    LayoutLoading,
    DatEditor,
    LastModified,
    GlobalFooter,
    TextDateTime,
    ImageEditor,
  },
  mixins: [confirmBeforeLeave],
  name: "Project",
  data() {
    return {
      editing: null,
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
      return !equals(this.editing, this.original);
    },
    paksets() {
      return [
        { value: null, label: "指定なし" },
        ...PAKSETS.filter((p) => p.size == this.editing.data.size),
      ];
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
      this.editing = clone(prj);
      this.original = clone(prj);
    },
    handleReset() {
      this.editing = clone(this.original);
    },
    async handleUpdate() {
      try {
        this.updateProject(this.editing);
        this.original = clone(this.editing);
        this.notifyPositive("更新しました。");
      } catch (e) {
        this.notifyNegative(getFirestoreErrorMessage(e));
      }
    },
    async handlePak() {
      this.fetching = true;
      try {
        const url = await postPak({
          filename: this.editing.data.filename,
          size: this.editing.data.size,
          dat: this.editing.data.dat,
          imageUrls: this.editing.data.imageUrls,
        });
        download(url, `${this.editing.data.filename}.pak`);
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
