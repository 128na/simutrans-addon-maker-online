<template>
  <div>
    <title-main>サインイン</title-main>
    <layout-box class="d-grid gap-3">
      <button-portal @click.prevent="handlePortal" />
      <button-google @click.prevent="signin('google')" />
      <button-twitter @click.prevent="signin('twitter')" />
      <button-anonymous @click.prevent="signin()" />
      <small>
        ※
        登録なしでもデータは保存されますが、別端末などとデータの共有はできません。<br />
        利用開始後に他アカウントと連携可能です。
      </small>
    </layout-box>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ButtonGoogle from "../components/Buttons/ButtonGoogle.vue";
import ButtonTwitter from "../components/Buttons/ButtonTwitter.vue";
import ButtonAnonymous from "../components/Buttons/ButtonAnonymous.vue";
import LayoutBox from "../components/LayoutBox.vue";
import TitleMain from "../components/Text/TitleMain.vue";
import { signInWithPopup } from "../services/ApiPortal";
import ButtonPortal from "../components/Buttons/ButtonPortal.vue";
import firebase from "firebase";
export default {
  name: "Signin",
  components: {
    TitleMain,
    LayoutBox,
    ButtonGoogle,
    ButtonTwitter,
    ButtonAnonymous,
    ButtonPortal,
  },
  computed: {
    desc() {
      return process.env.VUE_APP_DESCRIPTION;
    },
  },
  methods: {
    ...mapActions(["signin"]),
    async handlePortal() {
      try {
        const customToken = await signInWithPopup();
        console.log({ customToken });
        await firebase.auth().signInWithCustomToken(customToken);
      } catch (error) {
        console.error({ error });
        alert("連携に失敗しました");
      }
    },
  },
};
</script>
