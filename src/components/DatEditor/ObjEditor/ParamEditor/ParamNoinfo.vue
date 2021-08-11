<template>
  <q-item tag="label" v-ripple class="q-pa-none">
    <q-item-section side>
      <q-checkbox dense true-value="1" false-value="" v-model="value" />
    </q-item-section>
    <q-item-section>
      <q-item-label>情報ウインドウ</q-item-label>
      <q-item-label caption>
        建物や駅、車庫情報などの詳細情報を表示します
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
        return this.modelValue.findParamByKey("noinfo")?.value || "";
      },
      set(v) {
        this.modelValue.updateOrCreate("noinfo", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
