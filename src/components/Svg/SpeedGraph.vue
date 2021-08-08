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
import { Vehicle } from "@/services/Simutrans";
import { createArray } from "@/services/Array";

export default {
  props: {
    vehicleSpeed: {},
    tick: {
      type: [Number, String],
      default: 60,
    },
  },
  computed: {
    viewBox() {
      return `-2 -2 ${this.tick * 1 + 2} ${this.vehicleSpeed.speed + 2}`;
    },
    height() {
      return Math.max(this.vehicleSpeed.speed, 100);
    },
    d() {
      const curve = this.vehicleSpeed.velocityCurve;
      const commands = [];
      createArray(this.tick).map((t) => {
        const mode = commands.length ? "L" : "M";
        const speed = this.vehicleSpeed.speed - curve(t);
        commands.push(`${mode}${t},${speed}`);
      });
      return commands.join(" ");
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
          text: i * this.vehicleSpeed.speed,
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