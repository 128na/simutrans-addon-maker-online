<template>
  <div class="pt-1 sp-wide">
    <div class="row">
      <div class="col">
        <droppable-box @fileDropped="handleFileDropped">
          <template v-slot:default="props">
            <textarea
              id="dat"
              class="form-control"
              rows="10"
              :value="value"
              @input="$emit('update:value', $event.target.value)"
              @keyup="handleLine"
              @mouseup="handleLine"
            />
            <div class="text-secondary">
              <small v-show="props.dropping && !props.ctrl">
                ファイル内容を追加。
              </small>
              <small v-show="props.dropping && props.ctrl">
                ファイル内容で上書き。
              </small>
              <small v-show="!props.dropping">
                .datファイルをドロップで内容を追加、Ctrl+ドロップで上書き。
              </small>
            </div>
          </template>
        </droppable-box>
        <div>
          <snippet-selector @snippetSelected="handleSnippetSelected" />
        </div>
      </div>
      <!-- <div class="col">
        <line-editor
          v-if="line"
          :value="line"
          :project="project"
          @lineUpdate="handleLineUpdate"
        />
        <div v-else>選択行のdat設定と説明が表示されます。</div>
      </div> -->
    </div>
  </div>
</template>
<script>
import DroppableBox from "../../components/DroppableBox.vue";
import { asyncTextReader } from "../../services/File";
import LineEditor from "./LineEditor.vue";
import SnippetSelector from "./SnippetSelector/SnippetSelector.vue";
import { Simutrans } from "../../services/Simutrans";

export default {
  components: {
    DroppableBox,
    LineEditor,
    SnippetSelector,
  },
  props: ["value", "project"],
  data() {
    return {
      lineNo: 1,
    };
  },
  mounted() {
    const dat = new Simutrans.Dat(this.convertedValue);
    console.log(dat);
  },
  computed: {
    convertedValue() {
      return this.value
        .replaceAll("\r\n", "\n") // win CRLF -> LF
        .replaceAll("\r", "\n"); // mac CR -> LF
    },
    dat() {
      return new Simutrans.Dat(this.convertedValue);
    },
    obj() {
      return this.dat.getObj(this.lineNo);
    },
    line() {
      return this.dat.getLine(this.lineNo);
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
      this.lineNo = this.convertedValue
        .substr(0, e.target.selectionStart)
        .split("\n").length;
    },
    handleLineUpdate(line) {
      const lines = this.convertedValue.split("\n");
      lines.splice(this.lineNo - 1, 1, line);
      this.$emit("update:value", lines.join("\n"));
    },
    handleSnippetSelected(value) {
      value = `${this.value}\n${value}`;
      this.$emit("update:value", value);
    },
  },
};
</script>
<style>
@media (max-width: 767.98px) {
  .sp-wide {
    overflow-x: auto;
    margin-right: -0.75rem;
  }
  .sp-wide .row {
    width: 150vw;
  }
}
</style>