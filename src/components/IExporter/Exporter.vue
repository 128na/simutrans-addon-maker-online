<template>
  <q-btn color="primary" label="エクスポート" @click="handle" />
</template>
<script>
import { saveAs } from "file-saver";

export default {
  props: ["data", "exportName"],
  methods: {
    handle() {
      try {
        saveAs(
          new File(
            [JSON.stringify(this.data, null, 2)],
            `${this.exportName || "export"}.json`,
            { type: "data:application/json;charset=utf-8" }
          )
        );
        this.notifyPositive("エクスポートが完了しました");
      } catch (e) {
        this.notifyNegative("エクスポートに失敗しました");
      }
    },
  },
};
</script>