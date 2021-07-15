<template>
  <a href="#" data-bs-toggle="modal" data-bs-target="#snippet-selector">
    テンプレートを挿入
  </a>

  <div class="modal fade" id="snippet-selector" tabindex="-1" ref="modal">
    <div
      class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-lg-down"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">テンプレート一覧</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" />
        </div>
        <div class="modal-body p-0">
          <snippet-list :items="selected" @select="handleSelect" />
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary"
            :disabled="!selected"
            @click="handleInsert"
          >
            {{ buttonMessage }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SnippetList from "./SnippetList.vue";
export default {
  components: { SnippetList },
  emits: ["snippetSelected"],
  data() {
    return {
      selected: null,
    };
  },
  methods: {
    handleInsert() {
      const instance = bootstrap.Modal.getInstance(this.$refs["modal"]);
      if (instance) {
        instance.hide();
      }

      this.$emit("snippetSelected", this.selected.dat);
    },
    handleSelect(snippet) {
      this.selected = snippet;
    },
  },
  computed: {
    buttonMessage() {
      return this.selected
        ? `${this.selected.title} を挿入`
        : "テンプレートを選択してください";
    },
  },
};
</script>