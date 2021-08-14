<template>
  <param-image
    v-model="modelValue"
    keyName="cursor"
    :project="project"
    icon="mdi-cursor-default"
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
