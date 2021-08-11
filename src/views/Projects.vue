<template>
  <div v-if="projectLoaded">
    <title-main class="q-mb-md">プロジェクト管理</title-main>
    <layout-box>
      <q-btn
        color="primary"
        outline
        label="新規作成"
        icon="add"
        @click="handleCreate"
      />
    </layout-box>
    <layout-box>
      <item-list
        itemLabel="プロジェクト"
        :items="projects"
        :trashedItems="trashedProjects"
        @itemClick="routeItem"
        @import="handleImport"
      >
        <template v-slot:itemAction="props">
          <q-btn
            flat
            size="sm"
            color="secondary"
            icon="mdi-content-copy"
            @click.stop="handleToConvert(props.item)"
          >
            テンプレ作成
          </q-btn>
          <q-btn
            flat
            size="sm"
            color="secondary"
            icon="mdi-content-copy"
            @click.stop="handleCopy(props.item)"
          >
            複製
          </q-btn>
          <q-btn
            flat
            size="sm"
            color="secondary"
            icon="delete"
            @click.stop="deleteProject(props.item)"
          >
            ゴミ箱へ
          </q-btn>
        </template>
        <template v-slot:trashedItemAction="props">
          <q-btn
            flat
            size="sm"
            color="secondary"
            icon="restore_from_trash"
            @click.stop="restoreProject(props.item)"
          >
            復元
          </q-btn>
          <q-btn
            flat
            size="sm"
            color="negative"
            icon="delete_forever"
            @click.stop="handleForceDelete(props.item)"
          >
            削除
          </q-btn>
        </template>
      </item-list>
    </layout-box>
  </div>
</template>

<script>
import ItemList from "@/components/ItemList.vue";
import LayoutBox from "@/components/LayoutBox.vue";
import TitleMain from "@/components/Text/TitleMain.vue";
import TitleSub from "@/components/Text/TitleSub.vue";
import { getFirestoreErrorMessage } from "@/services/ErrorMessages";
import { mapActions, mapGetters } from "vuex";
import {
  randomConvertTitle,
  randomCopyTitle,
  randomNewTitle,
} from "@/services/Text";

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
      "createSnippet",
    ]),
    async handleCreate() {
      try {
        await this.createProject({
          title: randomNewTitle("プロジェクト"),
          filename: "example",
          dat: "",
          size: 64,
          pak: null,
          imageUrls: [],
        });
      } catch (e) {
        this.notifyNegative(getFirestoreErrorMessage(e));
      }
    },
    async handleToConvert(item) {
      try {
        await this.createSnippet(
          Object.assign({}, item.data, {
            title: randomConvertTitle(item.data.title, "テンプレート"),
            dat: item.data.dat,
          })
        );
        this.notifyPositive("テンプレートを作成しました。");
        this.routeTo("Snippets");
      } catch (e) {
        this.notifyNegative(getFirestoreErrorMessage(e));
      }
    },
    async handleCopy(item) {
      try {
        await this.createProject(
          Object.assign({}, item.data, {
            title: randomCopyTitle(item.data.title),
          })
        );
        this.notifyPositive("コピーしました。");
      } catch (e) {
        this.notifyNegative(getFirestoreErrorMessage(e));
      }
    },
    async handleForceDelete(item) {
      try {
        if (confirm("削除しますか？")) {
          await this.forceDeleteProject(item);
          this.notifyPositive("削除しました。");
        }
      } catch (e) {
        this.notifyNegative(getFirestoreErrorMessage(e));
      }
    },
    routeItem(item) {
      return this.routeTo("Project", { id: item.id });
    },
    handleImport({ json, overwrite }) {
      try {
        json.map(async (item) => {
          if (overwrite && this.existsProject(item.id)) {
            await this.updateProject(item);
          } else {
            await this.createProject(item.data);
          }
        });
      } catch (e) {
        this.notifyNegative("インポートに失敗しました");
      }
    },
  },
};
</script>
