<template>
  <div v-if="snippetLoaded">
    <title-main class="mb-3">テンプレート管理</title-main>
    <layout-box>
      <button class="btn btn-primary" @click="handleCreate">新規作成</button>
    </layout-box>
    <layout-box>
      <!-- tab list -->
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button
            class="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#snippets"
          >
            一覧
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#trashed"
          >
            ゴミ箱
          </button>
        </li>
      </ul>

      <!-- tab content -->
      <div class="tab-content">
        <div class="tab-pane fade show active p-3" id="snippets">
          <ul>
            <li v-for="p in snippets" class="mb-2">
              <div>
                <router-link :to="routeSnippet(p)">
                  <span>{{ p.data.title }}</span>
                </router-link>
                <a
                  href="#"
                  class="text-secondary mx-1"
                  @click.prevent="deleteSnippet(p)"
                  >ゴミ箱</a
                >
              </div>
              <small>
                <span>最終更新 {{ p.data.updatedAt }}</span>
              </small>
            </li>
          </ul>
        </div>
        <div class="tab-pane fade p-3" id="trashed">
          <ul>
            <li v-for="p in trashedSnippets">
              <div>
                <span>{{ p.data.title }}</span>
                <a
                  href="#"
                  class="text-secondary mx-1"
                  @click.prevent="restoreSnippet(p)"
                  >復元</a
                >
                <a
                  href="#"
                  class="text-danger mx-1"
                  @click.prevent="handleForceDelete(p)"
                  >削除</a
                >
              </div>
              <small>
                <span>削除日 {{ p.data.createdAt }}</span>
              </small>
            </li>
          </ul>
        </div>
      </div>
    </layout-box>
    <title-sub class="mb-3">エクスポート</title-sub>
    <layout-box>
      <p>テンプレートデータをjson形式で出力します。</p>
      <exporter :data="snippets" exportName="snippets" />
    </layout-box>
    <title-sub class="mb-3">インポート</title-sub>
    <layout-box>
      <p>json形式のテンプレートデータを取り込みます。</p>
      <importer @import="handleImport" />
    </layout-box>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LayoutBox from "../components/LayoutBox.vue";
import TitleSub from "../components/TitleSub.vue";
import TitleMain from "../components/TitleMain.vue";
import Exporter from "../components/IExporter/Exporter.vue";
import Importer from "../components/IExporter/Importer.vue";
export default {
  components: { TitleMain, LayoutBox, TitleSub, Exporter, Importer },
  name: "Snippets",
  computed: {
    ...mapGetters([
      "snippetLoaded",
      "snippets",
      "trashedSnippets",
      "existsSnippet",
    ]),
  },
  methods: {
    ...mapActions([
      "createSnippet",
      "updateSnippet",
      "deleteSnippet",
      "restoreSnippet",
      "forceDeleteSnippet",
    ]),
    randomTitle() {
      const arr = [
        "新しいテンプレート",
        "どちらかというと新しいテンプレート",
        "やや新しいテンプレート",
        "それなりに新しいテンプレート",
        "新しいテンプレート。古事記にもそう書かれている",
      ];
      return arr[Math.floor(Math.random() * arr.length)];
    },
    async handleCreate() {
      try {
        await this.createSnippet({
          title: this.randomTitle(),
          dat: "",
        });
      } catch (e) {
        alert("テンプレート作成に失敗しました");
      }
    },
    async handleForceDelete(p) {
      try {
        confirm("削除しますか？") && (await this.forceDeleteSnippet(p));
      } catch (e) {
        alert("テンプレート削除に失敗しました");
      }
    },
    routeSnippet(p) {
      return { name: "Snippet", params: { id: p.id } };
    },
    handleImport({ json, overwrite }) {
      json.map(async (p) => {
        try {
          if (overwrite && this.existsSnippet(p.id)) {
            await this.updateSnippet(p);
          } else {
            await this.createSnippet(p.data);
          }
        } catch (e) {
          alert("インポートに失敗しました");
        }
      });
    },
  },
};
</script>
