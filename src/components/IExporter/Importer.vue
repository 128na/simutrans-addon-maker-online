<template>
  <layout-box>
    <input type="file" class="form-control" accept=".json" @change="handle" />
  </layout-box>
  <layout-box>
    <div class="form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="overwrite"
        v-model="overwrite"
      />
      <label class="form-check-label" for="overwrite">
        インポート時に同一IDのデータを上書きする
      </label>
    </div>
  </layout-box>
</template>
<script>
import { asyncTextReader } from "../../services/File";
import LayoutBox from "../LayoutBox.vue";
export default {
  components: { LayoutBox },
  emits: ["import"],
  data() {
    return {
      overwrite: false,
    };
  },
  methods: {
    async handle(e) {
      const res = await asyncTextReader(
        [...e.target.files].filter((f) => f.name.endsWith(".json"))
      );
      if (res && res.length) {
        const json = JSON.parse(res[0].result);

        this.$emit("import", { json, overwrite: this.overwrite });
      } else {
        alert("ファイルの読み取りに失敗しました");
      }
    },
  },
};
</script>