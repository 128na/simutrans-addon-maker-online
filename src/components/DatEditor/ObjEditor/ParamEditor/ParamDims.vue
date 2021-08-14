<template>
  <div class="q-gutter-md row items-start">
    <q-input
      dense
      hide-hint
      hide-bottom-space
      input-debounce="0"
      label="X"
      type="number"
      class="col"
      min="1"
      v-model="x"
      :rules="xRule"
    />
    <q-input
      dense
      hide-hint
      hide-bottom-space
      input-debounce="0"
      label="Y"
      type="number"
      class="col"
      min="1"
      v-model="y"
      :rules="yRule"
    />
    <q-input
      dense
      hide-hint
      hide-bottom-space
      input-debounce="0"
      label="Layout"
      type="number"
      class="col"
      min="1"
      v-model="layout"
      :rules="layoutRule"
    />
    <q-btn flat color="secondary" icon="help" @click="dialog = !dialog" />
  </div>
  <dialog-normal v-model="dialog">
    <template v-slot:header>Layoutの値</template>
    <template v-slot:default>
      Layoutの数は画像を切り替える方角の数によって異なります。<br />
      <dl>
        <h6>type=res,com,ind,などの場合</h6>
        <dt>Layout=1</dt>
        <dd>全ての方角で同じ表示になります。</dd>
        <dt>Layout=2</dt>
        <dd>東西・南北方向で異なる表示ができます。</dd>
        <dt>Layout=4</dt>
        <dd>東西南北で異なる表示ができます。</dd>
        <dt>Layout=8</dt>
        <dd>
          Layout=4のパータンに加えて角地（北東、北西、南東、南西）で異なる表示ができます。<br />
          <q-icon
            v-for="i in createArray(8)"
            size="md"
            color="grey"
            :name="`svguse:/img/building.svg#${i}`"
          />
        </dd>
      </dl>
      <h6>type=stop,harbourの場合</h6>
      <dl>
        <dt>Layout=1</dt>
        <dd>
          全ての方角で同じ表示になります。<br />
          <q-icon
            v-for="i in createArray(1)"
            size="md"
            color="grey"
            :name="`svguse:/img/stop_1.svg#${i}`"
          />
        </dd>
        <dt>Layout=2</dt>
        <dd>
          東西・南北方向で異なる表示ができます。<br />
          <q-icon
            v-for="i in createArray(2)"
            size="md"
            color="grey"
            :name="`svguse:/img/stop_2.svg#${i}`"
          />
        </dd>
        <dt>Layout=4</dt>
        <dd>
          東西南北で異なる表示ができます。<br />
          <q-icon
            v-for="i in createArray(4)"
            size="md"
            color="grey"
            :name="`svguse:/img/stop_4.svg#${i}`"
          />
        </dd>
        <dt>Layout=8</dt>
        <dd>
          Layout=4のパータンそれぞれでホーム端、中央で異なる表示ができます。<br />
          <q-icon
            v-for="i in createArray(8)"
            size="md"
            color="grey"
            :name="`svguse:/img/stop_8.svg#${i}`"
          />
        </dd>
        <dt>Layout=16</dt>
        <dd>
          Layout=8のパータンそれぞれで手前/奥で異なる表示ができます。<br />
          <q-icon
            v-for="i in createArray(8)"
            size="md"
            color="grey"
            :name="`svguse:/img/stop_16.svg#${i}`"
          />
          <br />
          <q-icon
            v-for="i in createArray(8)"
            size="md"
            color="grey"
            :name="`svguse:/img/stop_16.svg#${8 + i}`"
          />
        </dd>
      </dl>
    </template>
  </dialog-normal>
</template>
<script>
import DialogNormal from "@/components/DialogNormal.vue";
import { includes, ltEq, minEq, required } from "@/services/Validator";
import { createArray } from "@/services/Array";

export default {
  components: { DialogNormal },
  props: ["modelValue", "project"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    createArray(num) {
      return createArray(num);
    },
  },
  computed: {
    xRule() {
      return [required, minEq(1)];
    },
    yRule() {
      return [required, minEq(1), ltEq(this.x)];
    },
    layoutRule() {
      return [required, minEq(1), includes(["1", "2", "4", "8", "16"])];
    },
    value: {
      get() {
        return this.modelValue.findParam("dims")?.value.split(",") || [];
      },
      set(v) {
        this.modelValue.updateOrCreate("dims", v.join(","));
        this.$emit("update:modelValue");
      },
    },
    x: {
      get() {
        return this.value[0] || "";
      },
      set(v) {
        this.value = [v, this.y, this.layout];
      },
    },
    y: {
      get() {
        return this.value[1] || "";
      },
      set(v) {
        this.value = [this.x, v, this.layout];
      },
    },
    layout: {
      get() {
        return this.value[2] || "";
      },
      set(v) {
        this.value = [this.x, this.y, v];
      },
    },
  },
};
</script>
