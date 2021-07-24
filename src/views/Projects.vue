<template>
  <div v-if="projectLoaded">
    <title-main class="mb-3">プロジェクト管理</title-main>
    <layout-box>
      <q-btn color="primary" @click="handleCreate">新規作成</q-btn>
    </layout-box>
    <layout-box>
      <item-list
        itemLabel="プロジェクト"
        :items="projects"
        :trashedItems="trashedProjects"
        @itemClick="routeItem"
        @itemDelete="deleteProject"
        @itemRestore="restoreProject"
        @itemForceDelete="handleForceDelete"
        @import="handleImport"
      />
    </layout-box>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LayoutBox from "../components/LayoutBox.vue";
import TitleSub from "../components/Text/TitleSub.vue";
import TitleMain from "../components/Text/TitleMain.vue";
import ItemList from "@/components/ItemList.vue";
export default {
  components: {
    TitleMain,
    LayoutBox,
    TitleSub,
    ItemList,
  },
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
          dat: "",
          size: 64,
          imageUrls: [],
        });
      } catch (e) {
        alert("プロジェクト作成に失敗しました");
      }
    },
    async handleForceDelete(item) {
      try {
        confirm("削除しますか？") && (await this.forceDeleteProject(item));
      } catch (e) {
        alert("プロジェクト削除に失敗しました");
      }
    },
    routeItem(item) {
      return this.routeTo("Project", { id: item.id });
    },
    handleImport({ json, overwrite }) {
      json.map(async (item) => {
        try {
          if (overwrite && this.existsProject(item.id)) {
            await this.updateProject(item);
          } else {
            await this.createProject(item.data);
          }
        } catch (e) {
          alert("インポートに失敗しました");
        }
      });
    },
  },
};
</script>
