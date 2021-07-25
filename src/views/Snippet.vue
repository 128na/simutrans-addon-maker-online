<template>
  <div v-if="snippet">
    <title-main>{{ snippet.data.title }}</title-main>
    <q-form class="q-gutter-md">
      <q-input outlined v-model="snippet.data.title" label="テンプレート名" />
      <q-input
        outlined
        type="textarea"
        v-model="snippet.data.dat"
        rows="12"
        label="Dat"
      />
    </q-form>

    <global-footer>
      <q-btn color="secondary" @click="handleReset()" :disabled="!hasChanged">
        取消
      </q-btn>
      <q-btn color="primary" @click="handleUpdate" :disabled="!hasChanged">
        保存
      </q-btn>
      <q-space />

      <last-modified>
        <text-date-time :value="snippet.data.updatedAt" />
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
export default {
  components: {
    TitleMain,
    LayoutBox,
    LayoutLoading,
    LastModified,
    GlobalFooter,
    TextDateTime,
  },
  data() {
    return {
      snippet: null,
      original: null,
      fetching: false,
    };
  },
  watch: {
    snippetLoaded() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(["snippetLoaded", "getSnippet"]),
    hasChanged() {
      return JSON.stringify(this.snippet) !== JSON.stringify(this.original);
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
      this.snippet = JSON.parse(JSON.stringify(sni));
      this.original = JSON.parse(JSON.stringify(sni));
    },
    handleReset() {
      this.snippet = JSON.parse(JSON.stringify(this.original));
    },
    async handleUpdate() {
      try {
        this.updateSnippet(this.snippet);
        this.original = JSON.parse(JSON.stringify(this.snippet));
      } catch (e) {
        alert("テンプレートの更新に失敗しました");
      }
    },
  },
};
</script>
