<template>
  <q-dialog v-model="modelValue" @hide="$emit('update:modelValue', false)">
    <q-card bordered>
      <q-card-section
        v-if="header"
        class="bg-dark text-white row items-center q-pa-sm"
      >
        <slot name="header" />
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
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