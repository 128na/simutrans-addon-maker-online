<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    label="軌道名"
    type="text"
    hint="トンネル内で使用する軌道アドオン名を指定します"
    v-model="value"
  />
</template>
<script>
export default {
  props: ["modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue.findParam("way")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("way", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
