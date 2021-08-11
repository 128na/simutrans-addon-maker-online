<template>
  <q-item tag="label" v-ripple class="q-pa-none">
    <q-item-section side>
      <q-checkbox dense true-value="1" false-value="" v-model="value" />
    </q-item-section>
    <q-item-section>
      <q-item-label>ベースタイル</q-item-label>
      <q-item-label caption> 地面にベースタイルを表示します </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  props: ["modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue.findParamByKey("needs_ground")?.value || "";
      },
      set(v) {
        this.modelValue.updateOrCreate("needs_ground", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
