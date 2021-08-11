<template>
  <div>
    <title-main>サインイン</title-main>
    <layout-box class="q-gutter-y-md">
      <button-portal @click.prevent="handleSignin('portal')" />
      <button-google @click.prevent="handleSignin('google')" />
      <button-twitter @click.prevent="handleSignin('twitter')" />
      <button-anonymous @click.prevent="handleSignin()" />
      <small>
        ※
        登録なしでもデータは保存されますが、別端末などとデータの共有はできません。<br />
        利用開始後に他アカウントと連携可能です。
      </small>
    </layout-box>
  </div>
</template>

<script>
import ButtonAnonymous from "@/components/Buttons/ButtonAnonymous.vue";
import ButtonGoogle from "@/components/Buttons/ButtonGoogle.vue";
import ButtonPortal from "@/components/Buttons/ButtonPortal.vue";
import ButtonTwitter from "@/components/Buttons/ButtonTwitter.vue";
import LayoutBox from "@/components/LayoutBox.vue";
import TitleMain from "@/components/Text/TitleMain.vue";
import { getFirebaseAuthErrorMessage } from "@/services/ErrorMessages";
import { mapActions } from "vuex";

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
    async handleSignin(provider = null) {
      try {
        await this.signin(provider);
        this.notifyPositive("サインインしました");
      } catch (e) {
        this.notifyNegative(getFirebaseAuthErrorMessage(e));
      }
    },
  },
};
</script>
