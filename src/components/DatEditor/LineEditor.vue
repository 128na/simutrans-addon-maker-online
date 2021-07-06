<template>
  <div class="card">
    <div class="card-header">
      {{ value || "(空白)" }}
    </div>
    <div v-if="hasImage" class="card-body">
      <image-preview
        :line="parsed[3]"
        :images="project.data.images"
        :size="project.data.size"
        :isStatic="isStatic"
      />
    </div>
    <component :is="componentName" />
  </div>
</template>
<script>
import { parseLine } from "../../services/DatParser";
import ImagePreview from "./ImagePreview.vue";
import Fields from "../../services/FieldImport";
import camelCase from "camelcase";

const imageNames = ["image", "icon", "cursor"];
export default {
  props: ["value", "project"],
  components: { ImagePreview, ...Fields },
  computed: {
    parsed() {
      return parseLine(this.value);
    },
    hasImage() {
      return (
        this.parsed &&
        imageNames.some((name) => this.parsed[1].toLowerCase().includes(name))
      );
    },
    isStatic() {
      return this.parsed && this.parsed[2] === "=> ";
    },
    componentName() {
      if (!this.value) {
        return "FieldEmpty";
      }
      if (this.value.startsWith("#")) {
        return "FieldComment";
      }
      if (this.value.startsWith("-")) {
        return "FieldSeparator";
      }
      const key = this.parsed
        ? this.parsed[1].toLowerCase().replace("_", "-")
        : "default";
      const name = camelCase(`field-${key}`, { pascalCase: true });

      return this.$options.components[name] ? name : "FieldDefault";
    },
  },
};
</script>