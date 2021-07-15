<template>
  <div v-if="isLoggedIn">
    <title-main>ユーザー情報</title-main>
    <layout-box>
      <dl>
        <dt>ユーザー名</dt>
        <dd>{{ userName }}</dd>
        <dt>登録</dt>
        <dd>{{ creationTime }}</dd>
        <dt>最終サインイン</dt>
        <dd>{{ lastSignInTime }}</dd>
      </dl>
      <button class="btn btn-primary" @click="signout">サインアウト</button>
    </layout-box>
    <title-sub>サインイン連携</title-sub>
    <layout-box>
      <div>サインインに使用できるアカウントの連携・解除ができます</div>
      <dt>Google</dt>
      <dd>
        <a href="#" class="text-primary me-3" @click="link('google')"> 連携 </a>
        <a href="#" class="text-secondary" @click="handleUnlink('google')">
          連携解除
        </a>
      </dd>
      <dt>Twitter</dt>
      <dd>
        <a href="#" class="text-primary me-3" @click="link('twitter')">
          連携
        </a>
        <a href="#" class="text-secondary" @click="handleUnlink('twitter')"
          >連携解除</a
        >
      </dd>
      <small>
        ※
        既にこのアプリに連携しているアカウント同士、匿名アカウントとは連携できません
      </small>
    </layout-box>
  </div>
</template>
<script>
import TitleMain from "../components/TitleMain.vue";
import LayoutBox from "../components/LayoutBox.vue";
import TitleSub from "../components/TitleSub.vue";
import { DateTime } from "luxon";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  components: { TitleMain, LayoutBox, TitleSub },
  methods: {
    ...mapActions(["signout", "link", "unlink", "deleteUser"]),
    handleUnlink(provider) {
      if (confirm("連携解除してもよろしいですか？")) {
        this.unlink(provider);
      }
    },
    handleDelete() {
      if (confirm("ユーザーデータを削除してもよろしいですか？")) {
        this.deleteUser();
      }
    },
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isLoggedIn", "userName", "userId"]),
    creationTime() {
      return DateTime.fromHTTP(this.user.metadata.creationTime).toLocaleString(
        DateTime.DATETIME_FULL
      );
    },
    lastSignInTime() {
      return DateTime.fromHTTP(
        this.user.metadata.lastSignInTime
      ).toLocaleString(DateTime.DATETIME_FULL);
    },
    isAnonymous() {
      this.user.isAnonymous;
    },
  },
};
</script>