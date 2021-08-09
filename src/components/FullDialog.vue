<template>
  <q-dialog
    maximized
    v-model="modelValue"
    @hide="$emit('update:modelValue', false)"
  >
    <q-card bordered>
      <q-layout view="lhh LpR lff" container>
        <q-header class="bg-dark text-white"><slot name="header" /></q-header>
        <q-page-container><slot /></q-page-container>
        <q-footer class="bg-dark text-white"><slot name="footer" /></q-footer>
      </q-layout>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: ["modelValue"],
};
</script>