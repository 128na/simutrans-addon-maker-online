<template>
  <div class="accordion" id="snippet-list">
    <div class="accordion-item border-0">
      <!-- 規定テンプレート一覧 -->
      <template v-for="snippetList in snippetLists">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            data-bs-toggle="collapse"
            :data-bs-target="`#snippet-${snippetList.name}`"
          >
            {{ snippetList.name }}
          </button>
        </h2>
        <div
          :id="`snippet-${snippetList.name}`"
          data-bs-parent="#snippet-list"
          class="accordion-collapse collapse"
        >
          <div class="accordion">
            <div class="accordion-item border-0">
              <template
                v-if="snippetList.snippets.length"
                v-for="snippet in snippetList.snippets"
              >
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#snippet-${snippetList.name}-${snippet.name}`"
                    @click="handleSnippet(snippet)"
                  >
                    ┗ {{ snippet.name }}
                  </button>
                </h2>
                <div
                  :id="`snippet-${snippetList.name}-${snippet.name}`"
                  :data-bs-parent="`#snippet-${snippetList.name}`"
                  class="accordion-collapse collapse"
                >
                  <pre
                    class="accordion-body bg-light mb-0"
                  ><code>{{ snippet.dat }}</code></pre>
                </div>
              </template>
              <div v-else class="accordion-body">テンプレートがありません</div>
            </div>
          </div>
        </div>
      </template>
      <!-- カスタムテンプレート -->
      <h2 class="accordion-header">
        <button
          class="accordion-button collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#snippet-mySnippet"
        >
          カスタムテンプレート
        </button>
      </h2>
      <div
        id="snippet-mySnippet"
        data-bs-parent="#snippet-list"
        class="accordion-collapse collapse"
      >
        <div class="accordion">
          <div class="accordion-item border-0">
            <template v-if="mySnippets.length" v-for="snippet in mySnippets">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#snippet-mySnippet-${snippet.data.name}`"
                  @click="handleSnippet(snippet.data)"
                >
                  ┗ {{ snippet.data.name }}
                </button>
              </h2>
              <div
                :id="`snippet-mySnippet-${snippet.data.name}`"
                :data-bs-parent="`#snippet-mySnippet`"
                class="accordion-collapse collapse"
              >
                <pre
                  class="accordion-body bg-light mb-0"
                ><code>{{ snippet.data.dat }}</code></pre>
              </div>
            </template>
            <div v-else class="accordion-body">テンプレートがありません</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { SNIPPETS } from "../../../constants";
import LayoutLoading from "../../LayoutLoading.vue";
export default {
  components: { LayoutLoading },
  props: ["selected"],
  emits: ["select"],
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
    handleSnippet(snippet) {
      this.$emit("select", snippet);
    },
  },
};
</script>