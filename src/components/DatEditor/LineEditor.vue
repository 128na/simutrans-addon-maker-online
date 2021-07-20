<template>
  <div class="card">
    <div class="card-header">
      {{ "value" || "(空行)" }}
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-if="imageUrl">
        <image-preview
          :line="line"
          :imageUrl="imageUrl"
          :size="project.data.size"
        />
      </li>

      <component
        :is="componentName"
        :value="value"
        :obj="obj"
        :project="project"
        @lineUpdate="$emit('lineUpdate', $event)"
      />
    </ul>
  </div>
</template>
<script>
import { parseLine } from "../../services/DatParser";
import ImagePreview from "./ImagePreview.vue";
import Fields from "./Fields/ImportAll";
import camelCase from "camelcase";

export default {
  props: ["value", "obj", "project"],
  components: { ImagePreview, ...Fields },
  computed: {
    imageUrl() {
      const filename = `${this.value.lineValue}.png`;
      const image = this.project.data.imageUrls.find(
        (i) => i.filename === filename
      );
      if (image) {
        return image.url;
      }
    },
    componentName() {
      if (!this.value) {
        return "FieldEmpty";
      }
      if (this.value.isComment) {
        return "FieldComment";
      }
      if (this.value.isSplit) {
        return "FieldSeparator";
      }
      const key = this.value.lineKey
        ? this.value.lineKey.replace("_", "-")
        : "default";
      const name = camelCase(`field-${key}`, { pascalCase: true });

      console.log("expected component", name);

      return this.$options.components[name] ? name : "FieldDefault";
    },
  },
};
</script>