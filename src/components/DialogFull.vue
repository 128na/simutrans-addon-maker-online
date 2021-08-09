<template>
  <q-dialog
    maximized
    v-model="modelValue"
    @hide="$emit('update:modelValue', false)"
  >
    <q-card>
      <q-layout view="hHh LpR fFf" container>
        <q-header class="bg-dark text-white">
          <q-toolbar>
            <q-toolbar-title>
              <slot name="header" />
            </q-toolbar-title>
            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>
        </q-header>
        <q-page-container><slot /></q-page-container>
        <q-footer class="bg-dark text-white">
          <slot name="footer" />
        </q-footer>
        <slot name="extra" />
      </q-layout>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: ["modelValue"],
};
</script>