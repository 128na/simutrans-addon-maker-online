<template>
  <q-item tag="label" v-ripple class="q-pa-none">
    <q-item-section side>
      <q-checkbox dense true-value="1" false-value="" v-model="value" />
    </q-item-section>
    <q-item-section>
      <q-item-label>旅客扱い</q-item-label>
      <q-item-label caption>
        駅が取り扱える属性に旅客を追加します。
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
        return this.modelValue.findParam("enables_pax")?.value || "";
      },
      set(v) {
        this.modelValue.updateOrCreate("enables_pax", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
