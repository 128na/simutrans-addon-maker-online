<template>
  <q-splitter
    v-model="splitter"
    :horizontal="!vertical"
    style="min-height: 30vh"
  >
    <template v-slot:before>
      <q-tabs
        v-model="tab"
        :vertical="vertical"
        inline-label
        dense
        align="left"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
      >
        <template v-for="(obj, index) in dat.objs">
          <q-tab
            :name="index"
            :icon="objComponent(obj).icon"
            :label="obj.name || '(名称無し)'"
            no-caps
            style="justify-content: initial; text-align: left"
          />
        </template>
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        :vertical="vertical"
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <template v-for="(obj, index) in dat.objs">
          <q-tab-panel :name="index" style="min-height: 30vh">
            <component
              :is="objComponent(obj)"
              :obj="obj"
              :dat="dat"
              :project="project"
              @update="handleUpdate"
            />
          </q-tab-panel>
        </template>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>
<script>
import ObjEditors from "./ObjEditor";
import camelcase from "camelcase";
import { Dat } from "@/services/Simutrans";

export default {
  components: { ...ObjEditors },
  props: ["project"],
  data() {
    return {
      tab: 0,
      splitter: 20,
    };
  },
  methods: {
    objComponent(obj) {
      const name = camelcase(`obj-${obj.obj}`, { pascalCase: true });
      if (this.$options.components[name]) {
        return this.$options.components[name];
      }
      return this.$options.components["ObjNone"];
    },
    handleUpdate() {
      this.project.data.dat = this.dat.toString();
    },
  },
  computed: {
    dat: {
      get() {
        return new Dat(this.project.data.dat);
      },
      set(v) {
        this.project.data.dat = v.toString();
      },
    },
    objIcons() {
      return OBJ_ICONS;
    },
    vertical() {
      return ["sm", "md", "lg", "xl"].includes(this.$q.screen.name);
    },
  },
};
</script>