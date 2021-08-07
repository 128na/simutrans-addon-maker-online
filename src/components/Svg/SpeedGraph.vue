<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    height="100px"
    width="100%"
    preserveAspectRatio="none"
  >
    <path :d="d" stroke="blue" fill="none" stroke-width="0.5" />
    <path
      :d="`M0,0 l0,${height} l${tick},0 l0,${-height} l${-tick},0 `"
      stroke="gray"
      stroke-width="0.5"
      fill="none"
    />
  </svg>
</template>
<script>
import { calculateSpeedFn } from "@/services/Simutrans";
const createArray = (count) => [...new Array(count)].map((_, i) => i);
export default {
  props: {
    limitSpeed: {
      type: [Number, String],
      default: 100,
    },
    power: {
      type: [Number, String],
    },
    gear: {
      type: [Number, String],
    },
    weight: {
      type: [Number, String],
    },
    tick: {
      type: [Number, String],
      default: 120,
    },
  },
  computed: {
    viewBox() {
      return `-2 -2 ${this.tick * 1 + 2} ${this.limitSpeed * 1 + 2}`;
    },
    height() {
      return Math.max(this.limitSpeed, 100);
    },
    d() {
      const commands = [`M0,${this.limitSpeed}`];
      createArray(this.tick).map((t) => {
        commands.push([`L${t},${this.limitSpeed - this.speedFn(t)}`]);
      });
      return commands.join(" ");
    },
    speedFn() {
      return calculateSpeedFn(
        Number(this.power),
        Number(this.gear),
        Number(this.weight),
        Number(this.limitSpeed)
      );
    },
  },
};
</script>