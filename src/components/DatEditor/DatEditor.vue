<template>
  <q-card flat bordered>
    <q-tabs
      v-model="tab"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
      inline-label
      dense
    >
      <q-tab name="text" icon="subject" label="テキスト" />
      <q-tab name="property" icon="tune" label="プロパティ" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="text" class="q-pa-none">
        <dat-text-editor :project="project" />
      </q-tab-panel>
      <q-tab-panel name="property" class="q-pa-none">
        <obj-list :project="project" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
<script>
import DatTextEditor from "./DatTextEditor.vue";
import ObjList from "./ObjList.vue";

export default {
  components: {
    DatTextEditor,
    ObjList,
  },
  props: ["project"],
  data() {
    return {
      tab: "text",
    };
  },
  watch: {
    tab(v) {
      localStorage.setItem("DatEditor.tab", v);
    },
  },
  created() {
    this.tab = localStorage.getItem("DatEditor.tab") || "text";
  },
  computed: {},
};
</script>
