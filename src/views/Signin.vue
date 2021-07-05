<template>
  <common-title>About</common-title>
  <common-message>
    Simutrans用のアドオンをdat作成からpak化までできるWebアプリです。
  </common-message>

  <common-title>Signin</common-title>
  <common-message>
    <a href="#" title="Google Signin" @click.prevent="signin">
      <img src="/img/btn_google_signin_dark_normal_web.png" />
    </a>
  </common-message>
</template>

<script>
import { mapActions } from "vuex";
import CommonMessage from "../components/CommonMessage.vue";
import CommonTitle from "../components/CommonTitle.vue";
export default {
  name: "Signin",
  components: { CommonTitle, CommonMessage },
  methods: {
    ...mapActions(["signin"]),
  },
};
</script>
