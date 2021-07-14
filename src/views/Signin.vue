<template>
  <div>
    <title-main>About</title-main>
    <layout-box>
      {{ desc }}
    </layout-box>
    <title-main>Signin</title-main>
    <layout-box class="login-buttons">
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
import TitleMain from "../components/TitleMain.vue";
export default {
  name: "Signin",
  components: {
    TitleMain,
    LayoutBox,
    ButtonGoogle,
    ButtonTwitter,
    ButtonAnonymous,
  },
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
<style scoped>
.login-buttons button {
  text-align: left;
  display: block;
  margin-bottom: 1rem;
  width: 15rem;
  max-width: 100%;
}
</style>