<template>
  <q-input v-model="name" label="アドオン名" />
  <q-input v-model="copyright" label="作者" />
  <q-input v-model="speed" label="最高速度" type="number" />
  <q-input v-model="payload" label="積載量" />
</template>
<script>
export default {
  icon: "local_shipping",
  props: ["obj", "dat", "project"],
  emits: ["update"],
  computed: {
    name: {
      get() {
        const param = this.obj.findParamByKey("name");
        if (param) {
          return param.valueVal;
        }
      },
      set(v) {
        this.obj.updateOrCreate("name", v);
        this.$emit("update");
      },
    },
    copyright: {
      get() {
        const param = this.obj.findParamByKey("copyright");
        if (param) {
          return param.valueVal;
        }
      },
      set(v) {
        this.obj.updateOrCreate("copyright", v);
        this.$emit("update");
      },
    },
    speed: {
      get() {
        const param = this.obj.findParamByKey("speed");
        if (param) {
          return param.valueVal;
        }
      },
      set(v) {
        this.obj.updateOrCreate("speed", v);
        this.$emit("update");
      },
    },
    payload: {
      get() {
        const param = this.obj.findParamByKey("payload");
        if (param) {
          return param.valueVal;
        }
      },
      set(v) {
        this.obj.updateOrCreate("payload", v);
        this.$emit("update");
      },
    },
  },
};
</script>