<template>
  <droppable-box @fileDropped="handleFileDropped">
    <template v-slot:default="props">
      <q-input
        borderless
        autogrow
        type="textarea"
        v-model="datText"
        rows="12"
        label="Dat"
      />
      <div>
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
        <!-- <snippet-selector @snippetSelected="handleSnippetSelected" /> -->
      </div>
    </template>
  </droppable-box>
</template>
<script>
import DroppableBox from "../../components/DroppableBox.vue";
import { asyncTextReader } from "../../services/File";
import ObjEditor from "./ObjEditor.vue";
import SnippetSelector from "./SnippetSelector/SnippetSelector.vue";
import { Simutrans } from "@/services/Simutrans";

export default {
  components: {
    DroppableBox,
    ObjEditor,
    SnippetSelector,
  },
  props: ["value", "project"],
  computed: {
    dat() {
      return new Simutrans.Dat(this.value);
    },
    datText: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("update:value", v);
      },
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
