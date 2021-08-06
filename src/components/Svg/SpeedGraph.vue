import { maxSpeed } from '../../services/Validator';
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
      :d="`M0,0 l0,${maxSpeed} l${tick},0 l0,${-maxSpeed} l${-tick},0 `"
      stroke="gray"
      stroke-width="0.5"
      fill="none"
    />
  </svg>
</template>
<script>
const createArray = (count) => [...new Array(count)].map((_, i) => i);
export default {
  props: {
    maxSpeed: {
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
  methods: {
    speed(t) {
      const [a, b, c] = [
        -0.0145 * this.pgw + 0.028,
        0.8733 * this.pgw - 0.7787,
        -0.096 * this.pgw + 7.6348,
      ];
      return Math.max(0, Math.min(this.maxSpeed, a * t * t + b * t + c));
    },
  },
  computed: {
    viewBox() {
      return `-2 -2 ${this.tick * 1 + 2} ${this.maxSpeed * 1 + 2}`;
    },
    d() {
      const commands = [`M0,${this.maxSpeed}`];
      let vPrev = 0;
      createArray(this.tick).map((t) => {
        const vCalc = this.speed(t);
        const vCurrent = Math.max(vPrev, vCalc);
        commands.push([`L${t},${this.maxSpeed - vCurrent}`]);
        vPrev = vCurrent;
      });
      return commands.join(" ");
    },
    pgw() {
      return (this.power * this.gear) / this.weight / 100;
    },
  },
};
</script>