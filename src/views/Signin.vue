<template>
  <div>
    <title-main>About</title-main>
    <layout-box>
      {{ desc }}
    </layout-box>

    <title-main>Signin</title-main>
    <layout-box>
      <a href="#" title="Google Signin" @click.prevent="signin">
        <img src="/img/btn_google_signin_dark_normal_web.png" />
      </a>
    </layout-box>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LayoutBox from "../components/LayoutBox.vue";
import TitleMain from "../components/TitleMain.vue";
export default {
  name: "Signin",
  components: { TitleMain, LayoutBox },
  computed: {
    desc() {
      return process.env.VUE_APP_DESCRIPTION;
    },
  },
  methods: {
    ...mapActions(["signin"]),
  },
};
</script>
