<template>
  <q-input
    dense
    hide-hint
    hide-bottom-space
    input-debounce="0"
    label="走行音"
    type="text"
    hint="pakxxx/soundフォルダ内のwavファイル名を指定します"
    v-model="value"
  />
</template>
<script>
export default {
  props: ["modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue.findParam("sound")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("sound", v);
        this.$emit("update:modelValue");
      },
    },
  },
};
</script>
