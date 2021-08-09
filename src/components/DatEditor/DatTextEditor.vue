<template>
  <droppable-box @fileDropped="handleFileDropped">
    <template v-slot:default="props">
      <q-card-section class="q-px-md q-py-xs">
        <small class="text-grey">
          <span v-show="props.dropping && !props.ctrl">
            ファイル内容を追加
          </span>
          <span v-show="props.dropping && props.ctrl">
            ファイル内容で上書き
          </span>
          <span v-show="!props.dropping">
            .datファイルをドロップで内容を追加、Ctrl+ドロップで上書き
          </span>
        </small>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-px-md q-py-xs">
        <q-input
          borderless
          autogrow
          type="textarea"
          v-model="project.data.dat"
          label="Dat"
        />
      </q-card-section>
      <q-separator />
      <snippet-selector @snippetSelected="handleSnippetSelected" />
    </template>
  </droppable-box>
</template>
<script>
import DroppableBox from "../DroppableBox.vue";
import SnippetSelector from "./SnippetSelector/SnippetSelector.vue";
import { asyncTextReader } from "@/services/File";
import { OBJ_SEPARATOR } from "@/services/Simutrans";

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
        (current, f) =>
          current
            ? `${current}\n${OBJ_SEPARATOR}\n# import from ${f.file.name}\n${f.result}`
            : `# import from ${f.file.name}\n${f.result}`,
        ctrl ? "" : this.project.data.dat
      );
    },
    handleSnippetSelected(value) {
      this.project.data.dat += `\n${value}`;
    },
  },
};
</script>
