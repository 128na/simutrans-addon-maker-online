<template>
  <droppable-box @fileDropped="handleFileDropped">
    <template v-slot:default="props">
      <textarea
        id="dat"
        class="form-control"
        rows="12"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
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
    </template>
  </droppable-box>
</template>
<script>
import CommonBox from "../../components/CommonBox.vue";
import DroppableBox from "../../components/DroppableBox.vue";
import { asyncTextReader } from "../../libs";

export default {
  components: {
    DroppableBox,
    CommonBox,
  },
  props: ["value"],
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
  },
};
</script>