<template>
  <q-item tag="label" v-ripple class="q-pa-none">
    <q-item-section side>
      <q-checkbox dense true-value="1" false-value="" v-model="value" />
    </q-item-section>
    <q-item-section>
      <q-item-label>プレシグナル属性</q-item-label>
      <q-item-label caption> プレシグナルの場合に指定します </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  props: ["modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue.findParam("is_presignal")?.value || "";
      },
      set(v) {
        this.modelValue.updateOrCreate("is_presignal", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
