<template>
  <q-card flat bordered>
    <layout-changer :sizes="['xs', 'sm']">
      <template v-slot:match>
        <q-tabs v-model="editorTab" v-bind="tabProps">
          <q-tab name="text" icon="subject" label="テキスト" />
          <q-tab name="property" icon="tune" label="プロパティ" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="editorTab" v-bind="tabPanelProps">
          <q-tab-panel name="text" class="q-pa-none">
            <q-scroll-area style="height: 75vh">
              <dat-text-editor :project="project" />
            </q-scroll-area>
          </q-tab-panel>
          <q-tab-panel name="property" class="q-pa-none">
            <q-tabs v-model="objTab" v-bind="tabProps">
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
            <q-separator />
            <q-scroll-area style="height: 75vh">
              <q-tab-panels v-model="objTab" v-bind="tabPanelProps">
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
            </q-scroll-area>
          </q-tab-panel>
        </q-tab-panels>
      </template>
      <template v-slot:not-match>
        <q-splitter :model-value="50">
          <template v-slot:before>
            <q-splitter :model-value="25">
              <template v-slot:before>
                <q-scroll-area style="height: 75vh">
                  <q-tabs v-model="objTab" vertical v-bind="tabProps">
                    <template v-for="(obj, index) in dat.objs">
                      <q-tab
                        :name="index"
                        :icon="objComponent(obj).icon"
                        :label="obj.name || '(名称無し)'"
                        style="justify-content: initial; text-align: left"
                      />
                    </template>
                  </q-tabs>
                </q-scroll-area>
              </template>
              <template v-slot:after>
                <q-scroll-area style="height: 75vh" ref="paramRef">
                  <q-tab-panels
                    v-model="objTab"
                    vertical
                    v-bind="tabPanelProps"
                  >
                    <template v-for="(obj, index) in dat.objs">
                      <q-tab-panel style="min-height: 30vh" :name="index">
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
                </q-scroll-area>
              </template>
            </q-splitter>
          </template>
          <template v-slot:after>
            <q-scroll-area style="height: 75vh" ref="textRef">
              <dat-text-editor :project="project" />
            </q-scroll-area>
          </template>
        </q-splitter>
      </template>
    </layout-changer>
  </q-card>
</template>
<script>
import camelcase from "camelcase";
import LayoutChanger from "../LayoutChanger.vue";
import DatTextEditor from "./DatTextEditor.vue";
import ObjEditors from "./ObjEditor";
import { Dat } from "@/services/Simutrans";

export default {
  components: {
    DatTextEditor,
    LayoutChanger,
    ...ObjEditors,
  },
  props: ["project"],
  data() {
    return {
      editorTab: "text",
      objTab: 0,
    };
  },
  watch: {
    editorTab(v) {
      localStorage.setItem("DatEditor.tab", v);
    },
    objTab(v) {
      const textRef = this.$refs.textRef;
      // spのときは非表示なのでundefinedになるぞい
      if (textRef) {
        const line = this.dat.objs[v].firstLine;
        const position = 48 + 18 * line;
        textRef.setScrollPosition("vertical", position, 300);
      }
      const paramRef = this.$refs.paramRef;
      // spのときは非表示なのでundefinedになるぞい
      if (paramRef) {
        paramRef.setScrollPosition("vertical", 0, 300);
      }
    },
  },
  created() {
    this.editorTab = localStorage.getItem("DatEditor.tab") || "text";
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
    tabProps() {
      return {
        "inline-label": true,
        dense: true,
        swipeable: true,
        animated: true,
        align: "left",
        class: "text-grey",
        "no-caps": true,
        "active-color": "primary",
        "indicator-color": "primary",
        "inoutside-arrows": true,
        "mobile-arrows": true,
      };
    },
    tabPanelProps() {
      return {
        animated: true,
      };
    },
  },
};
</script>
