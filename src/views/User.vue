<template>
  <div v-if="isLoggedIn">
    <title-main>ユーザー情報</title-main>
    <layout-box>
      <dl>
        <dt>ユーザー名</dt>
        <dd>{{ userName }}</dd>
        <dt>登録</dt>
        <dd><text-date-time :value="user.metadata.creationTime" /></dd>
        <dt>最終サインイン</dt>
        <dd><text-date-time :value="user.metadata.lastSignInTime" /></dd>
      </dl>
      <q-btn color="primary" @click="signout">サインアウト</q-btn>
    </layout-box>
    <title-sub>サインイン連携</title-sub>
    <layout-box>
      <p>サインインに使用できるアカウントの連携・解除ができます</p>
      <dt>Portal</dt>
      <dd>
        <a href="#" class="text-primary q-mr-sm" @click="link('portal')">
          連携
        </a>
        <a href="#" class="text-secondary" @click="handleUnlink('portal')">
          連携解除
        </a>
      </dd>
      <dt>Google</dt>
      <dd>
        <a href="#" class="text-primary q-mr-sm" @click="link('google')">
          連携
        </a>
        <a href="#" class="text-secondary" @click="handleUnlink('google')">
          連携解除
        </a>
      </dd>
      <dt>Twitter</dt>
      <dd>
        <a href="#" class="text-primary q-mr-sm" @click="link('twitter')">
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
    <title-sub>ユーザーデータ削除</title-sub>
    <layout-box>
      <p>作成したデータを削除します。</p>
    </layout-box>
  </div>
</template>
<script>
import TitleMain from "../components/Text/TitleMain.vue";
import LayoutBox from "../components/LayoutBox.vue";
import TitleSub from "../components/Text/TitleSub.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import TextDateTime from "../components/Text/TextDateTime.vue";
export default {
  components: { TitleMain, LayoutBox, TitleSub, TextDateTime },
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
  },
};
</script>