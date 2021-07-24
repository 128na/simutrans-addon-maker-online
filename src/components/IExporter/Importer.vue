<template>
  <q-form style="max-width: 600px">
    <q-file
      outlined
      v-model="file"
      accept=".json"
      label="ファイルを選択"
      class="q-mb-md"
    >
      <template v-slot:append>
        <q-icon name="file" />
      </template>
    </q-file>
    <q-checkbox
      v-model="overwrite"
      label="インポート時に同一IDのデータを上書きする"
      class="q-mb-md"
    />
    <div>
      <q-btn color="primary" @click="handle" :disable="!file">インポート</q-btn>
    </div>
  </q-form>
</template>
<script>
import { asyncTextReader } from "../../services/File";
import LayoutBox from "../LayoutBox.vue";
export default {
  components: { LayoutBox },
  emits: ["import"],
  data() {
    return {
      file: null,
      overwrite: false,
    };
  },
  methods: {
    async handle() {
      const res = await asyncTextReader([this.file]);
      if (res && res.length) {
        res.map((r) => {
          const json = JSON.parse(r.result);

          this.$emit("import", { json, overwrite: this.overwrite });
        });
        this.file = null;
        alert("ファイルのインポートが完了しました");
      } else {
        alert("ファイルの読み取りに失敗しました");
      }
    },
  },
};
</script>