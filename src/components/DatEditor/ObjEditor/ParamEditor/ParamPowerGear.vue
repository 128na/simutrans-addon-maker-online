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
      :rules="rules"
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
      :rules="rules"
    />
    <q-btn
      flat
      color="secondary"
      icon="mdi-calculator"
      @click="dialog = !dialog"
    />
  </div>
  <q-dialog v-model="dialog">
    <q-card bordered>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">到達最高速度計算ツール</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator />
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
          :rules="rules"
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
          :rules="rules"
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
          :rules="rules"
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
          :rules="rules"
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
          :rules="rules"
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
          :rules="speedRules"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { minEq, maxSpeed } from "@/services/Validator";
import { VehicleSpeed } from "@/services/Simutrans";
import SpeedGraph from "@/components/Svg/SpeedGraph.vue";
export default {
  components: { SpeedGraph },
  props: ["modelValue"],
  data() {
    return {
      dialog: false,
      additionalWeight: 0,
    };
  },
  computed: {
    rules: () => [minEq(0)],
    speedRules() {
      return [maxSpeed(this.speed)];
    },
    speed: {
      get() {
        return this.modelValue.findParamByKey("speed")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("speed", v);
        this.$emit("update:modelValue");
      },
    },
    power: {
      get() {
        return this.modelValue.findParamByKey("power")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("power", v);
        this.$emit("update:modelValue");
      },
    },
    gear: {
      get() {
        return this.modelValue.findParamByKey("gear")?.value;
      },
      set(v) {
        this.modelValue.updateOrCreate("gear", v);
        this.$emit("update:modelValue");
      },
    },
    weight: {
      get() {
        return this.modelValue.findParamByKey("weight")?.value;
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