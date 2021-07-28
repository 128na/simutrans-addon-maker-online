<template>
  <q-btn color="primary" label="エクスポート" @click="handle" />
</template>
<script>
import { saveAs } from "file-saver";
export default {
  props: ["data", "exportName"],
  methods: {
    handle() {
      return saveAs(
        new File(
          [JSON.stringify(this.data, null, 2)],
          `${this.exportName || "export"}.json`,
          { type: "data:application/json;charset=utf-8" }
        )
      );
    },
  },
};
</script>