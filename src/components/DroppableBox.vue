<template>
  <div
    @dragover.prevent="handleDragover"
    @dragleave.prevent="handleDragleave"
    @drop.prevent="handleDrop"
  >
    <slot :dropping="dropping" :ctrl="ctrl" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      dropping: false,
      ctrl: false,
      shift: false,
    };
  },
  methods: {
    handleDragover(e) {
      e.dataTransfer.dropEffect = "copy";
      this.dropping = true;
      this.ctrl = e.ctrlKey;
      this.shift = e.shiftKey;
    },
    handleDragleave(e) {
      this.dropping = false;
      this.ctrl = false;
      this.shift = false;
    },
    handleDrop(e) {
      this.dropping = false;
      this.$emit("fileDropped", {
        files: [...e.dataTransfer.files],
        ctrl: this.ctrl,
        shift: this.shift,
      });
    },
  },
};
</script>