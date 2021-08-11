<template>
  <q-form style="max-width: 600px">
    <q-file
      outlined
      v-model="file"
      accept=".json"
      label="ファイルを選択"
      class="q-mb-md"
    />
    <q-checkbox
      v-model="overwrite"
      label="インポート時に同一IDのデータを上書きする"
      class="q-mb-md"
    />
    <div>
      <q-btn
        color="primary"
        label="インポート"
        :disable="!file"
        @click="handle"
      />
    </div>
  </q-form>
</template>
<script>
import LayoutBox from "../LayoutBox.vue";
import { asyncTextReader } from "@/services/File";

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
      try {
        const res = await asyncTextReader([this.file]);
        if (res && res.length) {
          res.map((r) => {
            const json = JSON.parse(r.result);

            this.$emit("import", { json, overwrite: this.overwrite });
          });
          this.file = null;
          this.notifyPositive("インポートが完了しました");
        }
      } catch (e) {
        this.notifyNegative("インポートに失敗しました");
      }
    },
  },
};
</script>