<template>
  <droppable-box @fileDropped="handleFileDropped">
    <template v-slot:default="props">
      <textarea
        class="form-control"
        rows="12"
        :value="value"
        @input.prevent="$emit('update:value', $event.target.value)"
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
      <div>
        <snippet-selector @snippetSelected="handleSnippetSelected" />
      </div>
    </template>
  </droppable-box>
</template>
<script>
import DroppableBox from "../../components/DroppableBox.vue";
import { asyncTextReader } from "../../services/File";
import ObjEditor from "./ObjEditor.vue";
import SnippetSelector from "./SnippetSelector/SnippetSelector.vue";
import { Simutrans } from "../../services/Simutrans";

export default {
  components: {
    DroppableBox,
    ObjEditor,
    SnippetSelector,
  },
  props: ["value", "project"],
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
    handleSnippetSelected(value) {
      this.$emit("update:value", `${this.value}\n${value}`);
    },
  },
};
</script>
