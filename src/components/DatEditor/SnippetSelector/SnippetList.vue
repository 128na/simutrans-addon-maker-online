<template>
  <q-expansion-item
    v-for="(snippetList, i) in snippetLists"
    group="snippetLists"
    expand-separator
    :label="snippetList.title"
    @show="handleShowList(i)"
  >
    <template v-if="isShowList(i)">
      <q-expansion-item
        v-for="(snippet, j) in snippetList.snippets"
        expand-separator
        group="snippets"
        :label="`┗ ${snippet.title}`"
        @show="handleShow(snippet)"
        @hide="handleShow()"
      >
        <q-card>
          <q-card-section class="bg-accent">
            <pre class="q-ma-none"><code>{{ snippet.dat }}</code></pre>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </template>
  </q-expansion-item>
  <q-expansion-item
    expand-separator
    group="snippetLists"
    label="カスタムテンプレート"
  >
    <q-expansion-item
      v-for="(snippet, j) in mySnippets"
      group="snippets"
      expand-separator
      :label="`┗ ${snippet.title}`"
    >
      <q-card>
        <q-card-section>
          <pre class="q-ma-none"><code>{{ snippet.dat }}</code></pre>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-expansion-item>
  <slot :selected="selected" />
</template>
<script>
import { mapGetters } from "vuex";
import { SNIPPETS } from "../../../constants";
export default {
  data() {
    return {
      showList: null,
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
    handleShowList(i) {
      this.showList = i;
    },
    isShowList(i) {
      return this.showList === i;
    },
  },
};
</script>