<template>
  <div v-if="snippetLoaded">
    <title-main class="q-mb-md">テンプレート管理</title-main>
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
        itemLabel="テンプレート"
        :items="snippets"
        :trashedItems="trashedSnippets"
        @itemClick="routeItem"
        @import="handleImport"
      >
        <template v-slot:itemAction="props">
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
            @click.stop="deleteSnippet(props.item)"
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
            @click.stop="restoreSnippet(props.item)"
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
import { mapActions, mapGetters } from "vuex";
import LayoutBox from "@/components/LayoutBox.vue";
import TitleSub from "@/components/Text/TitleSub.vue";
import TitleMain from "@/components/Text/TitleMain.vue";
import ItemList from "@/components/ItemList.vue";
import { getFirestoreErrorMessage } from "@/services/ErrorMessages";
import { randomCopyTitle, randomNewTitle } from "../services/Text";
export default {
  components: {
    TitleMain,
    LayoutBox,
    TitleSub,
    ItemList,
  },
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
    async handleCreate() {
      try {
        await this.createSnippet({
          title: randomNewTitle("テンプレート"),
          dat: "",
        });
      } catch (e) {
        this.notifyNegative(getFirestoreErrorMessage(e));
      }
    },
    async handleCopy(item) {
      try {
        await this.createSnippet(
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
          await this.forceDeleteSnippet(item);
          this.notifyPositive("削除しました。");
        }
      } catch (e) {
        this.notifyNegative(getFirestoreErrorMessage(e));
      }
    },
    routeItem(item) {
      return this.routeTo("Snippet", { id: item.id });
    },
    handleImport({ json, overwrite }) {
      try {
        json.map(async (item) => {
          if (overwrite && this.existsSnippet(item.id)) {
            await this.updateSnippet(item);
          } else {
            await this.createSnippet(item.data);
          }
        });
      } catch (e) {
        this.notifyNegative("インポートに失敗しました");
      }
    },
  },
};
</script>
