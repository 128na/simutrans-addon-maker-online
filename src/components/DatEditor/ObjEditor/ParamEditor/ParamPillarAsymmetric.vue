<template>
  <q-item tag="label" v-ripple class="q-pa-none">
    <q-item-section side>
      <q-checkbox dense true-value="1" false-value="" v-model="value" />
    </q-item-section>
    <q-item-section>
      <q-item-label>スロープでの描画位置補正</q-item-label>
      <q-item-label caption>
        スロープに橋脚がめり込まないよう橋脚の長さを非対称にします。
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
        return this.modelValue.findParam("pillar_asymmetric")?.value || "";
      },
      set(v) {
        this.modelValue.updateOrCreate("pillar_asymmetric", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
