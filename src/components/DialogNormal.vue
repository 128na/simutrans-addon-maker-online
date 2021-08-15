<template>
  <q-dialog v-model="modelValue" @hide="$emit('update:modelValue', false)">
    <q-card bordered>
      <q-bar v-if="header" class="bg-dark text-white">
        <slot name="header" />
        <q-space />
        <q-btn icon="close" flat dense v-close-popup />
      </q-bar>
      <q-card-section><slot /></q-card-section>
      <slot name="extra" />
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: ["modelValue"],
  computed: {
    header() {
      return !!this.$slots["header"];
    },
  },
};
</script>
