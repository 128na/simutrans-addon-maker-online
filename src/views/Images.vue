<template>
  <div v-if="fileLoaded">
    <title-main class="q-mb-md">画像管理</title-main>
    <q-card flat bordered>
      <image-manager />
    </q-card>
  </div>
</template>

<script>
import ImageManager from "@/components/ImageManager/ImageManager.vue";
import TitleMain from "@/components/Text/TitleMain.vue";
import { mapGetters } from "vuex";

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
