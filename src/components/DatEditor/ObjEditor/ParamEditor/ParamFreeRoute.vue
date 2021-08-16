<template>
  <q-item tag="label" v-ripple class="q-pa-none">
    <q-item-section side>
      <q-checkbox dense true-value="1" false-value="" v-model="value" />
    </q-item-section>
    <q-item-section>
      <q-item-label>振分信号</q-item-label>
      <q-item-label caption> 振分信号属性を追加します。 </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  props: ["modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue.findParam("free_route")?.value || "";
      },
      set(v) {
        this.modelValue.updateOrCreate("free_route", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
