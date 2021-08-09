<template>
  <q-btn
    color="secondary"
    flat
    icon="add"
    label="テンプレートを挿入"
    @click.prevent="dialog = true"
  />
  <full-dialog v-model="dialog">
    <template v-slot:header>
      <q-toolbar>
        <q-toolbar-title>テンプレート一覧</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
    </template>
    <template v-slot:default>
      <snippet-list v-model="selected" />
    </template>
    <template v-slot:footer>
      <q-toolbar>
        <q-btn
          color="primary"
          icon="add"
          label="このテンプレートを挿入"
          :disable="!selected"
          @click="handleInsert"
        />
      </q-toolbar>
    </template>
  </full-dialog>
</template>
<script>
import FullDialog from "@/components/FullDialog.vue";
import SnippetList from "./SnippetList.vue";

export default {
  components: { SnippetList, FullDialog },
  emits: ["snippetSelected"],
  data() {
    return {
      dialog: false,
      selected: null,
    };
  },
  methods: {
    handleInsert() {
      this.$emit("snippetSelected", this.selected.dat);
      this.selected = null;
      this.dialog = false;
    },
    buttonMessage(snippet) {
      return snippet
        ? `${snippet.title} を挿入`
        : "テンプレートを選択してください";
    },
  },
};
</script>