<template>
  <q-splitter v-model="modalValue" :horizontal="!vertical">
    <template v-slot:before>
      <slot name="before" :vertical="vertical" />
    </template>
    <template v-slot:after>
      <slot name="after" :vertical="vertical" />
    </template>
  </q-splitter>
</template>
<script>
export default {
  props: {
    modalValue: {
      type: Number,
      default: 20,
    },
    verticalSize: {
      type: Array,
      default: () => ["sm", "md", "lg", "xl"],
    },
  },
  computed: {
    vertical() {
      return this.verticalSize.includes(this.$q.screen.name);
    },
  },
};
</script>