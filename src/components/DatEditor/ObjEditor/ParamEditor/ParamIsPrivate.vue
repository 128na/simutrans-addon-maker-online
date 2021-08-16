<template>
  <q-item tag="label" v-ripple class="q-pa-none">
    <q-item-section side>
      <q-checkbox dense true-value="1" false-value="" v-model="value" />
    </q-item-section>
    <q-item-section>
      <q-item-label>指定会社のみ通行可能</q-item-label>
      <q-item-label caption> 通過できる車両の会社を制限します。 </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  props: ["modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue.findParam("is_private")?.value || "";
      },
      set(v) {
        this.modelValue.updateOrCreate("is_private", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
