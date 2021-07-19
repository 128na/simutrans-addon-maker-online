<template>
  <div class="card">
    <div class="card-header">
      {{ value || "(空行)" }}
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-if="imageUrl">
        <image-preview
          :line="parsed[3]"
          :imageUrl="imageUrl"
          :size="project.data.size"
          :isStatic="isStatic"
        />
      </li>

      <component
        :is="componentName"
        :value="value"
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
  props: ["value", "project"],
  components: { ImagePreview, ...Fields },
  computed: {
    parsed() {
      return parseLine(this.value);
    },
    imageUrl() {
      if (
        hasImage.some((name) => this.parsed[1].toLowerCase().includes(name))
      ) {
        const filename = `${this.parsed[3].split(".")[0]}.png`;
        const image = this.project.data.imageUrls.find(
          (i) => i.filename === filename
        );
        if (image) {
          return image.url;
        }
      }
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
        ? this.parsed[1].split("[")[0].toLowerCase().replace("_", "-")
        : "default";
      const name = camelCase(`field-${key}`, { pascalCase: true });

      console.log("expected component", name);

      return this.$options.components[name] ? name : "FieldDefault";
    },
  },
};
</script>