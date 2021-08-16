<template>
  <q-item tag="label" v-ripple class="q-pa-none">
    <q-item-section side>
      <q-checkbox dense true-value="1" false-value="" v-model="value" />
    </q-item-section>
    <q-item-section>
      <q-item-label>振分終了属性</q-item-label>
      <q-item-label caption> 振分終了標識の場合に指定します </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  props: ["modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue.findParam("end_of_choose")?.value || "";
      },
      set(v) {
        this.modelValue.updateOrCreate("end_of_choose", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
