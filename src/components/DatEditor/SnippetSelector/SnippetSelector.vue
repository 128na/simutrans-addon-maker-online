<template>
  <q-btn
    color="secondary"
    flat
    icon="add"
    label="テンプレートを挿入"
    @click.prevent="dialog = true"
  />
  <q-dialog v-model="dialog">
    <q-card>
      <q-toolbar>
        <q-toolbar-title>テンプレート一覧</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-separator />
      <snippet-list v-slot="slotProps">
        <q-separator />
        <q-toolbar>
          <q-space />
          <q-btn
            color="primary"
            :disabled="!slotProps.selected"
            icon="add"
            @click="handleInsert(slotProps.selected)"
          >
            {{ buttonMessage(slotProps.selected) }}
          </q-btn>
        </q-toolbar>
      </snippet-list>
    </q-card>
  </q-dialog>
</template>
<script>
import SnippetList from "./SnippetList.vue";
export default {
  components: { SnippetList },
  emits: ["snippetSelected"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    handleInsert(snippet) {
      this.$emit("snippetSelected", snippet.dat);
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