<template>
  <div v-if="fileLoaded">
    <title-main class="mb-3">画像管理</title-main>
    <q-card>
      <image-manager :files="files" />
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LayoutBox from "@/components/LayoutBox.vue";
import TitleSub from "@/components/Text/TitleSub.vue";
import TitleMain from "@/components/Text/TitleMain.vue";
import ImageManager from "@/components/ImageManager/ImageManager.vue";
export default {
  components: {
    TitleMain,
    LayoutBox,
    TitleSub,
    ImageManager,
  },
  name: "Images",
  computed: {
    ...mapGetters(["fileLoaded", "files", "getProjectsByFile"]),
  },
  methods: {
    ...mapActions(["uploadImage", "deleteImage"]),
  },
};
</script>
