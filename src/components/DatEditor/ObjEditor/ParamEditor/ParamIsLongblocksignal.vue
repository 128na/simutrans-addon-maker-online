<template>
  <q-item tag="label" v-ripple class="q-pa-none">
    <q-item-section side>
      <q-checkbox dense true-value="1" false-value="" v-model="value" />
    </q-item-section>
    <q-item-section>
      <q-item-label>多閉塞信号属性</q-item-label>
      <q-item-label caption> 多閉塞信号の場合に指定します </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  props: ["modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue.findParam("is_longblocksignal")?.value || "";
      },
      set(v) {
        this.modelValue.updateOrCreate("is_longblocksignal", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
