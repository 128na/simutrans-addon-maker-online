<template>
  <div>
    <common-title>About</common-title>
    <common-box>
      Simutrans用のアドオンをdat作成からpak化までできるWebアプリです。
    </common-box>

    <common-title>Signin</common-title>
    <common-box>
      <a href="#" title="Google Signin" @click.prevent="signin">
        <img src="/img/btn_google_signin_dark_normal_web.png" />
      </a>
    </common-box>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CommonBox from "../components/CommonBox.vue";
import CommonTitle from "../components/CommonTitle.vue";
export default {
  name: "Signin",
  components: { CommonTitle, CommonBox },
  methods: {
    ...mapActions(["signin"]),
  },
};
</script>
