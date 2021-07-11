<template>
  <div v-if="projectLoaded">
    <title-main class="mb-3">プロジェクト管理</title-main>
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
            data-bs-target="#projects"
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
        <div class="tab-pane fade show active p-3" id="projects">
          <ul>
            <li v-for="p in projects" class="mb-2">
              <div>
                <router-link :to="routeProject(p)">
                  <span>{{ p.data.title }}</span>
                </router-link>
                <a
                  href="#"
                  class="text-secondary mx-1"
                  @click.prevent="deleteProject(p)"
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
            <li v-for="p in trashedProjects">
              <div>
                <span>{{ p.data.title }}</span>
                <a
                  href="#"
                  class="text-secondary mx-1"
                  @click.prevent="restoreProject(p)"
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
      <p>プロジェクトデータをjson形式で出力します。</p>
      <exporter :data="projects" exportName="project" />
    </layout-box>
    <title-sub class="mb-3">インポート</title-sub>
    <layout-box>
      <p>json形式のプロジェクトデータを取り込みます。</p>
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
  name: "Projects",
  computed: {
    ...mapGetters([
      "projectLoaded",
      "projects",
      "trashedProjects",
      "existsProject",
    ]),
  },
  methods: {
    ...mapActions([
      "createProject",
      "updateProject",
      "deleteProject",
      "restoreProject",
      "forceDeleteProject",
    ]),
    randomTitle() {
      const arr = [
        "新しいプロジェクト",
        "どちらかというと新しいプロジェクト",
        "やや新しいプロジェクト",
        "それなりに新しいプロジェクト",
        "新しいプロジェクト。古事記にもそう書かれている",
      ];
      return arr[Math.floor(Math.random() * arr.length)];
    },
    async handleCreate() {
      try {
        await this.createProject({
          title: this.randomTitle(),
          filename: "example",
          isPublic: false,
          dat: "",
          images: {},
          size: 64,
        });
      } catch (e) {
        alert("プロジェクト作成に失敗しました");
      }
    },
    async handleForceDelete(p) {
      try {
        confirm("削除しますか？") && (await this.forceDeleteProject(p));
      } catch (e) {
        alert("プロジェクト削除に失敗しました");
      }
    },
    routeProject(p) {
      return { name: "Project", params: { id: p.id } };
    },
    handleImport({ json, overwrite }) {
      json.map(async (p) => {
        try {
          if (overwrite && this.existsProject(p.id)) {
            await this.updateProject(p);
          } else {
            await this.createProject(p.data);
          }
        } catch (e) {
          alert("インポートに失敗しました");
        }
      });
    },
  },
};
</script>
