<template>
  <div v-if="editing">
    <title-main>{{ editing.data.title }}</title-main>
    <q-form class="q-gutter-md">
      <q-input outlined v-model="editing.data.title" label="テンプレート名" />
      <q-input
        outlined
        type="textarea"
        v-model="editing.data.dat"
        rows="12"
        label="Dat"
      />
    </q-form>

    <global-footer>
      <q-btn
        color="secondary"
        label="取消"
        :disabled="!hasChanged"
        @click="handleReset()"
      />
      <q-btn
        color="primary"
        label="保存"
        :disabled="!hasChanged"
        @click="handleUpdate"
      />
      <q-space />

      <last-modified>
        <text-date-time :value="editing.data.updatedAt" />
      </last-modified>
    </global-footer>
  </div>
  <layout-loading v-else />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TitleMain from "../components/Text/TitleMain.vue";
import LayoutBox from "../components/LayoutBox.vue";
import LayoutLoading from "../components/LayoutLoading.vue";
import LastModified from "../components/Text/LastModified.vue";
import GlobalFooter from "../components/GlobalFooter.vue";
import TextDateTime from "../components/Text/TextDateTime.vue";
import { confirmBeforeLeave } from "@/mixins";
export default {
  components: {
    TitleMain,
    LayoutBox,
    LayoutLoading,
    LastModified,
    GlobalFooter,
    TextDateTime,
  },
  mixins: [confirmBeforeLeave],
  data() {
    return {
      editing: null,
      original: null,
      fetching: false,
    };
  },
  watch: {
    snippetLoaded() {
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
  computed: {
    ...mapGetters(["snippetLoaded", "getSnippet"]),
    hasChanged() {
      return JSON.stringify(this.editing) !== JSON.stringify(this.original);
    },
  },
  methods: {
    ...mapActions(["updateSnippet"]),
    init() {
      if (!this.snippetLoaded) {
        return;
      }
      const sni = this.getSnippet(this.$route.params.id);
      if (!sni) {
        return;
      }
      this.editing = JSON.parse(JSON.stringify(sni));
      this.original = JSON.parse(JSON.stringify(sni));
    },
    handleReset() {
      this.editing = JSON.parse(JSON.stringify(this.original));
    },
    async handleUpdate() {
      try {
        this.updateSnippet(this.editing);
        this.original = JSON.parse(JSON.stringify(this.editing));
      } catch (e) {
        alert("テンプレートの更新に失敗しました");
      }
    },
  },
};
</script>
