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
              <text-date-time v-model="user.metadata.creationTime" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label overline>最終サインイン</q-item-label>
            <q-item-label>
              <text-date-time v-model="user.metadata.lastSignInTime" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-btn
                color="primary"
                label="サインアウト"
                icon="logout"
                @click="handleSignout"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </layout-box>
    <title-sub>サインイン連携</title-sub>
    <layout-box>
      <p>サインインに使用できるアカウントの連携・解除ができます。</p>

      <q-list>
        <template v-for="service in services">
          <q-item>
            <q-item-section>
              <q-item-label>{{ service.title }}</q-item-label>
              <q-item-label class="q-gutter-x-sm">
                <q-btn
                  dense
                  color="primary"
                  label="連携"
                  icon="link"
                  @click="handleLink(service.name)"
                />
                <q-btn
                  dense
                  color="secondary"
                  label="解除"
                  icon="link_off"
                  @click="handleUnlink(service.name)"
                />
                <q-btn
                  v-if="!hasCredential"
                  dense
                  color="secondary"
                  label="再認証"
                  icon="login"
                  @click="handleSignin(service.name)"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <q-item>
          <q-item-label caption>
            既にこのアプリに連携しているアカウント同士、匿名アカウントとは連携できません。<br />
            ゲストアカウントを利用している場合はアカウント連携をお勧めします。<br />
            サインイン連携していないゲストアカウントでサインアウトすると二度とそのデータにはアクセスできなくなります。
          </q-item-label>
        </q-item>
      </q-list>
    </layout-box>
    <title-sub>ユーザー削除</title-sub>
    <layout-box>
      <p>
        作成したデータとユーザーを削除します。<br />
        作成したデータはユーザー削除実行後、24時間以内に削除されます。
      </p>
    </layout-box>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="q-gutter-x-sm">
            <q-btn
              color="negative"
              label="削除"
              icon="mdi-bomb"
              @click="handleDelete"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import LayoutBox from "@/components/LayoutBox.vue";
import TextDateTime from "@/components/Text/TextDateTime.vue";
import TitleMain from "@/components/Text/TitleMain.vue";
import TitleSub from "@/components/Text/TitleSub.vue";
import { getFirebaseAuthErrorMessage } from "@/services/ErrorMessages";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: { TitleMain, LayoutBox, TitleSub, TextDateTime },
  methods: {
    ...mapActions(["signin", "signout", "link", "unlink", "deleteUser"]),
    async handleSignin(provider) {
      try {
        await this.signin(provider);
        this.notifyPositive("再認証しました。");
      } catch (e) {
        this.notifyNegative(getFirebaseAuthErrorMessage(e));
      }
    },
    async handleSignout() {
      try {
        await this.signout();
        this.notifyPositive("サインアウトしました。");
      } catch (e) {
        this.notifyNegative(getFirebaseAuthErrorMessage(e));
      }
    },
    async handleLink(provider) {
      try {
        await this.link(provider);
        this.notifyPositive("連携しました。");
      } catch (e) {
        this.notifyNegative(getFirebaseAuthErrorMessage(e));
      }
    },
    async handleUnlink(provider) {
      try {
        if (confirm("連携解除してもよろしいですか？")) {
          await this.unlink(provider);
          this.notifyPositive("連携解除しました。");
        }
      } catch (e) {
        this.notifyNegative(getFirebaseAuthErrorMessage(e));
      }
    },
    async handleDelete() {
      try {
        if (confirm("ユーザーデータを削除してもよろしいですか？")) {
          await this.deleteUser();
          this.notifyPositive("削除しました。");
        }
      } catch (e) {
        this.notifyNegative(getFirebaseAuthErrorMessage(e));
      }
    },
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isLoggedIn", "userName", "userId", "hasCredential"]),
    services() {
      return [
        { title: "Simutrans Addon Portal", name: "portal" },
        { title: "Google", name: "google" },
        { title: "Twitter", name: "twitter" },
      ];
    },
  },
};
</script>