<template>
  <div class="q-gutter-md row items-start">
    <q-input
      dense
      hide-hint
      hide-bottom-space
      input-debounce="0"
      label="出力"
      type="number"
      class="col"
      suffix="kW"
      min="0"
      max="65535"
      v-model="power"
      :rules="speedGearRules"
    />
    <q-input
      dense
      hide-hint
      hide-bottom-space
      input-debounce="0"
      label="ギア比"
      type="number"
      class="col"
      min="0"
      max="65535"
      v-model="gear"
      :rules="speedGearRules"
    />
    <q-btn
      flat
      color="secondary"
      icon="mdi-calculator"
      @click="dialog = !dialog"
    />
  </div>
  <dialog-normal v-model="dialog">
    <template v-slot:header>到達最高速度計算ツール</template>
    <template v-slot:default>
      <q-card-section>
        <speed-graph :vehicleSpeed="vehicleSpeed" />
        <q-input
          dense
          hide-hint
          hide-bottom-space
          input-debounce="0"
          label="最高速度"
          type="number"
          suffix="km/h"
          min="0"
          max="65535"
          v-model="speed"
          :rules="speedRules"
        />
        <q-input
          dense
          hide-hint
          hide-bottom-space
          input-debounce="0"
          label="出力"
          type="number"
          suffix="kW"
          min="0"
          max="65535"
          v-model="power"
          :rules="speedGearRules"
        />
        <q-input
          dense
          hide-hint
          hint="ゲーム内では1/100の値になります"
          hide-bottom-space
          input-debounce="0"
          label="ギア比"
          type="number"
          min="0"
          max="65535"
          v-model="gear"
          :rules="speedGearRules"
        />
        <q-input
          dense
          hide-hint
          hide-bottom-space
          input-debounce="0"
          label="積載重量"
          suffix="t"
          type="number"
          min="0"
          max="65535"
          v-model="additionalWeight"
        />
        <q-input
          dense
          hide-hint
          hide-bottom-space
          input-debounce="0"
          label="自重"
          suffix="t"
          type="number"
          min="0"
          max="65535"
          :rules="weightRules"
          v-model="weight"
        />
        <q-input
          hide-bottom-space
          borderless
          readonly
          input-debounce="0"
          label="到達可能最高速度"
          suffix="km/h"
          type="number"
          min="0"
          max="65535"
          v-model="vehicleSpeed.maxSpeed"
          :rules="maxSpeedRules"
        />
      </q-card-section>
    </template>
  </dialog-normal>
</template>
<script>
import { maxEq, minEq, maxSpeed, required } from "@/services/Validator";
import { VehicleSpeed } from "@/services/Simutrans";
import SpeedGraph from "@/components/Svg/SpeedGraph.vue";
import DialogNormal from "@/components/DialogNormal.vue";
export default {
  components: { SpeedGraph, DialogNormal },
  props: ["modelValue"],
  data() {
    return {
      dialog: false,
      additionalWeight: 0,
    };
  },
  computed: {
    speedGearRules: () => [minEq(1), maxEq(65535)],
    speedRules: () => [required, minEq(1), maxEq(65535)],
    weightRules: () => [required, minEq(1), maxEq(65535)],
    maxSpeedRules() {
      return [maxSpeed(this.speed)];
    },
    speed: {
      get() {
        return this.modelValue.findParam("speed")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("speed", v);
        this.$emit("update:modelValue");
      },
    },
    power: {
      get() {
        return this.modelValue.findParam("power")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("power", v);
        this.$emit("update:modelValue");
      },
    },
    gear: {
      get() {
        return this.modelValue.findParam("gear")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("gear", v);
        this.$emit("update:modelValue");
      },
    },
    weight: {
      get() {
        return this.modelValue.findParam("weight")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("weight", v);
        this.$emit("update:modelValue");
      },
    },
    totalWeight() {
      return Number(this.weight) + Number(this.additionalWeight);
    },
    vehicleSpeed() {
      return new VehicleSpeed(
        this.power,
        this.gear,
        this.totalWeight,
        this.speed
      );
    },
  },
};
</script>
