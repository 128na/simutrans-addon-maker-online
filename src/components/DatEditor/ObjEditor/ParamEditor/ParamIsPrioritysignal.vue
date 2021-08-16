<template>
  <q-item tag="label" v-ripple class="q-pa-none">
    <q-item-section side>
      <q-checkbox dense true-value="1" false-value="" v-model="value" />
    </q-item-section>
    <q-item-section>
      <q-item-label>プライオリティシグナル属性</q-item-label>
      <q-item-label caption>
        プライオリティシグナルの場合に指定します
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
        return this.modelValue.findParam("is_prioritysignal")?.value || "";
      },
      set(v) {
        this.modelValue.updateOrCreate("is_prioritysignal", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
