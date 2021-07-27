<template>
  <div v-if="isLoggedIn">
    <title-main>ユーザー情報</title-main>
    <layout-box>
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label overline>ユーザー名</q-item-label>
            <q-item-label>{{ userName }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label overline>登録日時</q-item-label>
            <q-item-label>
              <text-date-time :value="user.metadata.creationTime" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label overline>最終サインイン</q-item-label>
            <q-item-label>
              <text-date-time :value="user.metadata.lastSignInTime" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-btn color="primary" @click="signout">サインアウト</q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </layout-box>
    <title-sub>サインイン連携</title-sub>
    <layout-box>
      <p>サインインに使用できるアカウントの連携・解除ができます。</p>

      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>Simutrans Addon Portal</q-item-label>
            <q-item-label class="q-gutter-x-sm">
              <q-btn color="primary" @click="link('portal')"> 連携 </q-btn>
              <q-btn color="secondary" @click="signin('portal')">
                再認証
              </q-btn>
              <q-btn color="secondary" @click="handleUnlink('portal')">
                連携解除
              </q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Google</q-item-label>
            <q-item-label class="q-gutter-x-sm">
              <q-btn color="primary" @click="link('google')"> 連携 </q-btn>
              <q-btn color="secondary" @click="signin('google')">
                再認証
              </q-btn>
              <q-btn color="secondary" @click="handleUnlink('google')">
                連携解除
              </q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label class="q-gutter-x-sm">
              <q-btn color="primary" @click="link('twitter')"> 連携 </q-btn>
              <q-btn color="secondary" @click="signin('twitter')">
                再認証
              </q-btn>
              <q-btn color="secondary" @click="handleUnlink('twitter')">
                連携解除
              </q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <small>
        ※
        既にこのアプリに連携しているアカウント同士、匿名アカウントとは連携できません
      </small>
    </layout-box>
    <title-sub>ユーザー削除</title-sub>
    <layout-box>
      <p>作成したデータとユーザーを削除します。</p>
    </layout-box>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="q-gutter-x-sm">
            <q-btn color="negative" @click="handleDelete"> 削除 </q-btn>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import TitleMain from "@/components/Text/TitleMain.vue";
import LayoutBox from "@/components/LayoutBox.vue";
import TitleSub from "@/components/Text/TitleSub.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import TextDateTime from "@/components/Text/TextDateTime.vue";
export default {
  components: { TitleMain, LayoutBox, TitleSub, TextDateTime },
  methods: {
    ...mapActions(["signin", "signout", "link", "unlink", "deleteUser"]),
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