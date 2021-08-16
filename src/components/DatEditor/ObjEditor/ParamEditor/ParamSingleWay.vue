<template>
  <q-item tag="label" v-ripple class="q-pa-none">
    <q-item-section side>
      <q-checkbox dense true-value="1" false-value="" v-model="value" />
    </q-item-section>
    <q-item-section>
      <q-item-label>一方通行</q-item-label>
      <q-item-label caption>
        通過できる方向を一方向に制限します。
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  props: ["modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue.findParam("single_way")?.value || "";
      },
      set(v) {
        this.modelValue.updateOrCreate("single_way", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
