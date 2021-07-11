<template>
  <div v-if="snippet">
    <title-main>{{ snippet.data.name }}</title-main>
    <layout-box>
      <label for="name" class="form-label">テンプレート名</label>
      <input
        type="text"
        id="name"
        class="form-control"
        v-model="snippet.data.name"
      />
    </layout-box>
    <layout-box>
      <label for="dat" class="form-label">Dat</label>
      <div class="input-group">
        <textarea class="form-control" rows="12" v-model="snippet.data.dat" />
      </div>
    </layout-box>
    <div class="p-4" />
    <nav class="navbar fixed-bottom navbar-dark bg-dark">
      <div class="container-fluid">
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

        <small class="ms-auto text-white text-secondary text-end">
          saved at<br />
          {{ snippet.data.updatedAt }}
        </small>
      </div>
    </nav>
  </div>
  <layout-loading v-else />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TitleMain from "../components/TitleMain.vue";
import LayoutBox from "../components/LayoutBox.vue";
import LayoutLoading from "../components/LayoutLoading.vue";
export default {
  components: {
    TitleMain,
    LayoutBox,
    LayoutLoading,
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
