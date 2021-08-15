<template>
  <q-item tag="label" v-ripple class="q-pa-none">
    <q-item-section side>
      <q-checkbox dense true-value="1" false-value="" v-model="value" />
    </q-item-section>
    <q-item-section>
      <q-item-label>通常描画</q-item-label>
      <q-item-label caption>
        背後の建物よりも手前に描画されます。
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
        return this.modelValue.findParam("draw_as_ding")?.value || "";
      },
      set(v) {
        this.modelValue.updateOrCreate("draw_as_ding", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
