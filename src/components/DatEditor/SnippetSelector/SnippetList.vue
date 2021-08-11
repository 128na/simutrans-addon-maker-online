<template>
  <q-card-section class="q-pa-none">
    <q-expansion-item
      v-for="(snippetList, i) in snippetLists"
      group="snippetLists"
      expand-separator
      :icon="snippetList.icon"
      :caption="snippetList.caption"
      :label="snippetList.title"
    >
      <q-expansion-item
        v-for="(snippet, j) in snippetList.snippets"
        expand-separator
        group="snippets"
        :caption="snippet.caption"
        :label="snippet.title"
        @after-show="handleShow(snippet)"
        @hide="handleShow()"
      >
        <q-card>
          <q-card-section class="bg-accent">
            <pre class="scroll q-ma-none"><code>{{ snippet.dat }}</code></pre>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-item v-if="!snippetList.snippets.length"> 何もありません。 </q-item>
    </q-expansion-item>
    <q-expansion-item
      expand-separator
      group="snippetLists"
      icon="person"
      label="カスタムテンプレート"
    >
      <q-expansion-item
        v-for="(snippet, j) in mySnippets"
        group="snippets"
        expand-separator
        :label="snippet.title || '(名称無し)'"
        @after-show="handleShow(snippet)"
        @hide="handleShow()"
      >
        <q-card>
          <slot :selected="snippet" />
          <q-card-section>
            <pre class="q-ma-none"><code>{{ snippet.dat }}</code></pre>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-item v-if="!mySnippets.length"> 何もありません。 </q-item>
    </q-expansion-item>
  </q-card-section>
</template>
<script>
import { SNIPPETS } from "@/constants";
import { mapGetters } from "vuex";

export default {
  props: ["modelValue"],
  methods: {
    handleShow(snippet = null) {
      this.$emit("update:modelValue", snippet);
    },
  },
  computed: {
    ...mapGetters(["snippetLoaded", "snippets"]),
    snippetLists() {
      return SNIPPETS;
    },
    mySnippets() {
      return this.snippetLoaded ? this.snippets : [];
    },
  },
};
</script>