<template>
  <droppable-box @fileDropped="handleFileDropped">
    <template v-slot:default="props">
      <q-card-section class="q-px-md q-py-xs">
        <q-input
          borderless
          autogrow
          type="textarea"
          v-model="project.data.dat"
          label="Dat"
          style="min-height: 30vh"
        />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-px-md q-py-xs">
        <small v-show="props.dropping && !props.ctrl">
          ファイル内容を追加。
        </small>
        <small v-show="props.dropping && props.ctrl">
          ファイル内容で上書き。
        </small>
        <small v-show="!props.dropping">
          .datファイルをドロップで内容を追加、Ctrl+ドロップで上書き。
        </small>
      </q-card-section>
      <snippet-selector @snippetSelected="handleSnippetSelected" />
    </template>
  </droppable-box>
</template>
<script>
import DroppableBox from "../../components/DroppableBox.vue";
import { asyncTextReader } from "../../services/File";
import SnippetSelector from "./SnippetSelector/SnippetSelector.vue";

export default {
  components: {
    DroppableBox,
    SnippetSelector,
  },
  props: ["project"],
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
