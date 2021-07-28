<template>
  <q-inner-loading showing>
    <q-icon color="primary" :name="iconName" size="4rem" />
    Loading...
  </q-inner-loading>
</template>
<script>
const icons = [
  "local_shipping",
  "flight_takeoff",
  "directions_boat",
  "directions_bus",
  "train",
  "subway",
];
export default {
  computed: {
    iconName() {
      return icons[Math.floor(Math.random() * icons.length)];
    },
  },
};
</script>