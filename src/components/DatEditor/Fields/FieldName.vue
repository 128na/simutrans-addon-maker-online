<template>
  <li class="list-group-item">
    <input class="form-control" v-model="item" />
  </li>
  <li class="list-group-item">
    <small>
      アドオン単体の名称。<br />
      マージされたpakファイルを抽出すると、この名前のファイルになるため日本語や特殊文字は非推奨。<br />
      推奨：英数字とハイフン(-)、アンダースコア(_)
    </small>
  </li>
</template>
<script>
export default {
  props: ["value", "obj", "project"],
  emits: ["lineUpdate"],
  computed: {
    item: {
      get() {
        return this.value.split("=")[1] || "";
      },
      set(v) {
        const data = this.value.split("=");
        data.splice(1, 1, v);

        this.$emit("lineUpdate", data.join("="));
      },
    },
  },
};
</script>