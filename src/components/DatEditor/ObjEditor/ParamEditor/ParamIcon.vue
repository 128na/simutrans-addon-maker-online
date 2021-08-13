<template>
  <param-image
    v-model="modelValue"
    keyName="icon"
    :project="project"
    :staticSize="32"
    icon="mdi-information-outline"
    @update:modelValue="$emit('update:modelValue')"
  />
</template>
<script>
import ParamImage from "./ParamImage.vue";
export default {
  components: { ParamImage },
  props: ["modelValue", "project"],
};
</script>
