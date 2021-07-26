<template>
  <q-card-section style="max-height: 75vh" class="scroll q-pa-none">
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
        icon="mdi-subdirectory-arrow-right"
        :caption="snippet.caption"
        :label="snippet.title"
        @show="handleShow(snippet)"
        @hide="handleShow()"
      >
        <q-card>
          <q-card-section class="bg-accent">
            <pre class="q-ma-none"><code>{{ snippet.dat }}</code></pre>
          </q-card-section>
        </q-card>
      </q-expansion-item>
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
        icon="mdi-subdirectory-arrow-right"
        :label="snippet.title"
      >
        <q-card>
          <q-card-section>
            <pre class="q-ma-none"><code>{{ snippet.dat }}</code></pre>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-expansion-item>
  </q-card-section>
  <slot :selected="selected" />
</template>
<script>
import { mapGetters } from "vuex";
import { SNIPPETS } from "../../../constants";
export default {
  data() {
    return {
      selected: null,
    };
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
  methods: {
    handleShow(snippet = null) {
      this.selected = snippet;
    },
  },
};
</script>