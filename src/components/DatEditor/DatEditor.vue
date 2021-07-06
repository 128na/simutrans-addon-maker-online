<template>
  <droppable-box @fileDropped="handleFileDropped">
    <template v-slot:default="props">
      <div class="row">
        <div class="col-sm">
          <textarea
            id="dat"
            class="form-control"
            rows="12"
            :value="value"
            @input="$emit('update:value', $event.target.value)"
            @keyup="handleLine"
            @mouseup="handleLine"
          />
          <common-box class="text-secondary">
            <small v-show="props.dropping && !props.ctrl"
              >ファイル内容を追加。</small
            >
            <small v-show="props.dropping && props.ctrl"
              >ファイル内容で上書き。</small
            >
            <small v-show="!props.dropping">
              .datファイルをドロップで内容を追加、Ctrl+ドロップで上書き。
            </small>
          </common-box>
        </div>
        <div class="col-sm">
          <line-editor :value="line" :project="project" />
        </div>
      </div>
    </template>
  </droppable-box>
</template>
<script>
import CommonBox from "../../components/CommonBox.vue";
import DroppableBox from "../../components/DroppableBox.vue";
import { asyncTextReader } from "../../services/File";
import LineEditor from "./LineEditor.vue";

export default {
  components: {
    DroppableBox,
    CommonBox,
    LineEditor,
  },
  props: ["value", "project"],
  data() {
    return {
      lineNo: 1,
    };
  },
  computed: {
    line() {
      return this.value.split("\n")[this.lineNo - 1].trim();
    },
  },
  methods: {
    async handleFileDropped({ files, ctrl }) {
      const result = await asyncTextReader(
        files.filter((f) => f.name.endsWith(".dat"))
      );
      const value = result.reduce(
        (current, f) => `${current}\n# import from ${f.file.name}\n${f.result}`,
        ctrl ? "" : this.value
      );
      this.$emit("update:value", value);
    },
    handleLine(e) {
      this.lineNo = this.value
        .substr(0, e.target.selectionStart)
        .split("\n").length;
    },
  },
};
</script>