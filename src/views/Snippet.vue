<template>
  <div v-if="snippet">
    <title-main>{{ snippet.data.title }}</title-main>
    <layout-box>
      <label for="title" class="form-label">テンプレート名</label>
      <input
        type="text"
        id="title"
        class="form-control"
        v-model="snippet.data.title"
      />
    </layout-box>
    <layout-box>
      <label for="dat" class="form-label">Dat</label>
      <div class="input-group">
        <textarea class="form-control" rows="12" v-model="snippet.data.dat" />
      </div>
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
