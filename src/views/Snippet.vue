<template>
  <div v-if="editing">
    <h3 class="q-mb-lg">{{ editing.data.title }}</h3>
    <q-form class="q-gutter-md">
      <q-input
        dense
        outlined
        v-model="editing.data.title"
        label="テンプレート名"
        :rules="titleRule"
      />
      <q-input
        dense
        outlined
        autogrow
        type="textarea"
        v-model="editing.data.dat"
        rows="12"
        label="Dat"
      />
    </q-form>

    <global-footer>
      <q-btn
        dense
        color="secondary"
        label="取消"
        :disabled="!hasChanged"
        @click="handleReset()"
      />
      <q-btn
        dense
        color="primary"
        label="保存"
        :disabled="!hasChanged"
        @click="handleUpdate"
      />
      <q-space />

      <last-modified>
        <text-date-time v-model="editing.data.updatedAt" />
      </last-modified>
    </global-footer>
  </div>
  <layout-loading v-else />
</template>

<script>
import GlobalFooter from "@/components/GlobalFooter.vue";
import LastModified from "@/components/Text/LastModified.vue";
import LayoutLoading from "@/components/LayoutLoading.vue";
import TextDateTime from "@/components/Text/TextDateTime.vue";
import { clone, equals } from "@/services/Object";
import { confirmBeforeLeave } from "@/mixins";
import { getFirestoreErrorMessage } from "@/services/ErrorMessages";
import { mapActions, mapGetters } from "vuex";
import { required } from "@/services/Validator";

export default {
  components: {
    LayoutLoading,
    LastModified,
    GlobalFooter,
    TextDateTime,
  },
  mixins: [confirmBeforeLeave],
  data() {
    return {
      editing: null,
      original: null,
      fetching: false,
    };
  },
  watch: {
    snippetLoaded() {
      this.init();
    },
    hasChanged() {
      if (this.hasChanged) {
        this.setLeaveDialog();
      } else {
        this.clearLeaveDialog();
      }
    },
  },
  created() {
    this.init();
  },
  beforeRouteLeave(to, from, next) {
    next(this.handleBeforeLeave());
  },
  beforeRouteUpdate(to, from, next) {
    if (this.handleBeforeLeave()) {
      this.init(to);
      next();
    } else {
      next(false);
    }
  },
  computed: {
    ...mapGetters(["snippetLoaded", "getSnippet"]),
    hasChanged() {
      return !equals(this.editing, this.original);
    },
    titleRule() {
      return [required];
    },
  },
  methods: {
    ...mapActions(["updateSnippet"]),
    init() {
      if (!this.snippetLoaded) {
        return;
      }
      const sni = this.getSnippet(this.$route.params.id);
      if (!sni) {
        return;
      }
      this.editing = clone(sni);
      this.original = clone(sni);
    },
    handleReset() {
      this.editing = clone(this.original);
    },
    async handleUpdate() {
      try {
        this.updateSnippet(this.editing);
        this.original = clone(this.editing);
        this.notifyPositive("更新しました。");
      } catch (e) {
        this.notifyNegative(getFirestoreErrorMessage(e));
      }
    },
  },
};
</script>
