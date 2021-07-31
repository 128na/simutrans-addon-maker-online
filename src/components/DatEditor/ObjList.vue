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
            :icon="objIcons[obj.obj || 'other']"
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
          <q-tab-panel :name="index">
            <div class="text-h4 q-mb-md">{{ obj.name || "(名称無し)" }}</div>
            <pre>{{ obj.original }}</pre>
          </q-tab-panel>
        </template>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>
<script>
import { Dat, OBJ_ICONS } from "@/services/Simutrans";

export default {
  props: ["project"],
  data() {
    return {
      dat: null,
      tab: 0,
      splitter: 20,
    };
  },
  created() {
    this.dat = new Dat(this.project.data.dat);
  },
  computed: {
    objIcons() {
      return OBJ_ICONS;
    },
    vertical() {
      return ["sm", "md", "lg", "xl"].includes(this.$q.screen.name);
    },
  },
};
</script>