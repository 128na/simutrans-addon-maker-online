<template>
  <div class="relative-position border q-mb-md q-ml-md">
    <template v-for="label in xLabels">
      <small class="absolute" :style="label.style">{{ label.text }}</small>
    </template>
    <template v-for="label in yLabels">
      <small class="absolute" :style="label.style">{{ label.text }}</small>
    </template>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewBox"
      height="100px"
      width="100%"
      preserveAspectRatio="none"
    >
      <path
        :d="d"
        fill="none"
        stroke="#027be3"
        stroke-width="2"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  </div>
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
    xLabels() {
      const interval = 20;
      const count = Math.ceil(this.tick / interval);
      return createArray(count).map((i) =>
        Object.create({
          text: i * interval,
          style: {
            left: `${(i / count) * 100}%`,
            top: "100%",
            "word-break": "keep-all",
          },
        })
      );
    },
    yLabels() {
      return createArray(2).map((i) =>
        Object.create({
          text: i * this.limitSpeed,
          style: {
            bottom: `${i * 100 - 10}%`,
            left: "-15%",
            "word-break": "keep-all",
          },
        })
      );
    },
  },
};
</script>
<style scoped>
.border {
  border: solid 1px #ccc;
}
</style>