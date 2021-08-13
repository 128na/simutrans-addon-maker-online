<template>
  <q-select
    dense
    use-input
    use-chips
    multiple
    hide-hint
    hide-bottom-space
    input-debounce="0"
    new-value-mode="add-unique"
    label="連結可能車両(前)"
    v-model="constraintPrevs"
    :options="options"
    @filter="filter"
  />
  <q-select
    dense
    use-input
    use-chips
    multiple
    hide-hint
    hide-bottom-space
    input-debounce="0"
    new-value-mode="add-unique"
    label="連結可能車両(後)"
    v-model="constraintNexts"
    :options="options"
    @filter="filter"
  />
</template>
<script>
const options = ["none"];

export default {
  props: ["modelValue", "dat"],
  data() {
    return {
      options: options,
    };
  },
  computed: {
    constraints() {
      return this.modelValue.findParamsByKeyVal("constraint");
    },
    constraintPrevs: {
      get() {
        return this.constraints
          .filter((p) => p.keyParams[0] === "prev")
          .map((p) => p.value);
      },
      set(value) {
        this.modelValue.deleteByKeyVal("constraint", ["prev"]);
        value.map((v, index) =>
          this.modelValue.updateOrCreate(`constraint[prev][${index}]`, v)
        );
        this.$emit("update:modelValue");
      },
    },
    constraintNexts: {
      get() {
        return this.constraints
          .filter((p) => p.keyParams[0] === "next")
          .map((p) => p.value);
      },
      set(value) {
        this.modelValue.deleteByKeyVal("constraint", ["next"]);
        value.map((v, index) =>
          this.modelValue.updateOrCreate(`constraint[next][${index}]`, v)
        );
        this.$emit("update:modelValue");
      },
    },
    vehicles() {
      return this.dat
        .findObjs("obj", "vehicle")
        .map((obj) => obj.findParam("name")?.value)
        .filter((v) => v);
    },
  },
  methods: {
    filter(val, update) {
      const values = val.toLowerCase().split(" ");
      update(() => {
        this.options = [...options, ...this.vehicles].filter((opt) =>
          values.every((v) => opt.toLowerCase().includes(v))
        );
      });
    },
  },
};
</script>
