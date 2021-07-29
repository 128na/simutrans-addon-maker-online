<template>
  <div v-if="fileLoaded">
    <title-main class="mb-3">画像管理</title-main>
    <q-card flat bordered>
      <image-manager />
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TitleMain from "@/components/Text/TitleMain.vue";
import ImageManager from "@/components/ImageManager/ImageManager.vue";
export default {
  components: {
    TitleMain,
    ImageManager,
  },
  name: "Images",
  computed: {
    ...mapGetters(["fileLoaded"]),
  },
};
</script>
