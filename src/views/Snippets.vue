<template>
  <div v-if="snippetLoaded">
    <title-main class="mb-3">テンプレート管理</title-main>
    <layout-box>
      <q-btn color="primary" outline @click="handleCreate">新規作成</q-btn>
    </layout-box>
    <layout-box>
      <item-list
        itemLabel="テンプレート"
        :items="snippets"
        :trashedItems="trashedSnippets"
        @itemClick="routeItem"
        @itemDelete="deleteSnippet"
        @itemRestore="restoreSnippet"
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
    async handleForceDelete(item) {
      try {
        confirm("削除しますか？") && (await this.forceDeleteSnippet(item));
      } catch (e) {
        alert("テンプレート削除に失敗しました");
      }
    },
    routeItem(item) {
      return this.routeTo("Snippet", { id: item.id });
    },
    handleImport({ json, overwrite }) {
      json.map(async (item) => {
        try {
          if (overwrite && this.existsSnippet(item.id)) {
            await this.updateSnippet(item);
          } else {
            await this.createSnippet(item.data);
          }
        } catch (e) {
          alert("インポートに失敗しました");
        }
      });
    },
  },
};
</script>
