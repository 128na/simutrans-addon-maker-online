<template>
  <div class="q-gutter-md row items-end q-mb-sm">
    <div class="col-auto cursor-pointer" @click="handleDialog">
      <image-preview v-if="param" :param="param" :project="project" />
    </div>
    <q-input
      dense
      :class="inputClass"
      :model-value="value"
      :label="label"
      @update:model-value="$emit('update', $event)"
    >
      <template v-slot:prepend v-if="icon">
        <q-icon :name="icon" />
      </template>
      <template v-slot:after>
        <q-btn flat color="secondary" icon="edit" @click="handleDialog" />
      </template>
    </q-input>
  </div>
  <q-dialog v-model="dialog">
    <q-card bordered>
      <q-card-section class="row items-center q-pb-none">
        <q-avatar>
          <q-icon :name="icon" />
        </q-avatar>
        <div class="text-h6">{{ label }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-select
          dense
          label="画像"
          v-model="image"
          :options="images"
          :suffix="paramString"
        />
      </q-card-section>
      <q-card-section v-if="param">
        <div class="row justify-center">
          <q-btn
            flat
            color="primary"
            icon="mdi-chevron-up"
            class="col q-mx-xl"
            :disable="!y"
            @click="handleMove(0, -1)"
          />
        </div>
        <div class="row">
          <q-btn
            flat
            color="primary"
            icon="mdi-chevron-left"
            :disable="!x"
            @click="handleMove(-1, 0)"
          />
          <image-preview :param="param" :project="project" />
          <q-btn
            flat
            color="primary"
            icon="mdi-chevron-right"
            @click="handleMove(1, 0)"
          />
        </div>
        <div class="row justify-center">
          <q-btn
            flat
            color="primary"
            icon="mdi-chevron-down"
            class="col q-mx-xl"
            @click="handleMove(0, 1)"
          />
        </div>
        <q-input
          dense
          label="オフセットX"
          type="number"
          v-model="offsetX"
          :min="-project.data.size"
          :max="project.data.size"
        />
        <q-input
          dense
          label="オフセットY"
          type="number"
          v-model="offsetY"
          :min="-project.data.size"
          :max="project.data.size"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import ImagePreview from "./ImagePreview.vue";
export default {
  components: { ImagePreview },
  props: ["param", "label", "value", "isStatic", "project", "icon"],
  emits: ["update"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    handleDialog() {
      this.dialog = true;
    },
    handleMove(x, y) {
      this.$emit("update", this.toValue(x, y));
    },
    toValue(x, y, ox = null, oy = null) {
      const p = this.param;
      const [newX, newY] = [this.x + x, this.y + y];
      const [newOX, newOY] = [
        ox === null ? this.offsetX : ox,
        oy === null ? this.offsetY : oy,
      ];
      const newValue = `${p.valueVal}.${newY}.${newX}`;

      return newOX || newOY ? `${newValue},${newOX},${newOY}` : newValue;
    },
  },
  computed: {
    vertical() {
      return ["xs"].includes(this.$q.screen.name);
    },
    inputClass() {
      return this.vertical ? "col-12" : "col";
    },
    paramString() {
      const str = `.${this.y}.${this.x}`;

      return this.offsetX || this.offsetY
        ? `${str},${this.offsetX},${this.offsetY}`
        : str;
    },
    images() {
      return this.project.data.imageUrls.map((i) =>
        i.filename.replace(".png", "")
      );
    },
    image: {
      get() {
        return this.param?.valueVal;
      },
      set(v) {
        this.$emit("update", `${v}.0.0`);
      },
    },
    x() {
      return this.param?.valueParams[1] || 0;
    },
    y() {
      return this.param?.valueParams[0] || 0;
    },
    offsetX: {
      get() {
        return this.param?.valueParams[2] || 0;
      },
      set(v) {
        this.$emit("update", this.toValue(0, 0, Number(v), null));
      },
    },
    offsetY: {
      get() {
        return this.param?.valueParams[3] || 0;
      },
      set(v) {
        this.$emit("update", this.toValue(0, 0, null, Number(v)));
      },
    },
  },
};
</script>