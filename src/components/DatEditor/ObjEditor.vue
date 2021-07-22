<template>
  <table class="table mb-0">
    <tbody>
      <tr
        v-for="(l, index) in obj.lines"
        :class="{ 'bg-info': obj.startLineNo + index == lineNo }"
      >
        <template v-if="l.keyWithParameter">
          <td>{{ l.keyWithParameter }}</td>
          <td>{{ l.operator }}</td>
          <td>{{ l.valueWithParameter }}</td>
        </template>
        <template v-else>
          <td colspan="3">{{ l.valueWithParameter || "&nbsp" }}</td>
        </template>
      </tr>
    </tbody>
  </table>
</template>
<script>
import ImagePreview from "./ImagePreview.vue";
import Fields from "./Fields/ImportAll";
import camelCase from "camelcase";

export default {
  props: ["lineNo", "line", "obj", "project"],
  components: { ImagePreview, ...Fields },
  computed: {},
};
</script>
<style scoped>
td {
  padding: 4px;
}
</style>