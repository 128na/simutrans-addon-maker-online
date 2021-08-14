<template>
  <q-item tag="label" v-ripple class="q-pa-none">
    <q-item-section side>
      <q-checkbox dense true-value="1" false-value="" v-model="value" />
    </q-item-section>
    <q-item-section>
      <q-item-label>建設中表示</q-item-label>
      <q-item-label caption>
        建物を即座に建設せず建設中画像を表示します
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
        return this.modelValue.findParam("noconstruction")?.value || "";
      },
      set(v) {
        this.modelValue.updateOrCreate("noconstruction", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
