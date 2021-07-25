<template>
  <droppable-box @fileDropped="handleFileDropped">
    <template v-slot:default="props">
      <q-input
        borderless
        autogrow
        class="q-pl-sm"
        type="textarea"
        v-model="project.data.dat"
        rows="12"
        label="Dat"
      />
      <q-separator />
      <div class="q-pa-xs">
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
      <div class="q-pa-xs">
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
import { Simutrans } from "@/services/Simutrans";

export default {
  components: {
    DroppableBox,
    ObjEditor,
    SnippetSelector,
  },
  props: ["project"],
  computed: {
    dat() {
      return new Simutrans.Dat(this.value);
    },
  },
  methods: {
    async handleFileDropped({ files, ctrl }) {
      const result = await asyncTextReader(
        files.filter((f) => f.name.endsWith(".dat"))
      );
      this.project.data.dat = result.reduce(
        (current, f) => `${current}\n# import from ${f.file.name}\n${f.result}`,
        ctrl ? "" : this.project.data.dat
      );
    },
    handleSnippetSelected(value) {
      this.project.data.dat += `\n${value}`;
    },
  },
};
</script>
